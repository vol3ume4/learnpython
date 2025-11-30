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

Write a qualitative, personalized review (200-250 words) that:

1. **Find the GOOD in every attempt** - Even in incorrect answers, identify what they tried to do right. Did they use the right function? Good variable names? Correct syntax? Acknowledge partial understanding.

2. **Acknowledge specific strengths** - What concepts did they demonstrate well? Point to actual code patterns they used correctly across questions.

3. **Identify growth areas constructively** - What specific concepts need more practice? Be precise (e.g., "string indexing" not just "strings"). Frame it as "next steps" not "failures".

4. **Provide actionable next steps** - What specific exercises or concepts should they practice?

5. **Maintain genuine encouragement** - Be positive and constructive. Celebrate attempts and effort.

CRITICAL: Focus on CODE-LEVEL observations, not just correct/incorrect. Look at their actual code and find good things:
- "You used print() correctly in every attempt - that's solid!"
- "I see you understand variable assignment well, even when the logic needs work"
- "Your code runs without syntax errors - you're writing valid Python!"

Example review:
"Great effort on this quiz! I noticed you have a strong grasp of print statements - you used them correctly in all 10 questions. Your variable naming is clear and meaningful, which shows good programming practice. In questions 3, 5, and 8, you attempted the right approach but the logic needs fine-tuning. For example, in Q5, you correctly identified you need a comparison, you just mixed up > and <. That's close! For your next practice: focus on comparison operators and when to use each one. You're on the right track - keep coding!"

Write in a warm, friendly, conversational tone. Use "you" and "your". Be specific and genuine.`;

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

