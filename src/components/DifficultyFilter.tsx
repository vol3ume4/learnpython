import React from 'react';
import clsx from 'clsx';
import { DifficultyLevel } from '@/lib/types';

interface DifficultyFilterProps {
    selectedDifficulty: DifficultyLevel;
    onDifficultyChange: (level: DifficultyLevel) => void;
}

export default function DifficultyFilter({ selectedDifficulty, onDifficultyChange }: DifficultyFilterProps) {
    return (
        <div className="bg-[#0d1117] border-b border-slate-800 p-4 flex items-center gap-3">
            <span className="text-sm text-slate-400 font-medium">Difficulty:</span>
            {(['easy', 'medium', 'hard'] as DifficultyLevel[]).map((level) => (
                <button
                    key={level}
                    onClick={() => onDifficultyChange(level)}
                    className={clsx(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize",
                        selectedDifficulty === level
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                    )}
                >
                    {level}
                </button>
            ))}
        </div>
    );
}
