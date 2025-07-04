"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const LessonViewer = ({ lessons, id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const currentLesson = lessons[currentIndex];
  useEffect(() => {
    if (currentIndex === lessons.length - 1) {
      axios.post("/api/user-enrolled", { id }).then((res) => {
        if (res.data.showToast === false) {
          setCompleted(true);
          return;
        } else {
          
          return;
        }
      });
    }
    setCompleted(false);
  },[currentIndex]);

  const nextLesson = () => {
    if (currentIndex < lessons.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSummary("");
    } else {
      if (!completed) {
        axios.post("/api/user-enrolled", { id }).then((res) => {
          Swal.fire({
            title: "Congratulations!",
            text: "You have completed all lessons.",
            icon: "success",
            confirmButtonText: "OK",
          });
          setCompleted(true);
        });
      }
    }
  };

  const prevLesson = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSummary("");
      
    }
  };

  const handleSummarize = async () => {
    if (!currentLesson.text.trim()) return;

    setSummary("");
    setLoading(true);

    try {
      const res = await axios.post("/api/ai/summarize", {
        text: currentLesson.text,
      });

      setSummary(res.data.summary || "No summary returned.");
    } catch (error) {
      setSummary("Error summarizing text.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl lg:mx-auto lg:mt-20 md:mt-15 mt-10 p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-950 mx-4 md:mx-auto rounded-lg shadow-xl dark:shadow-white/25">
      <h2 className="text-2xl sm:text-3xl text-center font-bold mb-4 text-gray-800 dark:text-gray-100">
        {currentLesson.title}
      </h2>

      <p className="text-gray-700 text-center dark:text-gray-300 text-base sm:text-lg leading-relaxed whitespace-pre-line">
        {summary ? summary : currentLesson.text}
      </p>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={prevLesson}
          disabled={currentIndex === 0}
          className="btn btn-outline hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-4 sm:px-6 py-2 rounded disabled:opacity-50  transition"
        >
          Previous
        </button>

        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Lesson {currentIndex + 1} of {lessons.length}
        </span>

        <button
          onClick={nextLesson}
          disabled={completed}
          className="btn btn-outline px-4 sm:px-6 py-2 rounded disabled:opacity-50 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
        >
          Next
        </button>
      </div>

      <button
        onClick={handleSummarize}
        disabled={loading}
        className="mt-4 w-full btn btn-dash px-4 py-2 rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>
    </div>
  );
};

export default LessonViewer;
