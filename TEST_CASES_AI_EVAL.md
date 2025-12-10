# Test Cases for AI Evaluation Fix

## Test Case 1: Banana Counting Bug (CRITICAL)

### Question
Count the number of "a" in "banana"

### Expected Output
```
3
```

### Student Code (INCORRECT LOGIC)
```python
txt = "banana"
count=0
for ch in txt:
    if "a" in txt:  # ❌ BUG: checks entire string, not current char
        count = count + 1
print(count)
```

### Actual Output
```
6
```

### Expected AI Evaluation (NEW - Encouraging Coach Style)
- ❌ **correct: false** (fact-based)
- **feedback:** "Good effort on the loop structure! However, your code checks if 'a' exists in the entire string rather than checking each character. This counts all 6 characters instead of just the 'a's."
- **suggestion:** "Try using 'if ch == \"a\"' to check the current character in the loop."

### Previous Behavior (WRONG)
- ✅ correct: true (marked correct when it shouldn't be)
- Too lenient, ignored logic error

---

## Test Case 2: Correct Solution

### Student Code (CORRECT)
```python
txt = "banana"
count = 0
for ch in txt:
    if ch == "a":  # ✅ CORRECT: checks current character
        count = count + 1
print(count)
```

### Actual Output
```
3
```

### Expected AI Evaluation
- ✅ **correct: true**
- **feedback:** "Perfect! You correctly used the loop variable to check each character."
- **suggestion:** ""

---

## Test Case 3: Alternative Correct Solution

### Student Code (CORRECT - using count method)
```python
txt = "banana"
count = txt.count("a")
print(count)
```

### Actual Output
```
3
```

### Expected AI Evaluation
- ✅ **correct: true**
- **feedback:** "Great! Using the built-in count() method is an efficient solution."
- **suggestion:** ""

---

## Test Case 4: Whitespace Differences (Should Still Pass)

### Student Code (CORRECT)
```python
txt = "banana"
count = 0
for ch in txt:
    if ch == "a":
        count += 1
print(count)
```

### Actual Output (with extra newline)
```
3

```

### Expected AI Evaluation
- ✅ **correct: true** (lenient with whitespace)
- **feedback:** "Correct! Your logic is sound."
- **suggestion:** ""

---

## Test Case 5: Wrong Variable Name (Should Fail)

### Question
Print each character in "hello"

### Student Code (INCORRECT LOGIC)
```python
txt = "hello"
for ch in txt:
    print(txt)  # ❌ BUG: prints entire string, not current char
```

### Actual Output
```
hello
hello
hello
hello
hello
```

### Expected AI Evaluation
- ❌ **correct: false**
- **feedback:** "You're printing the entire string 'txt' instead of the current character 'ch'."
- **suggestion:** "Change 'print(txt)' to 'print(ch)' to print each character."

---

## How to Test

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Navigate to an exercise section**

3. **For each test case:**
   - Paste the student code
   - Click "Run Code" to see output
   - Click "Check Answer" to see AI evaluation
   - Verify the AI response matches expected evaluation

4. **Check console logs:**
   - Open browser DevTools (F12)
   - Check Console tab for evaluation logs
   - Look for "=== AI Evaluation Response ===" logs

---

## Success Criteria

✅ Test Case 1: AI marks as INCORRECT and explains the logic error  
✅ Test Case 2: AI marks as CORRECT  
✅ Test Case 3: AI marks as CORRECT (accepts alternative solutions)  
✅ Test Case 4: AI marks as CORRECT (lenient with whitespace)  
✅ Test Case 5: AI marks as INCORRECT and explains variable usage error  

---

## If Tests Fail

### If AI still marks Test Case 1 as correct:
1. Check if Gemini API key is set correctly
2. Verify the prompt changes were deployed
3. Check console for API errors
4. Try clearing browser cache

### If AI marks Test Case 2 as incorrect:
1. The prompt may be too strict
2. Check the feedback message for clues
3. May need to adjust the prompt wording

### If API calls fail:
1. Check `.env.local` for `GEMINI_API_KEY`
2. Verify API key has quota remaining
3. Check network tab for 500 errors
