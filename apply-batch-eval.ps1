$file = "src\app\page.tsx"
$content = Get-Content $file -Raw

# Find the position after startMainQuiz function (after line with setQuizStage('quiz');)
$insertPosition = $content.IndexOf("setQuizStage('quiz');`r`n    };`r`n")
if ($insertPosition -eq -1) {
    Write-Host "Could not find insertion point"
    exit 1
}
$insertPosition = $content.IndexOf("};", $insertPosition) + 4

# Insert batchEvaluateQuiz function
$batchEvalFunction = @"

  const batchEvaluateQuiz = async () => {
    setIsAiLoading(true);
    
    try {
      const answersToEvaluate = quizResults.map((result, index) => ({
        questionId: result.questionId,
        question: result.question,
        userCode: result.userCode,
        userOutput: result.userOutput,
        expectedOutput: quizQuestions[index].expectedOutput
      }));

      const response = await fetch('/api/batch-evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: answersToEvaluate })
      });

      const data = await response.json();
      
      if (data.results && Array.isArray(data.results)) {
        setQuizResults(prev => prev.map((result, index) => ({
          ...result,
          correct: data.results[index]?.correct || false,
          feedback: data.results[index]?.feedback || "",
          suggestion: data.results[index]?.suggestion || ""
        })));
      }
    } catch (error) {
      console.error('Batch evaluation failed:', error);
      setQuizResults(prev => prev.map((result, index) => {
        const expected = quizQuestions[index].expectedOutput.trim();
        const actual = result.userOutput.trim();
        return {
          ...result,
          correct: actual === expected || actual.includes(expected)
        };
      }));
    } finally {
      setIsAiLoading(false);
      setQuizStage('quiz_snapshot');
    }
  };
"@

$content = $content.Insert($insertPosition, $batchEvalFunction)

# Now replace handleSubmitQuiz function
$oldFunction = @"
  const handleSubmitQuiz = async \(\) => \{[\s\S]*?setQuizStage\('quiz_snapshot'\);[\s\S]*?\n  \};
"@

$newFunction = @"
  const handleSubmitQuiz = async () => {
    if (!quizQuestions[currentQuizQuestionIndex]) return;

    const exercise = quizQuestions[currentQuizQuestionIndex];

    // Just store the answer without evaluation
    setQuizResults(prev => [...prev, {
      questionId: exercise.id,
      correct: false,
      skipped: false,
      feedback: "",
      suggestion: "",
      question: exercise.question,
      userCode: code,
      userOutput: output.join('\n')
    }]);

    if (currentQuizQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuizQuestionIndex(prev => prev + 1);
      setIsCorrect(null);
      resetOutput();
    } else {
      // Last question - trigger batch evaluation
      await batchEvaluateQuiz();
    }
  };
"@

$content = $content -replace $oldFunction, $newFunction

# Save the file
$content | Set-Content $file -NoNewline

Write-Host "✅ Successfully updated page.tsx with batch evaluation!"
