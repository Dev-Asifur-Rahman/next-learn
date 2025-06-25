// ✅ This should be at the top — and only once
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { lessons } = await request.json();

    if (!Array.isArray(lessons) || lessons.length === 0) {
      return NextResponse.json(
        { error: "Lessons array is required" },
        { status: 400 }
      );
    }

    const combinedText = lessons.map((lesson) => lesson.content).join(" ");
    const prompt = `Please generate exactly 5 distinct quiz questions numbered from 1 to 5 based on the following text.Text:${combinedText}Questions:1.`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          "HTTP-Referer": `${
            process.env.NEXTAUTH_URL || "http://localhost:3000"
          }`,
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

    const questions = generatedText
      .split("\n")
      .map((q) => q.trim())
      .filter((q) => q.length > 0 && /[?]/.test(q))
      .slice(0, 5);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Quiz generation error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
