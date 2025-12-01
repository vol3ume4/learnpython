import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'day'; // 'day' or 'week'

    // Create server-side Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Calculate time range
    const now = new Date();
    const daysAgo = period === 'day' ? 1 : 7;
    const startDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);

    console.log(`[Analytics API] Fetching ${period} data from ${startDate.toISOString()}`);

    // Get analytics data
    const { data: analytics, error } = await supabase
      .from('analytics')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Analytics fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch analytics', details: error.message }, { status: 500 });
    }

    console.log(`[Analytics API] Found ${analytics?.length || 0} records`);

    // Calculate stats
    const totalViews = analytics?.length || 0;
    const uniqueUsers = new Set(analytics?.map(a => a.user_id) || []).size;
    
    // Group by chapter
    const chapterViews: { [key: string]: number } = {};
    analytics?.forEach(a => {
      const key = a.chapter_title || 'Unknown';
      chapterViews[key] = (chapterViews[key] || 0) + 1;
    });

    // Group by page path
    const pageViews: { [key: string]: number } = {};
    analytics?.forEach(a => {
      pageViews[a.page_path] = (pageViews[a.page_path] || 0) + 1;
    });

    // Get hourly distribution for the period
    const hourlyViews: { [key: number]: number } = {};
    analytics?.forEach(a => {
      const hour = new Date(a.created_at).getHours();
      hourlyViews[hour] = (hourlyViews[hour] || 0) + 1;
    });

    return NextResponse.json({
      period,
      totalViews,
      uniqueUsers,
      chapterViews,
      pageViews,
      hourlyViews,
      rawData: analytics?.slice(0, 100) // Last 100 records for detailed view
    });

  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

