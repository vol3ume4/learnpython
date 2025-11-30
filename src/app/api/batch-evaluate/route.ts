import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function POST(request: Request) {
    try {
        const { answers } = await request.json();

        if (!answers || !Array.isArray(answers)) {
            return Response.json({ error: 'Invalid request format' }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        // Create a batch prompt for all answers
        const batchPrompt = `You are evaluating ${answers.length} Python exercises for a BEGINNER student.

${answers.map((answer, index) => `
**Question ${index + 1}:**
${answer.question}

**Expected Output:**
${answer.expectedOutput}

**Student's Code:**
\`\`\`python
${answer.userCode || 'No code provided'}
\`\`\`

**Student's Output:**
${answer.userOutput || 'No output'}
`).join('\n---\n')}

**Evaluation Criteria:**
- Mark CORRECT if the student's output matches the expected output (be lenient with whitespace)
- Mark CORRECT if the code achieves the task goal, even if code style varies
- Only mark INCORRECT if output is clearly wrong or missing
- Be GENEROUS to beginners

For each question, respond with:
- correct: boolean (true if output matches expected)
- feedback: string (brief, encouraging explanation)
- suggestion: string (hint if incorrect, or empty string if correct)

Return ONLY a valid JSON array with ${answers.length} objects in order (no markdown, no extra text):
[
  {"correct": true, "feedback": "Perfect!", "suggestion": ""},
  {"correct": false, "feedback": "Close but...", "suggestion": "Try..."},
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
