import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
    try {
        const { answers } = await request.json();

        if (!answers || !Array.isArray(answers)) {
            return Response.json({ error: 'Invalid request format' }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Create a batch prompt for all answers
        const batchPrompt = `You are evaluating ${answers.length} Python programming exercises. For each exercise, determine if the student's answer is correct.

${answers.map((answer, index) => `
**Question ${index + 1}:**
${answer.question}

**Expected Output:**
${answer.expectedOutput}

**Student's Code:**
\`\`\`python
${answer.userCode}
\`\`\`

**Student's Output:**
${answer.userOutput}
`).join('\n---\n')}

For each question, provide a JSON object with:
- correct: boolean (true if answer is correct)
- feedback: string (brief explanation)
- suggestion: string (optional hint if incorrect)

Return ONLY a JSON array with ${answers.length} objects, one for each question in order. Format:
[
  { "correct": true/false, "feedback": "...", "suggestion": "..." },
  ...
]`;

        const result = await model.generateContent(batchPrompt);
        const response = result.response;
        const text = response.text();

        // Extract JSON from response
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (!jsonMatch) {
            throw new Error('Could not parse AI response');
        }

        const results = JSON.parse(jsonMatch[0]);

        return Response.json({ results });
    } catch (error) {
        console.error('Batch evaluation error:', error);
        return Response.json({
            error: 'Evaluation failed',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
