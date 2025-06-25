import { NextResponse } from "next/server";

// Helper to clean question text: remove numbering and markdown
function cleanQuestion(q) {
  return q
    .replace(/^\d+\.\s*/, "")   // Remove leading numbering like "1. "
    .replace(/\*\*/g, "")       // Remove markdown bold **
    .trim();
}

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
    const combinedText = lessons.map((lesson) => lesson.content).join(" ");

    // More explicit prompt for exactly 5 questions numbered 1 to 5
    const prompt = `Please generate exactly 5 distinct quiz questions numbered from 1 to 5 based on the following text.Text:${combinedText}Questions:1.`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          "HTTP-Referer": `${process.env.NEXTAUTH_URL || "http://localhost:3000"}`,
          "X-Title": "NextLearn",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 2048,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText || "Model inference failed" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const generatedText = data.choices?.[0]?.message?.content || "";

    // Split by line, clean questions, keep lines that end with '?', take up to 5
    const questions = generatedText
      .split("\n")
      .map(cleanQuestion)
      .filter((q) => q.length > 0 && q.endsWith("?"))
      .slice(0, 5);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Quiz generation error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

