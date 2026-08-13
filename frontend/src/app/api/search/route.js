import { NextResponse } from 'next/server';
import { DEMO_SEARCH_RESULTS } from '@/utils/constants';

export async function POST(request) {
  try {
    const { query, category } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Check if API keys are configured
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (apiKey && supabaseUrl) {
      try {
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const { createClient } = await import('@supabase/supabase-js');

        const genAI = new GoogleGenerativeAI(apiKey);
        const supabase = createClient(
          supabaseUrl,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );

        // Generate embedding
        const embeddingModel = genAI.getGenerativeModel({ model: 'text-embedding-004' });
        const embeddingResult = await embeddingModel.embedContent(query);
        const queryEmbedding = embeddingResult.embedding.values;

        // Search with optional category filter
        const rpcParams = {
          query_embedding: queryEmbedding,
          match_threshold: 0.3,
          match_count: 10,
        };

        if (category && category !== 'all') {
          rpcParams.filter_category = category;
        }

        const { data: results, error } = await supabase.rpc(
          'match_documents',
          rpcParams
        );

        if (results) {
          return NextResponse.json({
            results: results.map((r) => ({
              id: r.id,
              title: r.title || 'Document',
              content: r.content,
              category: r.category || 'general',
              relevance: r.similarity || 0,
              source: r.source || 'Campus Database',
            })),
          });
        }
      } catch (apiError) {
        console.error('Search API Error:', apiError);
      }
    }

    // === DEMO MODE ===
    await new Promise((r) => setTimeout(r, 600));
    let results = DEMO_SEARCH_RESULTS;

    // Filter by category
    if (category && category !== 'all') {
      results = results.filter((r) => r.category === category);
    }

    // Simple keyword matching for relevance ordering
    const queryLower = query.toLowerCase();
    results = results
      .map((r) => ({
        ...r,
        relevance: r.title.toLowerCase().includes(queryLower) ||
          r.content.toLowerCase().includes(queryLower)
          ? Math.min(r.relevance + 0.05, 1)
          : r.relevance,
      }))
      .sort((a, b) => b.relevance - a.relevance);

    return NextResponse.json({ results, isDemo: true });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
