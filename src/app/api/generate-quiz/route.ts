import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
    try {
        const { topic, chapterTitle, difficulty, chapterIndex } = await request.json();
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        let mixInstruction = "Mix: 3 Easy, 4 Medium, 3 Hard.";
        if (difficulty === 'easy') mixInstruction = "10 Easy questions.";
        if (difficulty === 'medium') mixInstruction = "10 Medium questions.";
        if (difficulty === 'hard') mixInstruction = "10 Hard questions.";

        // Define all chapters in order
        const allChapters = [
            "Variables",
            "Math Operators", 
            "Data Types",
            "Strings",
            "If Statements",
            "For Loops",
            "While Loops",
            "Functions Basics",
            "Functions Scope",
            "Lists Basics",
            "Lists Advanced"
        ];

        // Get only chapters covered so far (up to and including current chapter)
        const coveredChapters = allChapters.slice(0, (chapterIndex || 0) + 1);
        const coveredTopics = coveredChapters.join(", ");

        const prompt = `Generate 10 Python exercises for the topic "${topic}" (Chapter: ${chapterTitle}).
        
        CRITICAL CONSTRAINTS:
        
        1. Topics Covered So Far - The student has ONLY learned: ${coveredTopics}
           - If they haven't learned functions yet, DON'T create questions requiring function definitions
           - If they haven't learned loops yet, DON'T ask them to use for/while loops
           - If they haven't learned lists yet, DON'T use list operations
           - Only use concepts from the chapters listed above
        
        2. NO input() FUNCTION - This runs in browser, input() doesn't work!
           - NEVER ask students to use input()
           - Instead, use HARDCODED variables like: number = 5, name = "Alice", age = 25
           - Example WRONG: "Ask the user for their age using input()"
           - Example RIGHT: "Given age = 25, print whether they can vote"
        
        Requirements:
        1. ${mixInstruction}
        2. Format: JSON array of objects.
        3. Each object must have:
           - id: string (unique)
           - level: "easy" | "medium" | "hard"
           - question: string (clear task)
           - starterCode: string (initial code for student)
           - expectedOutput: string (exact output to check against)
           - hint: string (optional)
        
        Example object:
        {
            "id": "gen_1",
            "level": "easy",
            "question": "Print 'Hello'",
            "starterCode": "# print hello",
            "expectedOutput": "Hello",
            "hint": "Use print()"
        }

        Respond ONLY with the valid JSON array.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        let jsonText = responseText.trim();
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        } else if (jsonText.startsWith('```')) {
            jsonText = jsonText.replace(/```\n?/g, '').trim();
        }

        const exercises = JSON.parse(jsonText);
        return NextResponse.json({ exercises });

    } catch (error: any) {
        console.error('Quiz Gen Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
