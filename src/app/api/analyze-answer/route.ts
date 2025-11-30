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

        const prompt = `You are evaluating a beginner Python student's code.

**Question:** ${question}

**Student's Code:**
\`\`\`python
${code}
\`\`\`

**Student's Output:**
${output || 'No output'}

**Expected Output:**
${expectedOutput || 'Check if code logic is correct'}

**Evaluation Criteria:**
1. Does the actual output match the expected output? (Be lenient with whitespace/formatting)
2. If expected output is provided, compare it to actual output
3. If the code achieves the task goal, mark as correct even if code style varies
4. Only mark incorrect if output is clearly wrong or code doesn't work

**IMPORTANT:** Be GENEROUS. If the output matches what was asked for, mark it CORRECT.

Respond with JSON only (no markdown):
{"correct": true/false, "feedback": "brief explanation", "suggestion": "hint if wrong or empty string"}`;

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
