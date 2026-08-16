import { NextResponse } from 'next/server';
import { demoEvents } from '@/lib/rag/demoKnowledge';

export async function GET() {
  return NextResponse.json({ events: demoEvents });
}
