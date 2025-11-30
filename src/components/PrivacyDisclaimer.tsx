"use client";

import { Shield } from 'lucide-react';

interface PrivacyDisclaimerProps {
  isOpen: boolean;
  onAccept: () => void;
  type: 'revision' | 'quiz';
}

export default function PrivacyDisclaimer({ isOpen, onAccept, type }: PrivacyDisclaimerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md mx-4 shadow-2xl">
        {/* Header */}
        <div className="p-6 text-center border-b border-slate-800">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900/30 border-2 border-green-700 mb-4">
            <Shield className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-white">
            Safe Practice Space
          </h3>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-slate-300 leading-relaxed mb-4">
            This is a safe, student-friendly practice space. Your test scores and AI-generated questions are <span className="text-green-400 font-medium">not stored</span>.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            If you wish to revisit something, please save it privately or take a screenshot.
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={onAccept}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all"
          >
            Got it, let's start!
          </button>
        </div>
      </div>
    </div>
  );
}

