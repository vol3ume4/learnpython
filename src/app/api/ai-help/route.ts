import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function POST(req: Request) {
    try {
        // Log for debugging
        console.log("API Key present:", !!apiKey);

        if (!apiKey) {
            return NextResponse.json({ error: "API key not configured" }, { status: 500 });
        }

        const { code, error, type, context } = await req.json();
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        let prompt = "";

        if (type === "explain_error") {
            prompt = `You are a friendly Python tutor for beginners. 
The student's code is:
\`\`\`python
${code}
\`\`\`

They encountered this error:
"${error}"

Explain what went wrong in 1-2 simple sentences. Do not give the full solution code, just explain the concept they missed.`;
        } else if (type === "hint") {
            prompt = `You are a friendly Python tutor.
The student is working on: "${context.question}"

Their current code:
\`\`\`python
${code}
\`\`\`

Give a helpful, progressive hint. Point them in the right direction without writing the code for them. Keep it brief.`;
        }

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        return NextResponse.json({ text: responseText });

    } catch (error) {
        console.error("AI Error:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        return NextResponse.json({
            error: "Failed to get AI help",
            details: errorMessage
        }, { status: 500 });
    }
}
