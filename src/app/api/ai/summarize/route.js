import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { text } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/Falconsai/medical_summarization",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("HuggingFace API error:", errorText);
      return NextResponse.json({ error: errorText || "Error from HuggingFace API" }, { status: response.status });
    }

    const data = await response.json();

    
    return NextResponse.json({
      summary: data[0]?.summary_text || JSON.stringify(data) || "No summary found.",
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
