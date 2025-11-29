"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Loader2, Shield, BookOpen, LogOut, CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx';

export default function DashboardPage() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [guidedMode, setGuidedMode] = useState(false);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);
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

            // Fetch settings
            const { data: settings } = await supabase
                .from('user_settings')
                .select('guided_mode')
                .eq('user_id', user.id)
                .single();

            if (settings) {
                setGuidedMode(settings.guided_mode);
                // Show modal if it's their first time (guided_mode is false by default)
                // In a real app, we might track 'has_seen_onboarding' separately
                if (settings.guided_mode === false) {
                    // For now, let's show it every time if it's off, or maybe just once. 
                    // User requirement: "asked to click a msg box which explains... can turn it off"
                    // Let's show it if it's OFF, assuming they might want to turn it on.
                    // Or better, check a local storage flag for the session to avoid annoyance.
                    const hasSeen = localStorage.getItem('hasSeenPrivacyModal');
                    if (!hasSeen) {
                        setShowWelcomeModal(true);
                    }
                }
            }
        } catch (error) {
            console.error('Error loading dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleGuidedMode = async (newValue: boolean) => {
        try {
            setGuidedMode(newValue);
            const { error } = await supabase
                .from('user_settings')
                .update({ guided_mode: newValue })
                .eq('user_id', user.id);

            if (error) throw error;

            if (newValue) {
                // If turning ON, maybe show a success toast or just stay
            }
        } catch (error) {
            console.error('Error updating settings:', error);
            setGuidedMode(!newValue); // Revert on error
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
                        className="p-2 hover:bg-[#30363d] rounded-lg transition-colors text-slate-400 hover:text-white"
                        title="Sign Out"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto p-8 space-y-8">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/30 rounded-2xl p-8">
                    <h2 className="text-3xl font-bold mb-4">Welcome back! 👋</h2>
                    <p className="text-slate-300 mb-6 max-w-2xl">
                        Ready to continue your Python journey? Your progress is being tracked.
                    </p>
                    <button
                        onClick={handleStartLearning}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20"
                    >
                        <BookOpen className="w-5 h-5" />
                        Continue Learning
                    </button>
                </div>

                {/* Settings Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Shield className="w-5 h-5 text-green-400" />
                                Privacy & Learning Mode
                            </h3>
                            <div className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={guidedMode}
                                    onChange={(e) => toggleGuidedMode(e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className={clsx(
                                "p-4 rounded-xl border transition-all",
                                guidedMode
                                    ? "bg-blue-900/10 border-blue-800/30"
                                    : "bg-slate-800/30 border-slate-700"
                            )}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className={clsx("font-bold mb-1", guidedMode ? "text-blue-400" : "text-slate-400")}>
                                            Guided Mode is {guidedMode ? "ON" : "OFF"}
                                        </h4>
                                        <p className="text-sm text-slate-400">
                                            {guidedMode
                                                ? "AI Tutor is active. Your progress is being analyzed to provide personalized hints."
                                                : "You are in Stealth Mode. No AI analysis. Progress is saved locally only."}
                                        </p>
                                    </div>
                                    {guidedMode ? (
                                        <CheckCircle className="w-5 h-5 text-blue-400" />
                                    ) : (
                                        <Shield className="w-5 h-5 text-slate-500" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Welcome / Privacy Modal */}
            {showWelcomeModal && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <h2 className="text-xl font-bold text-white">Enable Guided Mode? 🚀</h2>
                                <button
                                    onClick={() => {
                                        setShowWelcomeModal(false);
                                        localStorage.setItem('hasSeenPrivacyModal', 'true');
                                    }}
                                    className="text-slate-400 hover:text-white"
                                >
                                    <XCircle className="w-6 h-6" />
                                </button>
                            </div>

                            <p className="text-slate-300 leading-relaxed">
                                To get the most out of LearnPython, we recommend enabling <strong>Guided Mode</strong>.
                            </p>

                            <ul className="space-y-3 text-sm text-slate-400 bg-[#0d1117] p-4 rounded-xl border border-[#30363d]">
                                <li className="flex gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                    <span><strong>AI Tutor:</strong> Get smart hints and error explanations.</span>
                                </li>
                                <li className="flex gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                    <span><strong>Progress Tracking:</strong> Save your completed exercises to the cloud.</span>
                                </li>
                                <li className="flex gap-2">
                                    <Shield className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <span><strong>Privacy Control:</strong> You can turn this off at any time in your dashboard.</span>
                                </li>
                            </ul>

                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => {
                                        toggleGuidedMode(true);
                                        setShowWelcomeModal(false);
                                        localStorage.setItem('hasSeenPrivacyModal', 'true');
                                    }}
                                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                                >
                                    Enable Guided Mode
                                </button>
                                <button
                                    onClick={() => {
                                        setShowWelcomeModal(false);
                                        localStorage.setItem('hasSeenPrivacyModal', 'true');
                                    }}
                                    className="flex-1 py-2.5 bg-[#30363d] hover:bg-[#3c444d] text-white rounded-lg font-medium transition-colors"
                                >
                                    Stay in Stealth Mode
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
