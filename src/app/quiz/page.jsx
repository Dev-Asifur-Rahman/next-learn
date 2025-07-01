'use client';
import { useState } from "react";

export default function QuizGeneratorPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const lessons = [
  {
    title: "Lesson 1: Introduction to HTML",
    content: `HTML (HyperText Markup Language) is the foundational language used to create the structure of web pages. It consists of elements and tags that define headings, paragraphs, links, images, and other types of content. HTML documents are interpreted by web browsers to display the content to users. Understanding the basics of HTML is essential for building any website or web application.`
  },
  {
    title: "Lesson 2: Styling with CSS",
    content: `CSS (Cascading Style Sheets) is the language used to style and layout HTML elements on a web page. It allows developers to apply colors, fonts, spacing, and positioning to create visually appealing designs. CSS can be written inline, embedded within HTML, or in external stylesheets. Advanced CSS techniques include flexbox, grid, animations, and media queries for responsive design, ensuring websites look good on all devices.`
  },
  {
    title: "Lesson 3: Interactive Web Applications with JavaScript",
    content: `JavaScript is a powerful programming language that enables developers to create interactive and dynamic web experiences. It runs in the browser and can manipulate HTML and CSS to respond to user actions, validate forms, update content without refreshing the page, and communicate with servers asynchronously using APIs. JavaScript frameworks and libraries like React, Vue, and Angular have revolutionized frontend development by providing reusable components and efficient rendering.`
  }
];


  const generateQuiz = async () => {
    setLoading(true);
    setError("");
    setQuestions([]);
    try {
      const res = await fetch("/api/ai/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({lessons:lessons}),
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
        className="mt-4 bg-blue-600 p-2 text-white rounded"
      >
        {loading ? "Generating..." : "Generate Quiz"}
      </button>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {questions.length > 0 && (
        <div className="mt-6 space-y-3">
          <h2 className="text-xl font-semibold">Generated Questions:</h2>
          {questions.map((q, i) => (
            <div key={i} className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <p>{i + 1}. {q}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
