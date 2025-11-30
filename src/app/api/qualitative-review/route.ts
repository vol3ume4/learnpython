import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
    try {
        const { answers, chapterTitle } = await request.json();

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        // Build detailed context from all answers
        const answersContext = answers.map((ans: any, idx: number) => {
            return `
Question ${idx + 1}: ${ans.question}
Student's Code:
${ans.userCode || 'Not attempted'}

Student's Output:
${ans.userOutput || 'No output'}

Expected Output:
${ans.expectedOutput || 'N/A'}

Result: ${ans.correct ? 'Correct ✓' : (ans.skipped ? 'Skipped' : 'Incorrect ✗')}
---`;
        }).join('\n');

        const prompt = `You are an encouraging Python tutor reviewing a student's quiz on "${chapterTitle}".

${answersContext}

Write a SHORT, qualitative review (MAX 40 words / 50 tokens) that:

1. Identify 1-2 specific strengths in their code (syntax, functions used, patterns)
2. Note 1 growth area constructively
3. Be warm and encouraging

Focus on CODE observations. Example: "Strong use of print() and variables! Work on comparison operators (< vs >). You're writing valid Python - keep practicing!"

Keep it BRIEF and friendly.`;

        const result = await model.generateContent(prompt);
        const reviewText = result.response.text();

        return NextResponse.json({ review: reviewText });

    } catch (error: any) {
        console.error('Qualitative Review Error:', error);
        return NextResponse.json({ 
            error: error.message,
            review: "Unable to generate detailed review at this time. Great effort on completing the quiz! Keep practicing to strengthen your Python skills."
        }, { status: 500 });
    }
}

