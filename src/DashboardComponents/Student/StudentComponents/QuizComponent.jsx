"use client";

import { useState } from "react";

const QuizComponent = ({ lesson }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateQuiz = async () => {
    setLoading(true);
    setError("");
    setQuestions([]);
    try {
      const res = await fetch("/api/ai/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessons: lesson }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setQuestions(data.questions || []);
    } catch {
      setError("Failed to generate questions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Quiz Generator</h1>

      <button
        onClick={generateQuiz}
        disabled={loading}
        className="btn mt-4 bg-white dark:bg-transparent border dark:border-white  dark:text-white text-black "
      >
        {loading ? "Generating..." : "Generate Quiz"}
      </button>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {questions.length > 0 && (
        <div className="mt-6 space-y-3">
          <h2 className="text-xl font-semibold">Generated Questions:</h2>
          {questions.map((q, i) => (
            <div key={i} className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <p>
                {i + 1}. {q}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
