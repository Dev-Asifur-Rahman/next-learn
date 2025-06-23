import React from 'react';

export const metadata ={
    title : "Summerize"
}


export default function SummerizerPage() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    setSummary("");

    const res = await fetch("/api/ai/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setSummary(data.summary || "No summary returned.");
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Text Summarizer</h2>

      <textarea
        className="w-full h-40 p-2 border rounded"
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleSummarize}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {summary && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <strong>Summary:</strong>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}c