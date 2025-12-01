"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Users, BookOpen, ClipboardCheck, MessageSquare, ArrowLeft, BarChart3, TrendingUp } from 'lucide-react';

interface RevisionTest {
  id: string;
  user_id: string;
  chapter_index: number;
  chapter_title: string;
  questions_shown: number;
  questions_attempted: number;
  created_at: string;
}

interface QuizTest {
  id: string;
  user_id: string;
  chapter_index: number;
  chapter_title: string;
  questions_shown: number;
  questions_attempted: number;
  created_at: string;
}

interface Feedback {
  id: string;
  user_id: string;
  context: string;
  message: string;
  created_at: string;
}

interface ChapterStats {
  chapter_title: string;
  revision_count: number;
  quiz_count: number;
  revision_avg_attempted: number;
  quiz_avg_attempted: number;
}

interface AnalyticsData {
  period: string;
  totalViews: number;
  uniqueUsers: number;
  chapterViews: { [key: string]: number };
  pageViews: { [key: string]: number };
  hourlyViews: { [key: number]: number };
}

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [revisionTests, setRevisionTests] = useState<RevisionTest[]>([]);
  const [quizTests, setQuizTests] = useState<QuizTest[]>([]);
  const [chapterStats, setChapterStats] = useState<ChapterStats[]>([]);
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [analyticsDay, setAnalyticsDay] = useState<AnalyticsData | null>(null);
  const [analyticsWeek, setAnalyticsWeek] = useState<AnalyticsData | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  useEffect(() => {
    checkAdminAndLoadData();
  }, []);

  const checkAdminAndLoadData = async () => {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/');
        return;
      }

      // Check if admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();

      if (!profile?.is_admin) {
        // Not admin - show nothing, redirect home
        router.push('/');
        return;
      }

      setIsAdmin(true);

      // Load admin data
      await Promise.all([
        loadUserCount(),
        loadRevisionTests(),
        loadQuizTests(),
        loadFeedback(),
        loadAnalytics()
      ]);

    } catch (error) {
      console.error('Admin check failed:', error);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const loadUserCount = async () => {
    const { count } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });
    setUserCount(count || 0);
  };

  const loadRevisionTests = async () => {
    const { data } = await supabase
      .from('revision_tests')
      .select('*')
      .order('created_at', { ascending: false });
    setRevisionTests(data || []);
  };

  const loadQuizTests = async () => {
    const { data } = await supabase
      .from('quiz_tests')
      .select('*')
      .order('created_at', { ascending: false });
    setQuizTests(data || []);
  };

  const loadFeedback = async () => {
    const { data } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });
    setFeedbackList(data || []);
  };

  const loadAnalytics = async () => {
    try {
      setAnalyticsLoading(true);
      
      // Calculate time ranges
      const now = new Date();
      const dayAgo = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      // Fetch day and week data in parallel
      const [dayResult, weekResult] = await Promise.all([
        supabase
          .from('analytics')
          .select('*')
          .gte('created_at', dayAgo.toISOString())
          .order('created_at', { ascending: false }),
        supabase
          .from('analytics')
          .select('*')
          .gte('created_at', weekAgo.toISOString())
          .order('created_at', { ascending: false })
      ]);

      if (dayResult.error) {
        console.error('Day analytics error:', dayResult.error);
      }
      if (weekResult.error) {
        console.error('Week analytics error:', weekResult.error);
      }

      // Process day data
      const dayAnalytics = dayResult.data || [];
      const dayStats = {
        period: 'day',
        totalViews: dayAnalytics.length,
        uniqueUsers: new Set(dayAnalytics.map(a => a.user_id)).size,
        chapterViews: {} as { [key: string]: number },
        pageViews: {} as { [key: string]: number },
        hourlyViews: {} as { [key: number]: number }
      };
      dayAnalytics.forEach(a => {
        const chapter = a.chapter_title || 'Unknown';
        dayStats.chapterViews[chapter] = (dayStats.chapterViews[chapter] || 0) + 1;
        dayStats.pageViews[a.page_path] = (dayStats.pageViews[a.page_path] || 0) + 1;
        const hour = new Date(a.created_at).getHours();
        dayStats.hourlyViews[hour] = (dayStats.hourlyViews[hour] || 0) + 1;
      });

      // Process week data
      const weekAnalytics = weekResult.data || [];
      const weekStats = {
        period: 'week',
        totalViews: weekAnalytics.length,
        uniqueUsers: new Set(weekAnalytics.map(a => a.user_id)).size,
        chapterViews: {} as { [key: string]: number },
        pageViews: {} as { [key: string]: number },
        hourlyViews: {} as { [key: number]: number }
      };
      weekAnalytics.forEach(a => {
        const chapter = a.chapter_title || 'Unknown';
        weekStats.chapterViews[chapter] = (weekStats.chapterViews[chapter] || 0) + 1;
        weekStats.pageViews[a.page_path] = (weekStats.pageViews[a.page_path] || 0) + 1;
        const hour = new Date(a.created_at).getHours();
        weekStats.hourlyViews[hour] = (weekStats.hourlyViews[hour] || 0) + 1;
      });

      console.log('Analytics loaded:', { day: dayStats, week: weekStats });

      setAnalyticsDay(dayStats);
      setAnalyticsWeek(weekStats);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  useEffect(() => {
    if (revisionTests.length > 0 || quizTests.length > 0) {
      calculateChapterStats();
    }
  }, [revisionTests, quizTests]);

  const calculateChapterStats = () => {
    const statsMap = new Map<string, ChapterStats>();

    // Process revision tests
    revisionTests.forEach(test => {
      const existing = statsMap.get(test.chapter_title) || {
        chapter_title: test.chapter_title,
        revision_count: 0,
        quiz_count: 0,
        revision_avg_attempted: 0,
        quiz_avg_attempted: 0
      };
      existing.revision_count++;
      existing.revision_avg_attempted += test.questions_attempted || 0;
      statsMap.set(test.chapter_title, existing);
    });

    // Process quiz tests
    quizTests.forEach(test => {
      const existing = statsMap.get(test.chapter_title) || {
        chapter_title: test.chapter_title,
        revision_count: 0,
        quiz_count: 0,
        revision_avg_attempted: 0,
        quiz_avg_attempted: 0
      };
      existing.quiz_count++;
      existing.quiz_avg_attempted += test.questions_attempted || 0;
      statsMap.set(test.chapter_title, existing);
    });

    // Calculate averages
    statsMap.forEach(stat => {
      if (stat.revision_count > 0) {
        stat.revision_avg_attempted = Math.round(stat.revision_avg_attempted / stat.revision_count);
      }
      if (stat.quiz_count > 0) {
        stat.quiz_avg_attempted = Math.round(stat.quiz_avg_attempted / stat.quiz_count);
      }
    });

    setChapterStats(Array.from(statsMap.values()));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect, show nothing
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400 mt-1">LearnPython Analytics</p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to App
          </button>
        </div>

        {/* Analytics Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Usage Analytics</h2>
          </div>

          {analyticsLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Last 24 Hours */}
              <div className="bg-slate-800/50 rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Last 24 Hours</h3>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Total Page Views</span>
                    <span className="text-2xl font-bold text-white">{analyticsDay?.totalViews || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Unique Users</span>
                    <span className="text-2xl font-bold text-blue-400">{analyticsDay?.uniqueUsers || 0}</span>
                  </div>
                  {analyticsDay && Object.keys(analyticsDay.chapterViews).length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <p className="text-sm text-slate-400 mb-2">Top Chapters:</p>
                      {Object.entries(analyticsDay.chapterViews)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 3)
                        .map(([chapter, views]) => (
                          <div key={chapter} className="flex items-center justify-between text-sm mb-1">
                            <span className="text-slate-300 truncate max-w-[200px]">{chapter}</span>
                            <span className="text-green-400 font-medium">{views}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Last 7 Days */}
              <div className="bg-slate-800/50 rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Last 7 Days</h3>
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Total Page Views</span>
                    <span className="text-2xl font-bold text-white">{analyticsWeek?.totalViews || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Unique Users</span>
                    <span className="text-2xl font-bold text-purple-400">{analyticsWeek?.uniqueUsers || 0}</span>
                  </div>
                  {analyticsWeek && Object.keys(analyticsWeek.chapterViews).length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <p className="text-sm text-slate-400 mb-2">Top Chapters:</p>
                      {Object.entries(analyticsWeek.chapterViews)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 3)
                        .map(([chapter, views]) => (
                          <div key={chapter} className="flex items-center justify-between text-sm mb-1">
                            <span className="text-slate-300 truncate max-w-[200px]">{chapter}</span>
                            <span className="text-purple-400 font-medium">{views}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Page Views Breakdown */}
          {!analyticsLoading && analyticsDay && analyticsWeek && (
            <div className="mt-6 pt-6 border-t border-slate-800">
              <h3 className="text-md font-semibold text-white mb-4">Page Views Breakdown (Last 7 Days)</h3>
              <div className="space-y-2">
                {Object.entries(analyticsWeek.pageViews)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5)
                  .map(([page, views]) => (
                    <div key={page} className="flex items-center justify-between bg-slate-800/30 rounded-lg p-3">
                      <span className="text-slate-300 text-sm font-mono">{page}</span>
                      <span className="text-blue-400 font-semibold">{views}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-slate-400 text-sm">Total Users</span>
            </div>
            <p className="text-3xl font-bold text-white">{userCount}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-green-400" />
              <span className="text-slate-400 text-sm">Revision Tests</span>
            </div>
            <p className="text-3xl font-bold text-white">{revisionTests.length}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <ClipboardCheck className="w-5 h-5 text-purple-400" />
              <span className="text-slate-400 text-sm">Quiz Tests</span>
            </div>
            <p className="text-3xl font-bold text-white">{quizTests.length}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="w-5 h-5 text-yellow-400" />
              <span className="text-slate-400 text-sm">User Feedback</span>
            </div>
            <p className="text-3xl font-bold text-white">{feedbackList.length}</p>
          </div>
        </div>

        {/* Chapter-wise Progress */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Chapter-wise Progress</h2>
          {chapterStats.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No test data yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Chapter</th>
                    <th className="text-center py-3 px-4 text-slate-400 font-medium">Revisions</th>
                    <th className="text-center py-3 px-4 text-slate-400 font-medium">Avg Attempted</th>
                    <th className="text-center py-3 px-4 text-slate-400 font-medium">Quizzes</th>
                    <th className="text-center py-3 px-4 text-slate-400 font-medium">Avg Attempted</th>
                  </tr>
                </thead>
                <tbody>
                  {chapterStats.map((stat, idx) => (
                    <tr key={idx} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">{stat.chapter_title}</td>
                      <td className="py-3 px-4 text-center text-green-400">{stat.revision_count}</td>
                      <td className="py-3 px-4 text-center text-slate-300">
                        {stat.revision_count > 0 ? `${stat.revision_avg_attempted}/5` : '-'}
                      </td>
                      <td className="py-3 px-4 text-center text-purple-400">{stat.quiz_count}</td>
                      <td className="py-3 px-4 text-center text-slate-300">
                        {stat.quiz_count > 0 ? `${stat.quiz_avg_attempted}/10` : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* User Feedback */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">User Feedback</h2>
          {feedbackList.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No feedback yet</p>
          ) : (
            <div className="space-y-3">
              {feedbackList.map((f) => (
                <div key={f.id} className="bg-slate-800/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded bg-blue-900/50 text-blue-400">
                      📍 {f.context}
                    </span>
                    <span className="text-slate-600 text-xs ml-auto">
                      {new Date(f.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-300">{f.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Revisions */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Recent Revisions</h2>
            {revisionTests.length === 0 ? (
              <p className="text-slate-500 text-center py-4">No revisions yet</p>
            ) : (
              <div className="space-y-2">
                {revisionTests.slice(0, 10).map((test, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-800/50">
                    <div>
                      <p className="text-slate-300 text-sm">{test.chapter_title}</p>
                      <p className="text-slate-500 text-xs">
                        {new Date(test.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-medium">
                        {test.questions_attempted}/{test.questions_shown} attempted
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Quizzes */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Recent Quizzes</h2>
            {quizTests.length === 0 ? (
              <p className="text-slate-500 text-center py-4">No quizzes yet</p>
            ) : (
              <div className="space-y-2">
                {quizTests.slice(0, 10).map((test, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-800/50">
                    <div>
                      <p className="text-slate-300 text-sm">{test.chapter_title}</p>
                      <p className="text-slate-500 text-xs">
                        {new Date(test.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-purple-400 font-medium">
                        {test.questions_attempted}/{test.questions_shown} attempted
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

