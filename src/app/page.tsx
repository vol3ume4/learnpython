"use client";

import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, ChevronRight, ChevronLeft, CheckCircle, XCircle, RotateCcw, Lightbulb, BookOpen, Code2, Trophy, Menu, X } from 'lucide-react';
import { courseData } from '@/lib/course-content';
import { usePyodide } from '@/hooks/usePyodide';
import { DifficultyLevel, Exercise } from '@/lib/types';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('easy');
  const [code, setCode] = useState("");
  const { isReady, runCode, output, isRunning, resetOutput } = usePyodide();
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showTOC, setShowTOC] = useState(false);
  const router = useRouter();

  // Auth Check
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
      }
    };
    checkAuth();
  }, []);

  // AI Tutor State
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const askAI = async (type: 'explain_error' | 'hint') => {
    setIsAiLoading(true);
    setAiFeedback(null);

    try {
      const errorMsg = output.find(line => line.includes("Error")) || "";

      const response = await fetch('/api/ai-help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          error: errorMsg,
          type,
          context: {
            question: currentExercise?.question || "",
            output: output.join("\n")
          }
        })
      });

      const data = await response.json();

      if (data.text) {
        setAiFeedback(data.text);
      } else if (data.details) {
        setAiFeedback(`Error: ${data.details}`);
      }
    } catch (err) {
      console.error(err);
      setAiFeedback("Sorry, I couldn't connect to the AI tutor right now.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const currentChapter = courseData.chapters[currentChapterIndex];
  const currentSection = currentChapter.sections[currentSectionIndex];
  const isLastSection = currentSectionIndex === currentChapter.sections.length - 1;
  const isFirstSection = currentSectionIndex === 0;
  const isLastChapter = currentChapterIndex === courseData.chapters.length - 1;
  const isFirstChapter = currentChapterIndex === 0;

  // Get exercises filtered by difficulty
  const currentExercises = currentSection.type === 'exercises' && currentSection.exercises
    ? currentSection.exercises.filter(ex => ex.level === selectedDifficulty)
    : [];

  const currentExercise = currentExercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === currentExercises.length - 1;
  const isFirstExercise = currentExerciseIndex === 0;

  // Reset state when section or exercise changes
  useEffect(() => {
    if (currentSection.type === 'examples' && currentSection.examples && currentSection.examples[0]) {
      setCode(currentSection.examples[0].code);
    } else if (currentSection.type === 'exercises' && currentExercise) {
      setCode(currentExercise.starterCode);
    } else {
      setCode("");
    }
    resetOutput();
    setShowHint(false);
    setIsCorrect(null);
  }, [currentSectionIndex, currentExerciseIndex, selectedDifficulty, currentChapterIndex]);

  const handleRun = async () => {
    resetOutput();
    setIsCorrect(null);
    await runCode(code);
  };

  const handleCheck = () => {
    if (!currentExercise) return;

    const expected = currentExercise.expectedOutput.trim();
    const actual = output.join('\n').trim();

    if (actual === expected || actual.includes(expected)) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const nextSection = () => {
    if (!isLastSection) {
      setCurrentSectionIndex(prev => prev + 1);
      setCurrentExerciseIndex(0);
    } else if (!isLastChapter) {
      // Move to next chapter
      setCurrentChapterIndex(prev => prev + 1);
      setCurrentSectionIndex(0);
      setCurrentExerciseIndex(0);
    }
  };

  const prevSection = () => {
    if (!isFirstSection) {
      setCurrentSectionIndex(prev => prev - 1);
      setCurrentExerciseIndex(0);
    } else if (!isFirstChapter) {
      // Move to previous chapter's last section
      setCurrentChapterIndex(prev => prev - 1);
      const prevChapter = courseData.chapters[currentChapterIndex - 1];
      setCurrentSectionIndex(prevChapter.sections.length - 1);
      setCurrentExerciseIndex(0);
    }
  };

  const nextExercise = () => {
    if (!isLastExercise) setCurrentExerciseIndex(prev => prev + 1);
  };

  const prevExercise = () => {
    if (!isFirstExercise) setCurrentExerciseIndex(prev => prev - 1);
  };

  const navigateToSection = (chapterIdx: number, sectionIdx: number) => {
    setCurrentChapterIndex(chapterIdx);
    setCurrentSectionIndex(sectionIdx);
    setCurrentExerciseIndex(0);
    setShowTOC(false);
  };

  const getDifficultyColor = (level: DifficultyLevel) => {
    switch (level) {
      case 'easy': return 'text-green-400 bg-green-900/30 border-green-700';
      case 'medium': return 'text-yellow-400 bg-yellow-900/30 border-yellow-700';
      case 'hard': return 'text-red-400 bg-red-900/30 border-red-700';
    }
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'theory': return <BookOpen className="w-4 h-4" />;
      case 'examples': return <Code2 className="w-4 h-4" />;
      case 'exercises': return <Trophy className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <main className="flex h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
      {/* Table of Contents Sidebar */}
      <div className={clsx(
        "fixed inset-y-0 left-0 z-50 w-80 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out overflow-y-auto",
        showTOC ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-center sticky top-0 bg-slate-900 z-10">
          <h2 className="text-xl font-bold text-white">Table of Contents</h2>
          <button
            onClick={() => setShowTOC(false)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {courseData.chapters.map((chapter, chapterIdx) => (
            <div key={chapter.id} className="space-y-2">
              <div className="font-semibold text-blue-400 text-sm uppercase tracking-wider">
                Chapter {chapterIdx + 1}: {chapter.title}
              </div>
              <div className="space-y-1 ml-2">
                {chapter.sections.map((section, sectionIdx) => (
                  <button
                    key={section.id}
                    onClick={() => navigateToSection(chapterIdx, sectionIdx)}
                    className={clsx(
                      "w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-2 text-sm",
                      chapterIdx === currentChapterIndex && sectionIdx === currentSectionIndex
                        ? "bg-blue-600 text-white font-medium"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    )}
                  >
                    {getSectionIcon(section.type)}
                    <span className="flex-1">{section.title}</span>
                    {section.type === 'exercises' && (
                      <span className="text-xs opacity-70">15</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {showTOC && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setShowTOC(false)}
        />
      )}

      {/* Left Panel: Content */}
      <div className="w-1/2 flex flex-col border-r border-slate-800">
        {/* Header */}
        <header className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900/80 to-slate-800/50">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowTOC(true)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                title="Table of Contents"
              >
                <Menu className="w-5 h-5 text-slate-400" />
              </button>
              <div className="flex items-center gap-2 text-sm text-blue-400 font-medium">
                <span>{courseData.title}</span>
                <span>/</span>
                <span>{currentChapter.title}</span>
              </div>
            </div>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-sm font-medium transition-colors border border-slate-700"
            >
              Dashboard
            </button>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3 ml-14">
            {currentSection.type === 'theory' && <BookOpen className="w-8 h-8 text-blue-400" />}
            {currentSection.type === 'examples' && <Code2 className="w-8 h-8 text-purple-400" />}
            {currentSection.type === 'exercises' && <Trophy className="w-8 h-8 text-yellow-400" />}
            {currentSection.title}
          </h1>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Theory Section */}
          {currentSection.type === 'theory' && (
            <div className="prose prose-invert max-w-none">
              <div className="text-lg leading-relaxed text-slate-300 whitespace-pre-wrap">
                {currentSection.content}
              </div>
            </div>
          )}

          {/* Examples Section */}
          {currentSection.type === 'examples' && currentSection.examples && (
            <div className="space-y-6">
              {currentSection.examples.map((example, idx) => (
                <div key={idx} className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                  <div className="p-4 bg-slate-800/50 border-b border-slate-700">
                    <h3 className="text-lg font-semibold text-white">Example {idx + 1}</h3>
                  </div>
                  <div className="p-6">
                    <pre className="bg-slate-950 p-4 rounded-lg mb-4 overflow-x-auto">
                      <code className="text-sm text-slate-300">{example.code}</code>
                    </pre>
                    <p className="text-slate-400 leading-relaxed">{example.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Exercises Section */}
          {currentSection.type === 'exercises' && (
            <div>
              {/* Difficulty Selector */}
              <div className="mb-6 flex gap-3">
                {(['easy', 'medium', 'hard'] as DifficultyLevel[]).map(level => (
                  <button
                    key={level}
                    onClick={() => {
                      setSelectedDifficulty(level);
                      setCurrentExerciseIndex(0);
                    }}
                    className={clsx(
                      "px-4 py-2 rounded-lg font-medium transition-all border",
                      selectedDifficulty === level
                        ? getDifficultyColor(level)
                        : "text-slate-500 bg-slate-900 border-slate-700 hover:border-slate-600"
                    )}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>

              {currentExercise && (
                <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">
                      Exercise {currentExerciseIndex + 1} of {currentExercises.length}
                    </h3>
                    <span className={clsx(
                      "px-3 py-1 rounded-full text-xs font-bold border",
                      getDifficultyColor(selectedDifficulty)
                    )}>
                      {selectedDifficulty.toUpperCase()}
                    </span>
                  </div>

                  <p className="mb-6 text-slate-300 text-lg leading-relaxed">
                    {currentExercise.question}
                  </p>

                  {showHint && (
                    <div className="mb-4 p-4 bg-blue-950/30 border border-blue-900/50 rounded-lg text-blue-200 flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <p>{currentExercise.hint}</p>
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
                      onClick={() => setCode(currentExercise.solution)}
                      className="text-sm text-slate-400 hover:text-white transition-colors ml-auto"
                    >
                      Show Solution
                    </button>
                  </div>

                  {/* Exercise Navigation */}
                  {currentExercises.length > 1 && (
                    <div className="mt-6 pt-6 border-t border-slate-700 flex justify-between items-center">
                      <button
                        onClick={prevExercise}
                        disabled={isFirstExercise}
                        className="text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        ← Previous Exercise
                      </button>
                      <button
                        onClick={nextExercise}
                        disabled={isLastExercise}
                        className="text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        Next Exercise →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex justify-between items-center">
          <button
            onClick={prevSection}
            disabled={isFirstSection && isFirstChapter}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="flex gap-2">
            {currentChapter.sections.map((section, idx) => (
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
            disabled={isLastSection && isLastChapter}
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
              onClick={() => {
                if (currentSection.type === 'exercises' && currentExercise) {
                  setCode(currentExercise.starterCode);
                } else if (currentSection.type === 'examples' && currentSection.examples?.[0]) {
                  setCode(currentSection.examples[0].code);
                }
              }}
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

            {currentSection.type === 'exercises' && currentExercise && (
              <button
                onClick={handleCheck}
                className="flex items-center gap-2 px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all border border-slate-600"
              >
                Check Answer
              </button>
            )}

            {/* AI Help Buttons */}
            {output.some(line => line.includes("Error")) && (
              <button
                onClick={() => askAI('explain_error')}
                disabled={isAiLoading}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-red-900/30 text-red-400 border border-red-800 hover:bg-red-900/50 transition-all disabled:opacity-50"
              >
                {isAiLoading ? "Thinking..." : "Explain Error"}
              </button>
            )}

            {currentSection.type === 'exercises' && (
              <button
                onClick={() => askAI('hint')}
                disabled={isAiLoading}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-purple-900/30 text-purple-400 border border-purple-800 hover:bg-purple-900/50 transition-all disabled:opacity-50"
              >
                {isAiLoading ? "Thinking..." : "✨ AI Hint"}
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
                "text-xs font-bold px-2 py-1 rounded flex items-center gap-1",
                isCorrect ? "bg-green-900/50 text-green-400" : "bg-red-900/50 text-red-400"
              )}>
                {isCorrect ? <><CheckCircle className="w-3 h-3" /> CORRECT!</> : <><XCircle className="w-3 h-3" /> TRY AGAIN</>}
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

            {/* AI Feedback Display */}
            {aiFeedback && (
              <div className="mt-4 p-4 bg-slate-800/50 border border-slate-700 rounded-lg animate-in fade-in slide-in-from-bottom-2">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-bold text-purple-400 flex items-center gap-2">
                    ✨ AI Tutor
                  </h4>
                  <button onClick={() => setAiFeedback(null)} className="text-slate-500 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{aiFeedback}</p>
              </div>
            )}

            {isCorrect === true && (
              <div className="mt-4 text-green-400 font-bold flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Perfect! Try the next exercise or move to the next section.
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
