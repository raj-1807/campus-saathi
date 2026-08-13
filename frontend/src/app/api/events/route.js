import { NextResponse } from 'next/server';
import { DEMO_EVENTS } from '@/utils/constants';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (supabaseUrl) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          supabaseUrl,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );

        let query = supabase
          .from('events')
          .select('*')
          .order('date', { ascending: true });

        if (category && category !== 'all') {
          query = query.eq('category', category);
        }

        const { data, error } = await query;

        if (data) {
          return NextResponse.json({ events: data });
        }
      } catch (apiError) {
        console.error('Events API Error:', apiError);
      }
    }

    // === DEMO MODE ===
    let events = DEMO_EVENTS;

    if (category && category !== 'all') {
      events = events.filter((e) => e.category === category);
    }

    // Sort by date
    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    return NextResponse.json({ events, isDemo: true });
  } catch (error) {
    console.error('Events API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
