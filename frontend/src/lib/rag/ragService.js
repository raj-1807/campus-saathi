import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';
import { demoKnowledge } from './demoKnowledge';

const EMBEDDING_MODEL = 'gemini-embedding-001';
const CHAT_MODEL = 'gemini-3.5-flash';

function getGoogleClient() {
  const key = process.env.GOOGLE_AI_API_KEY;
  return key ? new GoogleGenerativeAI(key) : null;
}

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY;

  return url && key ? createClient(url, key) : null;
}

function tokenize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function keywordScore(query, content) {
  const qTokens = tokenize(query);
  const cTokens = new Set(tokenize(content));
  if (!qTokens.length) return 0;
  const hits = qTokens.filter((token) => cTokens.has(token)).length;
  return Math.min(0.98, hits / qTokens.length + (hits > 0 ? 0.35 : 0));
}

function normalizeSource(row) {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    category: row.category,
    source: row.source,
    relevance: Number(row.similarity ?? row.relevance ?? 0.75),
  };
}

export function demoSearch(query, category = 'all', limit = 5) {
  return demoKnowledge
    .filter((item) => category === 'all' || item.category === category)
    .map((item) => ({
      ...item,
      relevance: keywordScore(query, `${item.title} ${item.category} ${item.content}`),
    }))
    .filter((item) => item.relevance > 0.25)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit)
    .map(normalizeSource);
}

async function embedText(text) {
  const google = getGoogleClient();
  if (!google) return null;

  const model = google.getGenerativeModel({ model: EMBEDDING_MODEL });
  const result = await model.embedContent({
    content: { parts: [{ text }] },
    outputDimensionality: 768,
  });
  return result.embedding.values;
}

export async function retrieveDocuments({ query, category = 'all', limit = 5, threshold = 0.5 }) {
  const supabase = getSupabaseClient();
  const queryEmbedding = supabase ? await embedText(query) : null;

  if (!supabase || !queryEmbedding) {
    return { mode: 'demo', results: demoSearch(query, category, limit) };
  }

  const { data, error } = await supabase.rpc('match_documents', {
    query_embedding: queryEmbedding,
    match_threshold: threshold,
    match_count: limit,
    filter_category: category === 'all' ? null : category,
  });

  if (error) {
    console.error('Supabase retrieval failed:', error);
    return { mode: 'demo', results: demoSearch(query, category, limit) };
  }

  return { mode: 'supabase', results: (data || []).map(normalizeSource) };
}

function buildPrompt(message, sources) {
  const context = sources
    .map((source, index) => `[${index + 1}] ${source.title} (${source.source})\n${source.content}`)
    .join('\n\n');

  return `You are Campus Saathi, a helpful AI assistant for college students.
Answer only from the provided context. If the context does not contain the answer, say that the information is not available in the campus knowledge base.
Reply in the same language as the student when possible. Keep the answer concise and cite source numbers like [1].

Context:
${context || 'No relevant context found.'}

Student question:
${message}`;
}

function fallbackAnswer(message, sources) {
  if (!sources.length) {
    return 'I could not find this information in the campus knowledge base yet. Add the relevant notice, PDF, or handbook content to the database, then ask again.';
  }

  const bullets = sources
    .slice(0, 3)
    .map((source, index) => `${index + 1}. ${source.content}`)
    .join('\n\n');

  return `Based on the campus knowledge base, here is what I found:\n\n${bullets}\n\nSources: ${sources
    .slice(0, 3)
    .map((source, index) => `[${index + 1}] ${source.title}`)
    .join(', ')}`;
}

export async function answerQuestion({ message, history = [] }) {
  const { mode, results } = await retrieveDocuments({ query: message, limit: 5 });
  const google = getGoogleClient();

  if (!google || !results.length) {
    return {
      response: fallbackAnswer(message, results),
      sources: results,
      mode,
    };
  }

  try {
    const prompt = buildPrompt(message, results, history);
    const output = await generateViaInteractions(prompt);
    return {
      response: output,
      sources: results,
      mode,
    };
  } catch (error) {
    console.error('Gemini generation failed:', error);
    return {
      response: fallbackAnswer(message, results),
      sources: results,
      mode,
    };
  }
}

async function generateViaInteractions(prompt) {
  const key = process.env.GOOGLE_AI_API_KEY;
  if (!key) return null;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/interactions?key=${encodeURIComponent(key)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: CHAT_MODEL, input: prompt }),
    }
  );

  if (!response.ok) {
    throw new Error(`Interactions API failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  const modelOutput = (data.steps || []).find((step) => step.type === 'model_output');
  const text = (modelOutput?.content || [])
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('\n');
  return text;
}
