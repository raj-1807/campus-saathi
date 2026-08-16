import { NextResponse } from 'next/server';
import { answerQuestion } from '@/lib/rag/ragService';

export async function POST(request) {
  try {
    const body = await request.json();
    const message = String(body.message || body.query || '').trim();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required', response: 'Please enter a question.' },
        { status: 400 }
      );
    }

    const result = await answerQuestion({
      message,
      history: Array.isArray(body.history) ? body.history : [],
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Chat route failed:', error);
    return NextResponse.json(
      {
        error: 'Unable to answer right now',
        response: 'Campus Saathi is having trouble answering right now. Please try again.',
        sources: [],
      },
      { status: 500 }
    );
  }
}
