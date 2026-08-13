import { NextResponse } from 'next/server';
import { DEMO_RESPONSES } from '@/utils/constants';

export async function POST(request) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Check if API keys are configured
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (apiKey && supabaseUrl) {
      // === REAL RAG PIPELINE ===
      // This will be activated when API keys are configured
      try {
        // 1. Generate embedding for the query
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(apiKey);

        // 2. Search vector database (Supabase pgvector)
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          supabaseUrl,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );

        // Generate embedding
        const embeddingModel = genAI.getGenerativeModel({ model: 'text-embedding-004' });
        const embeddingResult = await embeddingModel.embedContent(message);
        const queryEmbedding = embeddingResult.embedding.values;

        // Search for similar documents
        const { data: documents, error } = await supabase.rpc('match_documents', {
          query_embedding: queryEmbedding,
          match_threshold: 0.5,
          match_count: 5,
        });

        // Build context from retrieved documents
        let context = '';
        let sources = [];
        if (documents && documents.length > 0) {
          context = documents
            .map((doc, i) => `[Document ${i + 1}]: ${doc.content}`)
            .join('\n\n');
          sources = documents.map((doc) => ({
            title: doc.title || 'Document',
            category: doc.category || 'general',
            relevance: doc.similarity || 0,
          }));
        }

        // Generate response using Gemini
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = context
          ? `You are Campus Saathi, a friendly AI campus assistant. Use the following context to answer the student's question. If the context doesn't contain relevant information, say so honestly.

Context:
${context}

Student's Question: ${message}

Answer helpfully and concisely:`
          : `You are Campus Saathi, a friendly AI campus assistant. A student asks: "${message}"

Answer helpfully. If you don't have specific campus information, provide general guidance and mention that specific details may vary.`;

        const result = await model.generateContent(prompt);
        const response = result.response.text();

        return NextResponse.json({ response, sources });
      } catch (apiError) {
        console.error('API Error:', apiError);
        // Fall through to demo mode
      }
    }

    // === DEMO MODE ===
    await new Promise((r) => setTimeout(r, 800));
    const demoIndex = Math.floor(Math.random() * DEMO_RESPONSES.length);
    const demo = DEMO_RESPONSES[demoIndex];

    return NextResponse.json({
      response: demo.text,
      sources: demo.sources,
      isDemo: true,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
