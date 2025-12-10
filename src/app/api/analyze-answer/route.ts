import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
    try {
        const { code, question, output, expectedOutput } = await request.json();

        console.log('=== AI Evaluation Request ===');
        console.log('Question:', question);
        console.log('Code:', code);
        console.log('Output:', output);
        console.log('Expected:', expectedOutput);

        if (!code || !question) {
            return NextResponse.json({
                correct: false,
                feedback: 'Missing code or question',
                suggestion: 'Please provide both code and question'
            });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `You are a supportive Python tutor evaluating a beginner student's code.

**Question:** ${question}

**Student's Code:**
\`\`\`python
${code}
\`\`\`

**Student's Output:**
${output || 'No output'}

**Expected Output:**
${expectedOutput || 'Check if code logic is correct'}

**Evaluation Instructions:**

1. **Be FACT-BASED on correctness:**
   - Mark CORRECT only if BOTH code logic AND output are correct
   - Mark INCORRECT if code logic is wrong OR output doesn't match expected
   - Don't mark correct just because "it's close" or "they tried"

2. **Check CODE LOGIC first:**
   - Does the code use correct logic to solve the problem?
   - Are variables used properly? (e.g., in loops, use loop variable 'ch', not the collection 'txt')
   - Are conditions checking the right things? (e.g., 'if ch == "a"' not 'if "a" in txt' inside a loop)
   - Does the code demonstrate understanding of the concept?

3. **Then check OUTPUT:**
   - Does actual output match expected output?
   - Be lenient with whitespace/formatting differences only

4. **Common beginner mistakes to catch:**
   - Using wrong variable in loop (checking 'txt' instead of 'ch' in 'for ch in txt')
   - Wrong comparison operators
   - Logic that works by accident but doesn't show understanding

**Tone & Feedback Style:**
- Be HONEST about correctness (don't say correct if it's wrong)
- Be ENCOURAGING in how you explain errors
- Use supportive language: "Almost there!", "Good try!", "You're on the right track!"
- Point out what they did RIGHT before explaining what needs fixing
- Give specific, actionable hints

**Example:**
Question: Count "a" in "banana"
Code: for ch in txt: if "a" in txt: count += 1
Output: 6, Expected: 3
Evaluation: INCORRECT - "Good effort on the loop structure! However, your code checks if 'a' exists in the entire string rather than checking each character. Try using 'if ch == \"a\"' to check the current character."

Respond with JSON only (no markdown):
{"correct": true/false, "feedback": "encouraging but honest explanation", "suggestion": "specific hint if wrong, or empty string if correct"}`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        console.log('=== Gemini Raw Response ===');
        console.log(responseText);

        // Extract JSON from response (handle markdown code blocks)
        let jsonText = responseText.trim();
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        } else if (jsonText.startsWith('```')) {
            jsonText = jsonText.replace(/```\n?/g, '').trim();
        }

        const evaluation = JSON.parse(jsonText);

        console.log('=== Parsed Evaluation ===');
        console.log(evaluation);

        return NextResponse.json(evaluation);
    } catch (error: any) {
        console.error('=== AI Evaluation Error ===');
        console.error('Error:', error.message);
        console.error('Stack:', error.stack);

        // Return a valid response instead of throwing error
        return NextResponse.json({
            correct: false,
            feedback: 'Unable to evaluate answer due to technical error. Your code may be correct - please ask for help.',
            suggestion: 'Try running your code to see if it works as expected.',
            _error: error.message
        });
    }
}
