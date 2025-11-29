import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
    try {
        const { code, question, output, expectedOutput } = await request.json();

        if (!code || !question) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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

**Respond in JSON format:**
{
  "correct": true/false,
  "feedback": "Brief explanation of why it's correct or what's wrong",
  "suggestion": "Optional hint if incorrect"
}

Be lenient with variable values if the question doesn't specify exact values. Focus on correctness of the approach and logic.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Extract JSON from response (handle markdown code blocks)
        let jsonText = responseText.trim();
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        } else if (jsonText.startsWith('```')) {
            jsonText = jsonText.replace(/```\n?/g, '').trim();
        }

        const evaluation = JSON.parse(jsonText);

        return NextResponse.json(evaluation);
    } catch (error: any) {
        console.error('Error in analyze-answer:', error);
        return NextResponse.json(
            {
                error: 'Failed to analyze answer',
                details: error.message
            },
            { status: 500 }
        );
    }
}
