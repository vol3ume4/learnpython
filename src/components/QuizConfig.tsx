import React, { useState } from 'react';
import { Shield, Zap, Brain, Rocket } from 'lucide-react';
import clsx from 'clsx';

type Difficulty = 'easy' | 'medium' | 'hard' | 'mixed';

interface QuizConfigProps {
    onStart: (difficulty: Difficulty) => void;
}

export default function QuizConfig({ onStart }: QuizConfigProps) {
    const [difficulty, setDifficulty] = useState<Difficulty>('mixed');

    const difficulties: { id: Difficulty; label: string; color: string; desc: string; icon: React.ReactNode }[] = [
        { id: 'easy', label: 'Easy', color: 'text-green-400', desc: 'Warm-up questions to build confidence.', icon: <Shield className="w-5 h-5" /> },
        { id: 'medium', label: 'Medium', color: 'text-yellow-400', desc: 'Standard challenge level.', icon: <Zap className="w-5 h-5" /> },
        { id: 'hard', label: 'Hard', color: 'text-red-400', desc: 'Tough questions to test deep understanding.', icon: <Brain className="w-5 h-5" /> },
        { id: 'mixed', label: 'Mixed', color: 'text-purple-400', desc: 'A balanced mix of all levels.', icon: <Rocket className="w-5 h-5" /> },
    ];

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-orange-500/10 rounded-full mb-4 ring-1 ring-orange-500/30">
                    <Zap className="w-12 h-12 text-orange-500" />
                </div>
                <h1 className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
                    Unlock Chapter Quiz
                </h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    Ready to test your knowledge? We'll start with a quick <strong>5-question revision</strong> followed by a <strong>10-question AI surprise quiz</strong>.
                </p>
            </div>

            {/* Difficulty Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mt-12">
                {difficulties.map((level) => (
                    <button
                        key={level.id}
                        onClick={() => setDifficulty(level.id)}
                        className={clsx(
                            "relative p-6 rounded-xl border-2 text-left transition-all duration-200 group hover:scale-[1.02]",
                            difficulty === level.id
                                ? "bg-[#1f2937] border-blue-500 shadow-lg shadow-blue-500/20"
                                : "bg-[#0d1117] border-[#30363d] hover:border-slate-500"
                        )}
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className={clsx(level.color)}>{level.icon}</span>
                                <span className={clsx("text-lg font-bold", level.color)}>
                                    {level.label}
                                </span>
                            </div>
                            {difficulty === level.id && (
                                <div className="h-4 w-4 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                            )}
                        </div>
                        <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                            {level.desc}
                        </p>
                    </button>
                ))}
            </div>

            {/* Warning / Info Box */}
            <div className="bg-blue-900/10 border border-blue-800/30 rounded-xl p-6 max-w-3xl mx-auto flex gap-4 items-start">
                <Brain className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div className="space-y-2">
                    <h3 className="font-semibold text-blue-200">AI-Powered Experience</h3>
                    <p className="text-sm text-blue-200/70 leading-relaxed">
                        This quiz uses Gemini AI to generate unique questions and analyze your answers.
                        Please try to complete the full session once you start!
                    </p>
                </div>
            </div>

            {/* Action Button */}
            <div className="text-center pt-8">
                <button
                    onClick={() => onStart(difficulty)}
                    className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-orange-600 to-red-600 rounded-full hover:from-orange-500 hover:to-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 shadow-lg shadow-orange-900/20 hover:shadow-orange-900/40 hover:-translate-y-1"
                >
                    <span className="mr-2 text-lg">Enter the Hot Seat</span>
                    <Rocket className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="mt-4 text-sm text-slate-500 flex items-center justify-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Python Bachchan is waiting...
                </p>
            </div>
        </div>
    );
}
