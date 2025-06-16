"use client";

import { createContext, useEffect, useState } from "react";

export const Global_Context = createContext(null);

const ContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true); 
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    localStorage.setItem("theme", savedTheme);
    setLoading(false);
  }, []);

  useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}, [theme]);

  const Context_Value = {
    loading,
    setLoading,
    theme,
    setTheme,
  };

  return (
    <Global_Context.Provider value={Context_Value}>
      {!loading ? children : (
        <div className="flex justify-center items-center h-screen w-screen text-2xl">
          Loading...
        </div>
      )}
    </Global_Context.Provider>
  );
};

export default ContextProvider;
