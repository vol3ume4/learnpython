import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { code, error, type, context } = await req.json();
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
        }
        else if (type === "hint") {
            prompt = `You are a friendly Python tutor.
      The student is working on: "${context.question}"
      
      Their current code:
      \`\`\`python
      ${code}
      \`\`\`
      
      Give a helpful, progressive hint. Point them in the right direction without writing the code for them. Keep it brief.`;
        }
        else if (type === "evaluate") {
            prompt = `You are a strict but fair code evaluator.
        Goal: "${context.question}"
        Student Code:
        \`\`\`python
        ${code}
        \`\`\`
        Output:
        "${context.output}"
        
        Did they solve the problem correctly using the requested method? 
        If yes, respond with {"pass": true, "message": "Great job!"}.
        If no, respond with {"pass": false, "message": "Specific feedback on what is missing"}.
        Return ONLY valid JSON.`;
        }

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Clean up JSON if needed for evaluate mode
        if (type === "evaluate") {
            const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
            return NextResponse.json(JSON.parse(cleanJson));
        }

        return NextResponse.json({ text: responseText });

    } catch (error) {
        console.error("AI Error:", error);
        return NextResponse.json({ error: "Failed to get AI help" }, { status: 500 });
    }
}
