export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Only POST allowed");

  const { text } = req.body;
  if (!text || text.trim().length === 0)
    return res.status(400).json({ error: "Text is required" });

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error });
    }

    res.status(200).json({ summary: data[0]?.summary_text || "" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
