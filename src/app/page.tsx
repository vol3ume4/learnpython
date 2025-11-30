"use client";

import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import { Play, ChevronRight, ChevronLeft, CheckCircle, XCircle, RotateCcw, Lightbulb, BookOpen, Code2, Trophy, Menu, X, Zap, MinusCircle, Lock } from 'lucide-react';
import { courseData } from '@/lib/course-content';
import { usePyodide } from '@/hooks/usePyodide';
import { DifficultyLevel, Exercise } from '@/lib/types';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import QuizConfig from '@/components/QuizConfig';
import { getRevisionQuestions, getQuizQuestions } from '@/lib/quiz-helpers';
import FeedbackModal from '@/components/FeedbackModal';
import PrivacyDisclaimer from '@/components/PrivacyDisclaimer';

export default function Home() {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('easy');
  const [code, setCode] = useState("");
  const { isReady, runCode, output, isRunning, resetOutput } = usePyodide();
  const [showHint, setShowHint] = useState(false);

  // Quiz State
  const [quizStage, setQuizStage] = useState<'config' | 'revision' | 'revision_snapshot' | 'quiz' | 'quiz_snapshot'>('config');
  const [quizDifficulty, setQuizDifficulty] = useState<'easy' | 'medium' | 'hard' | 'mixed'>('mixed');
  const [quizQuestions, setQuizQuestions] = useState<Exercise[]>([]);
  const [currentQuizQuestionIndex, setCurrentQuizQuestionIndex] = useState(0);
  const [quizResults, setQuizResults] = useState<{ questionId: string, correct: boolean, skipped: boolean, feedback?: string, suggestion?: string, question?: string, userCode?: string, userOutput?: string }[]>([]);
  const [finalResults, setFinalResults] = useState<typeof quizResults>([]); // Stable results for snapshot display
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState(false); // Track if Check Answer was clicked
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
  const [qualitativeReview, setQualitativeReview] = useState<string | null>(null);
  
  // Feedback and privacy
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showPrivacyDisclaimer, setShowPrivacyDisclaimer] = useState(false);
  const [pendingTestType, setPendingTestType] = useState<'revision' | 'quiz'>('revision');
  const [expandedQuestions, setExpandedQuestions] = useState<{ [key: string]: boolean }>({});

  // Save revision test to database (only tracks attempts, not scores - privacy first)
  const saveRevisionTest = async (results: typeof quizResults) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const attempted = results.filter(r => !r.skipped).length;

      await supabase.from('revision_tests').insert({
        user_id: user.id,
        chapter_index: currentChapterIndex,
        chapter_title: currentChapter.title,
        questions_shown: results.length,
        questions_attempted: attempted
      });
      
      console.log('Revision test logged (attempts only)');
    } catch (err) {
      console.error('Failed to save revision test:', err);
    }
  };

  // Save quiz test to database (only tracks attempts, not scores - privacy first)
  const saveQuizTest = async (results: typeof quizResults) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const attempted = results.filter(r => !r.skipped).length;

      await supabase.from('quiz_tests').insert({
        user_id: user.id,
        chapter_index: currentChapterIndex,
        chapter_title: currentChapter.title,
        questions_shown: results.length,
        questions_attempted: attempted
      });
      
      console.log('Quiz test logged (attempts only)');
    } catch (err) {
      console.error('Failed to save quiz test:', err);
    }
  };

  // Generate context string for feedback
  const getFeedbackContext = () => {
    let context = `Chapter ${currentChapterIndex + 1}: ${currentChapter.title}`;
    
    if (quizStage === 'revision') {
      context += ` > Revision > Q${currentQuizQuestionIndex + 1}`;
    } else if (quizStage === 'quiz') {
      context += ` > Quiz > Q${currentQuizQuestionIndex + 1}`;
    } else if (quizStage === 'revision_snapshot') {
      context += ' > Revision Snapshot';
    } else if (quizStage === 'quiz_snapshot') {
      context += ' > Quiz Snapshot';
    } else if (currentSection.type === 'exercises') {
      context += ` > Exercises > Q${currentExerciseIndex + 1}`;
    } else {
      context += ` > ${currentSection.title}`;
    }
    
    return context;
  };

  const askAI = async (type: 'explain_error' | 'hint') => {
    setIsAiLoading(true);
    setAiFeedback(null);

    try {
      const errorMsg = output.find(line => line.includes("Error")) || "";

      const questionContext = currentSection.type === 'exercises' ? currentExercise?.question :
        (quizStage === 'revision' ? quizQuestions[currentQuizQuestionIndex]?.question : "");

      const response = await fetch('/api/ai-help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          error: errorMsg,
          type,
          context: {
            question: questionContext || "",
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
  // Consider chapter as "last" if next chapter is coming soon or we're at the end
  const nextChapter = courseData.chapters[currentChapterIndex + 1];
  const isLastChapter = currentChapterIndex === courseData.chapters.length - 1 || nextChapter?.comingSoon;
  const isFirstChapter = currentChapterIndex === 0;

  // Get exercises filtered by difficulty
  const currentExercises = currentSection.type === 'exercises' && currentSection.exercises
    ? currentSection.exercises.filter((ex: Exercise) => ex.level === selectedDifficulty)
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
    } else if (quizStage === 'revision' && quizQuestions[currentQuizQuestionIndex]) {
      setCode(quizQuestions[currentQuizQuestionIndex].starterCode);
    } else {
      setCode("");
    }
    resetOutput();
    setShowHint(false);
    setIsCorrect(null);
    setAiFeedback(null);
  }, [currentSectionIndex, currentExerciseIndex, selectedDifficulty, currentChapterIndex, quizStage, currentQuizQuestionIndex]);

  const handleRun = async () => {
    resetOutput();
    setIsCorrect(null);
    await runCode(code);
  };

  const handleCheck = async () => {
    const exercise = currentSection.type === 'exercises' ? currentExercise :
      (quizStage === 'revision' ? quizQuestions[currentQuizQuestionIndex] : null);

    if (!exercise) return;

    setIsAiLoading(true);
    setAiFeedback(null);

    try {
      const response = await fetch('/api/analyze-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          question: exercise.question,
          output: output.join('\n'),
          expectedOutput: exercise.expectedOutput
        })
      });

      const data = await response.json();

      console.log('=== AI Evaluation Response ===', data);

      if (data.correct !== undefined) {
        console.log('Setting isCorrect to:', data.correct);
        
        // Double-check: if AI says incorrect but output actually matches, override
        const expected = exercise.expectedOutput.trim().toLowerCase();
        const actual = output.join('\n').trim().toLowerCase();
        const outputMatches = actual === expected || 
                             actual.includes(expected) || 
                             expected.includes(actual);
        
        console.log('Comparison:', { expected, actual, outputMatches, aiCorrect: data.correct });
        
        // Mark that Check Answer was clicked (disables Skip button)
        setHasCheckedAnswer(true);
        
        if (!data.correct && outputMatches) {
          console.log('AI marked wrong but output matches - overriding to correct');
          setIsCorrect(true);
          setAiFeedback("Great! Your output is correct! 🎉");
        } else if (data.correct || outputMatches) {
          // If either AI says correct OR output matches, mark as correct
          setIsCorrect(true);
          if (data.feedback) {
            setAiFeedback(data.feedback + (data.suggestion ? '\n\n💡 ' + data.suggestion : ''));
          }
        } else {
          setIsCorrect(data.correct);
          if (data.feedback) {
            setAiFeedback(data.feedback + (data.suggestion ? '\n\n💡 ' + data.suggestion : ''));
          }
        }
      } else {
        console.warn('No correct field in response, using fallback');
        // Fallback to simple comparison if AI fails
        const expected = exercise.expectedOutput.trim();
        const actual = output.join('\n').trim();
        setIsCorrect(actual === expected || actual.includes(expected));
      }
    } catch (error) {
      console.error('AI evaluation failed:', error);
      // Fallback to simple comparison
      const expected = exercise.expectedOutput.trim();
      const actual = output.join('\n').trim();
      setIsCorrect(actual === expected || actual.includes(expected));
    } finally {
      setIsAiLoading(false);
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
    // Don't allow navigation to coming soon chapters
    if (courseData.chapters[chapterIdx]?.comingSoon) return;
    
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

  const handleSkipQuizQuestion = () => {
    // Only allow skip if Check Answer hasn't been clicked
    if (hasCheckedAnswer) return;
    
    const newResult = {
      questionId: quizQuestions[currentQuizQuestionIndex].id,
      correct: false,
      skipped: true,
      question: quizQuestions[currentQuizQuestionIndex].question,
      userCode: code,
      userOutput: output.join('\n')
    };
    const allResults = [...quizResults, newResult];
    setQuizResults(allResults);
    handleNextQuizQuestionLogic(allResults);
  };

  const handleNextQuizQuestion = () => {
    console.log('Storing revision result - isCorrect:', isCorrect, 'for question:', currentQuizQuestionIndex + 1);
    
    const newResult = {
      questionId: quizQuestions[currentQuizQuestionIndex].id,
      correct: isCorrect === true,
      skipped: false,
      feedback: aiFeedback || "",
      question: quizQuestions[currentQuizQuestionIndex].question,
      userCode: code,
      userOutput: output.join('\n')
    };
    
    console.log('Result being stored:', newResult);
    const allResults = [...quizResults, newResult];
    setQuizResults(allResults);
    handleNextQuizQuestionLogic(allResults);
  };

  const handleNextQuizQuestionLogic = async (allResults: typeof quizResults) => {
    // Reset for next question
    setHasCheckedAnswer(false);
    
    if (currentQuizQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuizQuestionIndex(prev => prev + 1);
      setIsCorrect(null);
      resetOutput();
      setAiFeedback(null);
    } else {
      // IMPORTANT: Store final results BEFORE transitioning
      console.log('Questions complete. Final results:', allResults);
      setFinalResults(allResults);
      
      // Use correct snapshot stage based on current stage
      const isQuizMode = quizStage === 'quiz';
      const snapshotStage = isQuizMode ? 'quiz_snapshot' : 'revision_snapshot';
      console.log('Transitioning to:', snapshotStage);
      setQuizStage(snapshotStage);
      
      // Save to database (only tracks attempts, not scores)
      if (isQuizMode) {
        await saveQuizTest(allResults);
      } else {
        await saveRevisionTest(allResults);
      }
      
      // Generate qualitative review
      setIsAiLoading(true);
      try {
        const answersToReview = allResults.map((result, index) => ({
          questionId: result.questionId,
          question: result.question,
          userCode: result.userCode,
          userOutput: result.userOutput,
          expectedOutput: quizQuestions[index]?.expectedOutput || '',
          correct: result.correct || false,
          feedback: result.feedback || ''
        }));
        
        console.log('Sending to qualitative review:', answersToReview);

        const reviewResponse = await fetch('/api/qualitative-review', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            answers: answersToReview,
            chapterTitle: currentChapter.title
          })
        });

        const reviewData = await reviewResponse.json();
        if (reviewData.review) {
          setQualitativeReview(reviewData.review);
        }
      } catch (reviewError) {
        console.error('Qualitative review failed:', reviewError);
        setQualitativeReview("Great effort on the revision! Keep practicing to strengthen your Python skills.");
      } finally {
        setIsAiLoading(false);
      }
    }
  };

  const startMainQuiz = async () => {
    setIsAiLoading(true);
    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: currentChapter.description,
          chapterTitle: currentChapter.title,
          difficulty: quizDifficulty,
          chapterIndex: currentChapterIndex
        })
      });

      const data = await response.json();
      if (data.exercises && Array.isArray(data.exercises)) {
        setQuizQuestions(data.exercises);
      } else {
        // Fallback to static if format is wrong
        setQuizQuestions(getQuizQuestions(currentChapter.id));
      }
    } catch (error) {
      console.error("Failed to generate quiz:", error);
      // Fallback to static
      setQuizQuestions(getQuizQuestions(currentChapter.id));
    } finally {
      setIsAiLoading(false);
      setCurrentQuizQuestionIndex(0);
      setQuizResults([]);
      setFinalResults([]);
      setQualitativeReview(null);
      setExpandedQuestions({});
      setHasCheckedAnswer(false);
      setQuizStage('quiz');
    }
  };

  // batchEvaluateQuiz removed - now using individual background Gemini calls per question

  // Background evaluation for a single quiz question using Gemini
  const evaluateQuizQuestionInBackground = async (
    questionIndex: number,
    exercise: Exercise,
    userCode: string,
    userOutput: string
  ) => {
    try {
      console.log(`Background Gemini eval starting for Q${questionIndex + 1}`);
      
      const response = await fetch('/api/analyze-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: userCode,
          question: exercise.question,
          output: userOutput,
          expectedOutput: exercise.expectedOutput
        })
      });

      const data = await response.json();
      console.log(`Background Gemini eval result for Q${questionIndex + 1}:`, data);

      // Update the specific result in quizResults and finalResults
      const updateResult = (prev: typeof quizResults) => prev.map((r, idx) => 
        idx === questionIndex 
          ? { ...r, correct: data.correct ?? false, feedback: data.feedback || "", suggestion: data.suggestion || "" }
          : r
      );
      
      setQuizResults(updateResult);
      setFinalResults(updateResult);

    } catch (error) {
      console.error(`Background Gemini eval failed for Q${questionIndex + 1}:`, error);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!quizQuestions[currentQuizQuestionIndex]) return;

    const exercise = quizQuestions[currentQuizQuestionIndex];
    const questionIndex = currentQuizQuestionIndex;

    console.log('Submitting quiz answer for Q', questionIndex + 1);

    const newResult = {
      questionId: exercise.id,
      correct: false, // Will be evaluated in background by Gemini
      skipped: false,
      feedback: "",
      suggestion: "",
      question: exercise.question,
      userCode: code,
      userOutput: output.join('\n')
    };

    // Store the answer immediately
    const allResults = [...quizResults, newResult];
    setQuizResults(allResults);
    setFinalResults(allResults);

    // Start background Gemini evaluation (don't await - runs async while user continues)
    evaluateQuizQuestionInBackground(questionIndex, exercise, code, output.join('\n'));

    if (currentQuizQuestionIndex < quizQuestions.length - 1) {
      // Move to next question immediately (Gemini evaluation happens in background)
      setCurrentQuizQuestionIndex(prev => prev + 1);
      setIsCorrect(null);
      resetOutput();
    } else {
      // Last question - show loading while we wait for evaluations to complete
      setIsAiLoading(true);
      setQuizStage('quiz_snapshot');
      
      // Wait for background evaluations to complete (they run in parallel)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Save quiz to database (only tracks attempts, not scores)
      await saveQuizTest(allResults);
      
      // Generate qualitative review using the evaluated results
      try {
        const reviewResponse = await fetch('/api/qualitative-review', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            answers: allResults.map((r, idx) => ({
              questionId: r.questionId,
              question: r.question,
              userCode: r.userCode,
              userOutput: r.userOutput,
              expectedOutput: quizQuestions[idx]?.expectedOutput || '',
              correct: r.correct,
              feedback: r.feedback
            })),
            chapterTitle: currentChapter.title
          })
        });
        
        const reviewData = await reviewResponse.json();
        if (reviewData.review) {
          setQualitativeReview(reviewData.review);
        }
      } catch (error) {
        console.error('Qualitative review failed:', error);
        setQualitativeReview("Great work completing the quiz! Keep practicing.");
      }
      
      setIsAiLoading(false);
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
              <div className={clsx(
                "font-semibold text-sm uppercase tracking-wider flex items-center gap-2",
                chapter.comingSoon ? "text-slate-500" : "text-blue-400"
              )}>
                <span>Chapter {chapterIdx + 1}: {chapter.title}</span>
                {chapter.comingSoon && (
                  <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full font-normal normal-case">
                    Coming Soon
                  </span>
                )}
              </div>
              {chapter.comingSoon ? (
                <div className="ml-2 px-3 py-2 text-slate-600 text-sm flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>{chapter.description}</span>
                </div>
              ) : (
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
              )}
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
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFeedbackModal(true)}
                className="text-sm text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800 flex items-center gap-1.5"
              >
                👋 What's up?
              </button>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push('/login');
                }}
                className="text-sm text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800"
              >
                Sign Out
              </button>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3 ml-14">
            {currentSection.type === 'theory' && <BookOpen className="w-8 h-8 text-blue-400" />}
            {currentSection.type === 'examples' && <Code2 className="w-8 h-8 text-purple-400" />}
            {currentSection.type === 'exercises' && <Trophy className="w-8 h-8 text-yellow-400" />}
            {currentSection.type === 'quiz' && <Zap className="w-8 h-8 text-orange-400" />}
            {currentSection.type === 'quiz' ? "Unlock Chapter Quiz" : currentSection.title}
          </h1>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Theory Section */}
          {currentSection.type === 'theory' && currentSection.content && (
            <div className="theory-content">
              <ReactMarkdown
                components={{
                  h1: ({children}) => (
                    <h1 className="text-3xl font-bold text-white mt-10 mb-6 pb-3 border-b border-slate-700/50">{children}</h1>
                  ),
                  h2: ({children}) => (
                    <h2 className="text-2xl font-semibold text-white mt-10 mb-5 flex items-center gap-3">
                      <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                      {children}
                    </h2>
                  ),
                  h3: ({children}) => (
                    <h3 className="text-xl font-medium text-slate-200 mt-8 mb-4">{children}</h3>
                  ),
                  p: ({children}) => (
                    <p className="text-slate-300 text-lg leading-8 mb-6">{children}</p>
                  ),
                  strong: ({children}) => (
                    <strong className="text-white font-semibold">{children}</strong>
                  ),
                  code: ({className, children}) => {
                    const isBlock = className?.includes('language-');
                    if (isBlock) {
                      return (
                        <code className={`${className} block`}>{children}</code>
                      );
                    }
                    return (
                      <code className="px-2 py-1 bg-slate-800/80 text-emerald-400 rounded-md text-[0.9em] font-mono border border-slate-700/50">{children}</code>
                    );
                  },
                  pre: ({children}) => (
                    <div className="my-8 rounded-xl overflow-hidden border border-slate-700/50 shadow-lg shadow-black/20">
                      <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700/50 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                        <span className="ml-3 text-xs text-slate-500 font-mono">python</span>
                      </div>
                      <pre className="bg-slate-900/80 p-5 overflow-x-auto text-sm leading-relaxed">{children}</pre>
                    </div>
                  ),
                  ul: ({children}) => (
                    <ul className="my-6 space-y-3">{children}</ul>
                  ),
                  ol: ({children}) => (
                    <ol className="my-6 space-y-3 list-decimal list-inside">{children}</ol>
                  ),
                  li: ({children}) => (
                    <li className="text-slate-300 text-lg leading-7 flex items-start gap-3">
                      <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
                      <span>{children}</span>
                    </li>
                  ),
                  table: ({children}) => (
                    <div className="my-8 rounded-xl overflow-hidden border border-slate-700/50 shadow-lg shadow-black/10">
                      <table className="w-full">{children}</table>
                    </div>
                  ),
                  thead: ({children}) => (
                    <thead className="bg-slate-800/70">{children}</thead>
                  ),
                  th: ({children}) => (
                    <th className="px-5 py-3.5 text-left text-sm font-semibold text-slate-200 border-b border-slate-700/50">{children}</th>
                  ),
                  td: ({children}) => (
                    <td className="px-5 py-3.5 text-slate-300 border-b border-slate-800/50">{children}</td>
                  ),
                  blockquote: ({children}) => (
                    <blockquote className="my-6 pl-5 border-l-4 border-blue-500 bg-blue-500/5 py-4 pr-4 rounded-r-lg text-slate-300 italic">{children}</blockquote>
                  ),
                  hr: () => (
                    <hr className="my-10 border-slate-700/50" />
                  ),
                }}
              >
                {currentSection.content}
              </ReactMarkdown>
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

          {/* Quiz Section */}
          {currentSection.type === 'quiz' && (
            <div className="h-full">
              {quizStage === 'config' && (
                <QuizConfig
                  onStart={(difficulty) => {
                    setQuizDifficulty(difficulty);
                    setPendingTestType('revision');
                    setShowPrivacyDisclaimer(true);
                  }}
                  isLoading={isAiLoading}
                />
              )}
              {(quizStage === 'revision' || quizStage === 'quiz') && quizQuestions[currentQuizQuestionIndex] && (
                <div className="max-w-4xl mx-auto p-6 space-y-6">
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                    <span>Question {currentQuizQuestionIndex + 1} of {quizQuestions.length}</span>
                    <span className="flex items-center gap-2 text-blue-400 font-medium">
                      <Zap className="w-4 h-4" /> {quizStage === 'revision' ? 'Revision Mode' : 'Quiz Mode'}
                    </span>
                  </div>

                  <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white">
                        Question {currentQuizQuestionIndex + 1}
                      </h3>
                      <span className={clsx(
                        "px-3 py-1 rounded-full text-xs font-bold border",
                        getDifficultyColor(quizQuestions[currentQuizQuestionIndex].level)
                      )}>
                        {quizQuestions[currentQuizQuestionIndex].level.toUpperCase()}
                      </span>
                    </div>
                    <div className="mb-6 text-slate-300 text-lg leading-relaxed">
                      <ReactMarkdown
                        components={{
                          p: ({children}) => <span>{children}</span>,
                          code: ({children}) => (
                            <code className="px-2 py-1 bg-slate-800/80 text-emerald-400 rounded-md text-[0.9em] font-mono border border-slate-700/50">{children}</code>
                          ),
                          strong: ({children}) => <strong className="text-white font-semibold">{children}</strong>,
                        }}
                      >
                        {quizQuestions[currentQuizQuestionIndex].question}
                      </ReactMarkdown>
                    </div>

                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-800">
                      <button
                        onClick={handleSkipQuizQuestion}
                        disabled={hasCheckedAnswer}
                        className={clsx(
                          "px-4 py-2 rounded transition-colors",
                          hasCheckedAnswer 
                            ? "text-slate-600 cursor-not-allowed" 
                            : "text-slate-400 hover:text-white hover:bg-slate-800"
                        )}
                      >
                        Skip Question
                      </button>

                      {quizStage === 'revision' && isCorrect === true && (
                        <button
                          onClick={handleNextQuizQuestion}
                          className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 animate-bounce shadow-lg shadow-green-900/20"
                        >
                          Next Question <ChevronRight className="w-4 h-4" />
                        </button>
                      )}

                      {quizStage === 'quiz' && (
                        <button
                          onClick={handleSubmitQuiz}
                          disabled={isAiLoading}
                          className={clsx(
                            "px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-blue-900/20",
                            isAiLoading ? "bg-blue-800 cursor-not-allowed opacity-70" : "bg-blue-600 hover:bg-blue-500 text-white"
                          )}
                        >
                          {isAiLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Evaluating...
                            </>
                          ) : (
                            <>Submit Answer <ChevronRight className="w-4 h-4" /></>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {quizStage === 'revision_snapshot' && isAiLoading && (
                <div className="max-w-2xl mx-auto p-8 text-center">
                  <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-700 mb-4">
                      <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Evaluating Your Answers...</h2>
                    <p className="text-slate-400">Generating your personalized code review</p>
                  </div>
                </div>
              )}

              {quizStage === 'revision_snapshot' && (() => {
                // Use finalResults which is set synchronously before transition
                const resultsToShow = finalResults.length > 0 ? finalResults : quizResults;
                console.log('=== REVISION SNAPSHOT DISPLAY ===');
                console.log('Final Results:', resultsToShow);
                console.log('Correct count:', resultsToShow.filter(r => r.correct).length);
                console.log('Total questions:', quizQuestions.length);
                resultsToShow.forEach((r, i) => {
                  console.log(`Q${i+1}: correct=${r.correct}, skipped=${r.skipped}, question=${r.question?.substring(0, 30)}...`);
                });
                return true;
              })() && (
                <div className="max-w-3xl mx-auto p-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-700 mb-4">
                      <span className="text-4xl font-bold text-white">
                        {(finalResults.length > 0 ? finalResults : quizResults).filter(r => r.correct).length}/{quizQuestions.length}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Revision Snapshot</h2>
                    {(() => {
                      const resultsToUse = finalResults.length > 0 ? finalResults : quizResults;
                      const score = resultsToUse.filter(r => r.correct).length;
                      const total = quizQuestions.length;
                      const percentage = (score / total) * 100;
                      if (percentage === 100) return <p className="text-xl text-green-400">Perfect! You're ready for the main quiz! 🌟</p>;
                      if (percentage >= 80) return <p className="text-xl text-blue-400">Great work! You've got this! 💪</p>;
                      if (percentage >= 60) return <p className="text-xl text-yellow-400">Good progress! Review and try again! 📚</p>;
                      if (percentage >= 40) return <p className="text-xl text-orange-400">Keep practicing! You're improving! 🔄</p>;
                      return <p className="text-xl text-slate-400">Take your time and review the material! 🚀</p>;
                    })()}
                  </div>

                  {qualitativeReview && (
                    <div className="mb-8 bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-700/50 rounded-xl p-6 shadow-lg">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                          <Lightbulb className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-purple-300 mb-2">Your Personal Code Review</h3>
                          <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{qualitativeReview}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 mb-8">
                    {quizQuestions.map((q, idx) => {
                      const resultsToUse = finalResults.length > 0 ? finalResults : quizResults;
                      const result = resultsToUse.find(r => r.questionId === q.id);
                      const isExpanded = expandedQuestions[q.id] || false;

                      return (
                        <div key={q.id} className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
                          <button
                            onClick={() => setExpandedQuestions(prev => ({ ...prev, [q.id]: !isExpanded }))}
                            className="w-full p-4 text-left hover:bg-slate-800/50 transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3 flex-1">
                                <span className="text-slate-500 font-mono text-sm font-bold mt-1">Q{idx + 1}</span>
                                <div className="flex-1">
                                  <p className="text-slate-300 font-medium">{q.question}</p>
                                  {result?.feedback && !isExpanded && (
                                    <p className="text-sm text-slate-400 italic mt-1 line-clamp-1">
                                      AI: {result.feedback}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {result?.correct ? (
                                  <CheckCircle className="w-5 h-5 text-green-400" />
                                ) : result?.skipped ? (
                                  <>
                                    <span className="text-xs text-slate-500 font-medium">Skipped</span>
                                    <MinusCircle className="w-5 h-5 text-slate-500" />
                                  </>
                                ) : (
                                  <XCircle className="w-5 h-5 text-red-400" />
                                )}
                                <ChevronRight className={clsx("w-4 h-4 text-slate-500 transition-transform", isExpanded && "rotate-90")} />
                              </div>
                            </div>
                          </button>

                          {isExpanded && (
                            <div className="px-4 pb-4 space-y-3 border-t border-slate-800 pt-3">
                              {result?.skipped ? (
                                <div className="bg-slate-800/50 border border-slate-700 rounded p-4 text-center">
                                  <MinusCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                                  <p className="text-slate-400 font-medium">Question Skipped</p>
                                  <p className="text-sm text-slate-500 mt-1">No answer was submitted for this question.</p>
                                </div>
                              ) : (
                                <>
                                  {result?.userCode && (
                                    <div>
                                      <p className="text-xs text-slate-500 font-semibold mb-1">Your Code:</p>
                                      <pre className="bg-slate-950 p-3 rounded text-sm text-slate-300 overflow-x-auto">
                                        <code>{result.userCode}</code>
                                      </pre>
                                    </div>
                                  )}

                                  {result?.userOutput && (
                                    <div>
                                      <p className="text-xs text-slate-500 font-semibold mb-1">Your Output:</p>
                                      <pre className="bg-slate-950 p-3 rounded text-sm text-slate-300">
                                        {result.userOutput}
                                      </pre>
                                    </div>
                                  )}

                                  {result?.feedback && (
                                    <div className="bg-blue-900/20 border border-blue-800/30 rounded p-3">
                                      <p className="text-xs text-blue-400 font-semibold mb-1">AI Feedback:</p>
                                      <p className="text-sm text-blue-200">{result.feedback}</p>
                                    </div>
                                  )}

                                  {result?.suggestion && !result.correct && (
                                    <div className="bg-yellow-900/20 border border-yellow-800/30 rounded p-3">
                                      <p className="text-xs text-yellow-400 font-semibold mb-1">Suggestion:</p>
                                      <p className="text-sm text-yellow-200">{result.suggestion}</p>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => {
                        setQuizStage('config');
                        setQuizResults([]);
                        setFinalResults([]);
                        setQualitativeReview(null);
                        setExpandedQuestions({});
                        setHasCheckedAnswer(false);
                      }}
                      className="px-6 py-3 rounded-lg font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      Retry Revision
                    </button>
                    <button
                      onClick={() => {
                        setPendingTestType('quiz');
                        setShowPrivacyDisclaimer(true);
                      }}
                      disabled={isAiLoading}
                      className={clsx(
                        "px-8 py-3 rounded-lg font-bold text-white shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2",
                        isAiLoading ? "bg-blue-800 cursor-not-allowed opacity-70" : "bg-blue-600 hover:bg-blue-500"
                      )}
                    >
                      {isAiLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>Start Main Quiz <ChevronRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {quizStage === 'quiz_snapshot' && (() => {
                // Use finalResults for quiz snapshot (set during batch evaluation)
                const resultsToShow = finalResults.length > 0 ? finalResults : quizResults;
                console.log('=== QUIZ SNAPSHOT DISPLAY ===');
                console.log('Final Results:', resultsToShow);
                console.log('Correct count:', resultsToShow.filter(r => r.correct).length);
                console.log('Total questions:', quizQuestions.length);
                resultsToShow.forEach((r, i) => {
                  console.log(`Q${i+1}: correct=${r.correct}, skipped=${r.skipped}, question=${r.question?.substring(0, 30)}...`);
                });
                return true;
              })() && (
                <div className="max-w-3xl mx-auto p-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 border-4 border-blue-500 mb-6 shadow-2xl">
                      <span className="text-5xl font-bold text-white">
                        {Math.round(((finalResults.length > 0 ? finalResults : quizResults).filter(r => r.correct).length / quizQuestions.length) * 100)}%
                      </span>
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-3">Chapter Quiz Snapshot</h2>
                    {(() => {
                      const resultsToUse = finalResults.length > 0 ? finalResults : quizResults;
                      const score = resultsToUse.filter(r => r.correct).length;
                      const total = quizQuestions.length;
                      const percentage = (score / total) * 100;

                      if (percentage === 100) return <p className="text-xl text-green-400">Perfect score! You're a Python Pro! 🌟</p>;
                      if (percentage >= 80) return <p className="text-xl text-blue-400">Excellent work! You've got a strong grasp! 💪</p>;
                      if (percentage >= 60) return <p className="text-xl text-yellow-400">Good effort! Keep practicing to sharpen your skills! 📚</p>;
                      if (percentage >= 40) return <p className="text-xl text-orange-400">You're making progress! Review the concepts and try again! 🔄</p>;
                      return <p className="text-xl text-slate-400">Keep learning! Every attempt makes you stronger! 🚀</p>;
                    })()}
                  </div>

                  {qualitativeReview && (
                    <div className="mb-8 bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-700/50 rounded-xl p-6 shadow-lg">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                          <Lightbulb className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-purple-300 mb-2">Your Personal Code Review</h3>
                          <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{qualitativeReview}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 mb-8">
                    {quizQuestions.map((q, idx) => {
                      const resultsToUse = finalResults.length > 0 ? finalResults : quizResults;
                      const result = resultsToUse.find(r => r.questionId === q.id);
                      const isExpanded = expandedQuestions[q.id] || false;

                      return (
                        <div key={q.id} className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
                          <button
                            onClick={() => setExpandedQuestions(prev => ({ ...prev, [q.id]: !isExpanded }))}
                            className="w-full p-4 text-left hover:bg-slate-800/50 transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3 flex-1">
                                <span className="text-slate-500 font-mono text-sm font-bold mt-1">Q{idx + 1}</span>
                                <div className="flex-1">
                                  <p className="text-slate-300 font-medium">{q.question}</p>
                                  {result?.feedback && !isExpanded && (
                                    <p className="text-sm text-slate-400 italic mt-1 line-clamp-1">
                                      AI: {result.feedback}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {result?.correct ? (
                                  <CheckCircle className="w-5 h-5 text-green-400" />
                                ) : result?.skipped ? (
                                  <>
                                    <span className="text-xs text-slate-500 font-medium">Skipped</span>
                                    <MinusCircle className="w-5 h-5 text-slate-500" />
                                  </>
                                ) : (
                                  <XCircle className="w-5 h-5 text-red-400" />
                                )}
                                <ChevronRight className={clsx("w-4 h-4 text-slate-500 transition-transform", isExpanded && "rotate-90")} />
                              </div>
                            </div>
                          </button>

                          {isExpanded && (
                            <div className="px-4 pb-4 space-y-3 border-t border-slate-800 pt-3">
                              {result?.skipped ? (
                                <div className="bg-slate-800/50 border border-slate-700 rounded p-4 text-center">
                                  <MinusCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                                  <p className="text-slate-400 font-medium">Question Skipped</p>
                                  <p className="text-sm text-slate-500 mt-1">No answer was submitted for this question.</p>
                                </div>
                              ) : (
                                <>
                                  {result?.userCode && (
                                    <div>
                                      <p className="text-xs text-slate-500 font-semibold mb-1">Your Code:</p>
                                      <pre className="bg-slate-950 p-3 rounded text-sm text-slate-300 overflow-x-auto">
                                        <code>{result.userCode}</code>
                                      </pre>
                                    </div>
                                  )}

                                  {result?.userOutput && (
                                    <div>
                                      <p className="text-xs text-slate-500 font-semibold mb-1">Your Output:</p>
                                      <pre className="bg-slate-950 p-3 rounded text-sm text-slate-300">
                                        {result.userOutput}
                                      </pre>
                                    </div>
                                  )}

                                  {result?.feedback && (
                                    <div className="bg-blue-900/20 border border-blue-800/30 rounded p-3">
                                      <p className="text-xs text-blue-400 font-semibold mb-1">AI Feedback:</p>
                                      <p className="text-sm text-blue-200">{result.feedback}</p>
                                    </div>
                                  )}

                                  {result?.suggestion && !result.correct && (
                                    <div className="bg-yellow-900/20 border border-yellow-800/30 rounded p-3">
                                      <p className="text-xs text-yellow-400 font-semibold mb-1">Suggestion:</p>
                                      <p className="text-sm text-yellow-200">{result.suggestion}</p>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => {
                        setQuizStage('config');
                        setQuizResults([]);
                        setFinalResults([]);
                        setQualitativeReview(null);
                        setExpandedQuestions({});
                        setHasCheckedAnswer(false);
                      }}
                      className="px-6 py-3 rounded-lg font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-slate-700"
                    >
                      Retry Quiz
                    </button>
                    <button
                      onClick={() => {
                        // Navigate to next section or chapter
                        if (!isLastSection) {
                          setCurrentSectionIndex(prev => prev + 1);
                        } else if (!isLastChapter) {
                          setCurrentChapterIndex(prev => prev + 1);
                          setCurrentSectionIndex(0);
                        }
                        setQuizStage('config');
                        setQuizResults([]);
                        setFinalResults([]);
                        setQualitativeReview(null);
                        setExpandedQuestions({});
                        setHasCheckedAnswer(false);
                      }}
                      className="px-8 py-3 rounded-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2"
                    >
                      Continue Learning <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Exercises Section */}
          {
            currentSection.type === 'exercises' && (
              <div>
                {/* Difficulty Selector */}
                <div className="bg-[#0d1117] border-b border-slate-800 p-4 flex items-center gap-3">
                  <span className="text-sm text-slate-400 font-medium">Difficulty:</span>
                  {(['easy', 'medium', 'hard'] as DifficultyLevel[]).map((level) => (
                    <button
                      key={level}
                      onClick={() => {
                        setSelectedDifficulty(level);
                        setCurrentExerciseIndex(0);
                      }}
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
                {/* Exercise Number Buttons */}
                <div className="bg-[#0d1117] border-b border-slate-800 p-4 sticky top-0 z-10 flex items-center gap-2 overflow-x-auto">
                  {currentExercises.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentExerciseIndex(idx)}
                      className={clsx(
                        "w-8 h-8 rounded-lg text-sm font-medium transition-all flex-shrink-0",
                        idx === currentExerciseIndex
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                          : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                      )}
                    >
                      {idx + 1}
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

                    <div className="mb-6 text-slate-300 text-lg leading-relaxed">
                      <ReactMarkdown
                        components={{
                          p: ({children}) => <span>{children}</span>,
                          code: ({children}) => (
                            <code className="px-2 py-1 bg-slate-800/80 text-emerald-400 rounded-md text-[0.9em] font-mono border border-slate-700/50">{children}</code>
                          ),
                          strong: ({children}) => <strong className="text-white font-semibold">{children}</strong>,
                        }}
                      >
                        {currentExercise.question}
                      </ReactMarkdown>
                    </div>

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
            )
          }
        </div >

        {/* Navigation Footer */}
        < div className="p-6 border-t border-slate-800 bg-slate-900/50 flex justify-between items-center" >
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
        </div >
      </div >

      {/* Right Panel: Editor & Terminal */}
      {
        (currentSection.type !== 'quiz' || (quizStage !== 'config' && quizStage !== 'revision_snapshot' && quizStage !== 'quiz_snapshot')) && (
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
                    } else if (quizStage === 'revision' && quizQuestions[currentQuizQuestionIndex]) {
                      setCode(quizQuestions[currentQuizQuestionIndex].starterCode);
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

                {((currentSection.type === 'exercises' && currentExercise) || (quizStage === 'revision' && quizQuestions[currentQuizQuestionIndex])) && (
                  <button
                    onClick={handleCheck}
                    disabled={isAiLoading}
                    className="flex items-center gap-2 px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all border border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAiLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Checking...
                      </>
                    ) : (
                      'Check Answer'
                    )}
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

                {(currentSection.type === 'exercises' || quizStage === 'revision') && (
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
        )
      }
      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        context={getFeedbackContext()}
      />

      {/* Privacy Disclaimer before tests */}
      <PrivacyDisclaimer
        isOpen={showPrivacyDisclaimer}
        onAccept={() => {
          setShowPrivacyDisclaimer(false);
          if (pendingTestType === 'revision') {
            // Start revision
            const questions = getRevisionQuestions(currentChapter.id, quizDifficulty);
            setQuizQuestions(questions);
            setCurrentQuizQuestionIndex(0);
            setQuizResults([]);
            setFinalResults([]);
            setIsCorrect(null);
            setAiFeedback(null);
            resetOutput();
            setQuizStage('revision');
          } else {
            // Start quiz generation
            startMainQuiz();
          }
        }}
        type={pendingTestType}
      />
    </main >
  );
}


