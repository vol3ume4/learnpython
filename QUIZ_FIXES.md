# Quiz UI Issues & Solutions

## Issues Reported:

### 1. QuizConfig Page Too Tall
**Problem:** The revision test page with difficulty options is too big, requiring scrolling to see the launch button.

**Solution:** Reduce padding and spacing in `src/components/QuizConfig.tsx`:
- Change `p-6 space-y-8` to `p-4 space-y-5`
- Change `mt-12` to `mt-8`  
- Change `pt-8` to `pt-6`

### 2. Check Answer Button Appears in Revision Mode
**Problem:** "Check Answer" button shows in revision mode, which may not be intended.

**Current Behavior:** By design, it appears for both exercises and revision.
**Line 720 in page.tsx:**
```tsx
{((currentSection.type === 'exercises' && currentExercise) || (quizStage === 'revision' && quizQuestions[currentQuizQuestionIndex])) && (
```

**Solution (if you want to remove it from revision):**
Change line 720 to:
```tsx
{(currentSection.type === 'exercises' && currentExercise) && (
```

### 3. Answer Evaluation Not Reliable
**Problem:** Answers are marked incorrect even when logically correct.

**Examples:**
- Q1: `print(firstName, lastName)` outputs `"Hi there"` but expects `"Ada Lovelace"` 
  - Issue: Different values, but format is correct
- Q4: Printing text 3 times separately instead of using `text * count`
  - Expected: `"PythonPythonPython"` (concatenated)
  - Got: Three separate lines

**Current Logic (line 132-139):**
```tsx
const expected = exercise.expectedOutput.trim();
const actual = output.join('\n').trim();

if (actual === expected || actual.includes(expected)) {
  setIsCorrect(true);
} else {
  setIsCorrect(false);
}
```

**Solution - Normalize Whitespace:**
```tsx
const handleCheck = () => {
  const exercise = currentSection.type === 'exercises' ? currentExercise :
    (quizStage === 'revision' ? quizQuestions[currentQuizQuestionIndex] : null);

  if (!exercise) return;

  const expected = exercise.expectedOutput.trim();
  const actual = output.join('\n').trim();

  // Normalize whitespace (collapse multiple spaces/newlines to single space)
  const normalizeOutput = (str: string) => str.replace(/\s+/g, ' ').trim();
  const normalizedExpected = normalizeOutput(expected);
  const normalizedActual = normalizeOutput(actual);

  if (normalizedActual === normalizedExpected || actual === expected) {
    setIsCorrect(true);
  } else {
    setIsCorrect(false);
  }
};
```

**Apply same fix to `handleSubmitQuiz` (line 234-247):**
```tsx
const handleSubmitQuiz = async () => {
  if (!quizQuestions[currentQuizQuestionIndex]) return;
  
  const exercise = quizQuestions[currentQuizQuestionIndex];
  const expected = exercise.expectedOutput.trim();
  const actual = output.join('\n').trim();
  
  // Normalize whitespace
  const normalizeOutput = (str: string) => str.replace(/\s+/g, ' ').trim();
  const normalizedExpected = normalizeOutput(expected);
  const normalizedActual = normalizeOutput(actual);
  
  const isCorrect = normalizedActual === normalizedExpected || actual === expected;
  
  setQuizResults(prev => [...prev, {
    questionId: exercise.id,
    correct: isCorrect,
    skipped: false
  }]);
  
  if (currentQuizQuestionIndex < quizQuestions.length - 1) {
    setCurrentQuizQuestionIndex(prev => prev + 1);
    setIsCorrect(null);
    resetOutput();
  } else {
    setQuizStage('quiz_snapshot');
  }
};
```

## Note on Q1 Example:
The issue with Q1 (`firstName + lastName`) is that the expected output is `"Ada Lovelace"` but the user wrote `"Hi there"`. This is actually **correct behavior** - the values are different. The normalization fix will help with spacing issues like:
- `"Hi there"` vs `"Hi  there"` (extra space)
- `"Hi\nthere"` vs `"Hi there"` (newline vs space)

## Files to Edit:
1. `src/components/QuizConfig.tsx` - Reduce height
2. `src/app/page.tsx` - Fix handleCheck and handleSubmitQuiz logic
3. `src/app/page.tsx` - Optionally remove Check Answer from revision mode
