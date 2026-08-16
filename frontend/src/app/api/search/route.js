import { NextResponse } from 'next/server';
import { retrieveDocuments } from '@/lib/rag/ragService';

export async function POST(request) {
  try {
    const body = await request.json();
    const query = String(body.query || '').trim();
    const category = String(body.category || 'all');

    if (!query) {
      return NextResponse.json({ results: [] });
    }

    const { mode, results } = await retrieveDocuments({
      query,
      category,
      limit: Number(body.limit || 8),
      threshold: Number(body.threshold || 0.45),
    });

    return NextResponse.json({ mode, results });
  } catch (error) {
    console.error('Search route failed:', error);
    return NextResponse.json({ error: 'Search failed', results: [] }, { status: 500 });
  }
}
