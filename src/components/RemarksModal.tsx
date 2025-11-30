"use client";

import { useState } from 'react';
import { X, MessageSquare } from 'lucide-react';

interface RemarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (remarks: string) => void;
  type: 'revision' | 'quiz';
}

export default function RemarksModal({ isOpen, onClose, onSubmit, type }: RemarksModalProps) {
  const [remarks, setRemarks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await onSubmit(remarks);
    setIsSubmitting(false);
    setRemarks('');
    onClose();
  };

  const handleSkip = () => {
    onSubmit(''); // Submit empty remarks
    setRemarks('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md mx-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">
              Share Your Feedback
            </h3>
          </div>
          <button
            onClick={handleSkip}
            className="p-1 hover:bg-slate-800 rounded transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          <p className="text-slate-400 text-sm mb-3">
            How was your {type === 'revision' ? 'revision' : 'quiz'} experience? 
            Any suggestions or issues? (Optional)
          </p>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="e.g., Questions were clear, loved the feedback, would like more hints..."
            className="w-full h-32 bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-500 resize-none focus:outline-none focus:border-blue-500 transition-colors"
            autoFocus
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t border-slate-800">
          <button
            onClick={handleSkip}
            className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
          >
            Skip
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}

