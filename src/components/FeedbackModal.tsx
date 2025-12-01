"use client";

import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  context: string;
}

export default function FeedbackModal({ isOpen, onClose, context }: FeedbackModalProps) {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!message.trim()) return;
    
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        await supabase.from('feedback').insert({
          user_id: user.id,
          context,
          message: message.trim()
        });
      }
      
      setSubmitted(true);
      setTimeout(() => {
        setMessage('');
        setSubmitted(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setMessage('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md mx-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <h3 className="text-lg font-semibold text-white">
            👋 What's up?
          </h3>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-slate-800 rounded transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">🙌</div>
              <p className="text-white font-medium">Thanks for sharing!</p>
              <p className="text-slate-400 text-sm mt-1">Every bit helps make this better.</p>
            </div>
          ) : (
            <>
              {/* Context */}
              <div className="bg-slate-800/50 rounded-lg px-3 py-2 mb-3 text-sm">
                <span className="text-slate-500">📍 You're on: </span>
                <span className="text-slate-300">{context}</span>
              </div>
              
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Anything on your mind? Idea, bug, feedback, or just saying hi…"
                className="w-full h-32 bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-500 resize-none focus:outline-none focus:border-blue-500 transition-colors"
                autoFocus
              />
            </>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
          <div className="flex justify-end gap-3 p-4 border-t border-slate-800">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !message.trim()}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? 'Sending...' : (
                <>
                  Send <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}



