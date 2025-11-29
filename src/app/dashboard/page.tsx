"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Loader2, BookOpen, LogOut } from 'lucide-react';

export default function DashboardPage() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }
            setUser(user);
        } catch (error) {
            console.error('Error loading dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    const handleStartLearning = () => {
        router.push('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0d1117] flex items-center justify-center text-white">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0d1117] text-white font-sans">
            {/* Header */}
            <header className="border-b border-[#30363d] bg-[#161b22] px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">🐍</span>
                    <h1 className="text-xl font-bold">My Dashboard</h1>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-400">{user?.email}</span>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-[#30363d] rounded-lg transition-colors text-slate-400 hover:text-white border border-transparent hover:border-[#30363d]"
                        title="Sign Out"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Sign Out</span>
                    </button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto p-8 space-y-8">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/30 rounded-2xl p-8">
                    <h2 className="text-3xl font-bold mb-4">Welcome back! 👋</h2>
                    <p className="text-slate-300 mb-6 max-w-2xl">
                        Ready to continue your Python journey?
                    </p>
                    <button
                        onClick={handleStartLearning}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20"
                    >
                        <BookOpen className="w-5 h-5" />
                        Continue Learning
                    </button>
                </div>
            </main>
        </div>
    );
}
