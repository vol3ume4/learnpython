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

Write a qualitative, personalized review (150-200 words) that:

1. **Acknowledges specific strengths** - What concepts did they demonstrate well? Point to actual code patterns they used correctly.

2. **Identifies growth areas** - What specific concepts need more practice? Be precise (e.g., "string indexing" not just "strings").

3. **Provides actionable next steps** - What should they practice next? Be specific.

4. **Maintains encouragement** - Be positive and constructive, never discouraging.

Focus on CODE-LEVEL observations, not just scores. Example: "I noticed you consistently used proper variable naming and print statements correctly, but struggled with type conversion - let's practice more int() and str() exercises."

Write in a warm, friendly, conversational tone as if speaking directly to the student. Use "you" and "your".`;

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

