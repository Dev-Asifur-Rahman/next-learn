import { NextResponse } from "next/server";
import OpenAi from "openai";

// Helper to clean question text: remove numbering and markdown
function cleanQuestion(q) {
  return q
    .replace(/^\d+\.\s*/, "") // Remove leading numbering like "1. "
    .replace(/\*\*/g, "") // Remove markdown bold **
    .trim();
}

const a4fBaseUrl = "https://api.a4f.co/v1";

const a4fClient = new OpenAi({
  apiKey: process.env.A4F_API_KEY,
  baseURL: a4fBaseUrl,
});

export async function POST(request) {
  try {
    const { lessons } = await request.json();
    if (!Array.isArray(lessons) || lessons.length === 0) {
      return NextResponse.json(
        { error: "Lessons array is required" },
        { status: 400 }
      );
    }

    // Combine lesson contents into one text
    const combinedText = lessons.map((lesson) => lesson.text).join(" ");

    const prompt = `
Please generate exactly 5 distinct quiz questions numbered from 1 to 5 
based on the following text.

Text:
${combinedText}

Questions:
1.
`;

    const response = await a4fClient.chat.completions.create({
      model: process.env.A4F_AI_MODEL_NAME,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      //  [
      //   { role: "system", content: "You are a helpful assistant." },
      //   { role: "user", content: "Explain the concept of API gateways." },
      // ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const generatedText = response?.choices[0].message.content || "";

    // Split by line, clean questions, keep lines that end with '?', take up to 5
    const questions = generatedText
      .split("\n")
      .map(cleanQuestion)
      .filter((q) => q.length > 0 && q.endsWith("?"))
      .slice(0, 5);

    return NextResponse.json({ questions });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
