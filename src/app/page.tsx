
"use client";

import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, ChevronRight, ChevronLeft, CheckCircle, XCircle, RotateCcw, Lightbulb } from 'lucide-react';
import { courseContent, Section } from '@/lib/course-content';
import { usePyodide } from '@/hooks/usePyodide';
import clsx from 'clsx';

export default function Home() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [code, setCode] = useState("");
  const { isReady, runCode, output, isRunning, resetOutput } = usePyodide();
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentSection = courseContent.sections[currentSectionIndex];
  const isLastSection = currentSectionIndex === courseContent.sections.length - 1;
  const isFirstSection = currentSectionIndex === 0;

  // Reset state when section changes
  useEffect(() => {
    if (currentSection.type === 'example' && currentSection.code) {
      setCode(currentSection.code);
    } else if (currentSection.type === 'exercise' && currentSection.exercise) {
      setCode(currentSection.exercise.starterCode);
    } else {
      setCode("");
    }
    resetOutput();
    setShowHint(false);
    setIsCorrect(null);
  }, [currentSectionIndex]);

  const handleRun = async () => {
    resetOutput();
    await runCode(code);

    // Simple validation for exercises
    if (currentSection.type === 'exercise' && currentSection.exercise) {
      // We need to wait a bit for the output to populate or check the result logic
      // For this PoC, we'll check the output after a short delay or assume the output hook updates fast enough.
      // Actually, since runCode awaits, the output state might not be updated immediately in this render cycle if it's async state updates.
      // A better way is to check the output in a useEffect or pass a callback.
      // For now, let's just check the output in the next render or use a timeout.

      // HACK: Allow state to update. In a real app, we'd return the result from runCode.
      setTimeout(() => {
        // This is a bit hacky because we are reading the state from the hook which might be stale in this closure
        // But let's try to read the output from the DOM or just rely on the user to see the result for now.
        // Actually, let's implement a "Check" button separate from "Run" for clarity.
      }, 100);
    }
  };

  const handleCheck = () => {
    if (currentSection.type !== 'exercise' || !currentSection.exercise) return;

    const expected = currentSection.exercise.expectedOutput.trim();
    const actual = output.join('\n').trim();

    if (actual.includes(expected)) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const nextSection = () => {
    if (!isLastSection) setCurrentSectionIndex(prev => prev + 1);
  };

  const prevSection = () => {
    if (!isFirstSection) setCurrentSectionIndex(prev => prev - 1);
  };

  return (
    <main className="flex h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
      {/* Left Panel: Content */}
      <div className="w-1/2 flex flex-col border-r border-slate-800">
        {/* Header */}
        <header className="p-6 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2 text-sm text-blue-400 font-medium mb-2">
            <span>{courseContent.title}</span>
            <span>/</span>
            <span>Step {currentSectionIndex + 1} of {courseContent.sections.length}</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{currentSection.title}</h1>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 prose prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-lg leading-relaxed text-slate-300">
            {currentSection.content}
          </div>

          {currentSection.type === 'exercise' && currentSection.exercise && (
            <div className="mt-8 p-6 bg-slate-900 rounded-xl border border-slate-800">
              <h3 className="text-xl font-semibold text-white mb-4">Your Task</h3>
              <p className="mb-4 text-slate-300">{currentSection.exercise.question}</p>

              {showHint && (
                <div className="mb-4 p-4 bg-blue-950/30 border border-blue-900/50 rounded-lg text-blue-200 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p>{currentSection.exercise.hint}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Lightbulb className="w-4 h-4" />
                  {showHint ? "Hide Hint" : "Show Hint"}
                </button>
                <button
                  onClick={() => setCode(currentSection.exercise!.solution)}
                  className="text-sm text-slate-400 hover:text-white transition-colors ml-auto"
                >
                  Show Solution
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex justify-between items-center">
          <button
            onClick={prevSection}
            disabled={isFirstSection}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="flex gap-2">
            {/* Dots indicator */}
            {courseContent.sections.map((_, idx) => (
              <div
                key={idx}
                className={clsx(
                  "w-2 h-2 rounded-full transition-all",
                  idx === currentSectionIndex ? "bg-blue-500 w-4" : "bg-slate-700"
                )}
              />
            ))}
          </div>

          <button
            onClick={nextSection}
            disabled={isLastSection}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg shadow-blue-900/20"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Right Panel: Editor & Terminal */}
      <div className="w-1/2 flex flex-col bg-[#1e1e1e]">
        {/* Editor Toolbar */}
        <div className="h-12 flex items-center justify-between px-4 bg-[#252526] border-b border-[#333]">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">main.py</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCode(currentSection.type === 'exercise' ? currentSection.exercise!.starterCode : "")}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
              title="Reset Code"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="flex-1 relative">
          <Editor
            height="100%"
            defaultLanguage="python"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 16,
              padding: { top: 20 },
              scrollBeyondLastLine: false,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            }}
          />
        </div>

        {/* Action Bar */}
        <div className="h-16 bg-[#252526] border-t border-[#333] flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            {!isReady ? (
              <span className="text-yellow-500 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                Loading Python Environment...
              </span>
            ) : (
              <span className="text-green-500 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Ready
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRun}
              disabled={!isReady || isRunning}
              className="flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-900/20"
            >
              {isRunning ? (
                <span className="animate-spin">⟳</span>
              ) : (
                <Play className="w-4 h-4 fill-current" />
              )}
              Run Code
            </button>

            {currentSection.type === 'exercise' && (
              <button
                onClick={handleCheck}
                className="flex items-center gap-2 px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all border border-slate-600"
              >
                Check Answer
              </button>
            )}
          </div>
        </div>

        {/* Terminal Output */}
        <div className="h-1/3 bg-[#1e1e1e] border-t border-[#333] flex flex-col">
          <div className="px-4 py-2 bg-[#252526] border-b border-[#333] flex justify-between items-center">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Terminal</span>
            {isCorrect !== null && (
              <span className={clsx(
                "text-xs font-bold px-2 py-1 rounded",
                isCorrect ? "bg-green-900/50 text-green-400" : "bg-red-900/50 text-red-400"
              )}>
                {isCorrect ? "CORRECT!" : "TRY AGAIN"}
              </span>
            )}
          </div>
          <div className="flex-1 p-4 font-mono text-sm overflow-y-auto">
            {output.length === 0 ? (
              <span className="text-slate-600 italic">Output will appear here...</span>
            ) : (
              output.map((line, i) => (
                <div key={i} className="text-slate-300 mb-1">{line}</div>
              ))
            )}
            {/* Success/Fail Message in Terminal */}
            {isCorrect === true && (
              <div className="mt-4 text-green-400 font-bold flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Great job! You can move to the next section.
              </div>
            )}
            {isCorrect === false && (
              <div className="mt-4 text-red-400 font-bold flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Not quite. Check the hint or try again!
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
