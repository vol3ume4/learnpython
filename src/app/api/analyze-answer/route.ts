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

        const prompt = `You are a Python programming tutor evaluating a student's code.

**Question:** ${question}

**Expected Output (Reference):** ${expectedOutput || 'Not specified - evaluate based on correctness of logic'}

**Student's Code:**
\`\`\`python
${code}
\`\`\`

**Student's Output:**
${output || 'No output produced'}

**Task:** Evaluate if the student's code correctly solves the problem. Consider:
1. Does the code logic match what the question asks?
2. Does it produce the correct type of output (even if values differ)?
3. Are there any syntax or logical errors?
4. For questions asking to "create variables and print", any valid values are acceptable.

**IMPORTANT:** Respond ONLY with valid JSON in this exact format (no markdown, no code blocks):
{"correct": true, "feedback": "Your explanation here", "suggestion": "Optional hint"}

Be lenient with variable values if the question doesn't specify exact values. Focus on correctness of the approach and logic.`;

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
