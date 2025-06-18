"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export const Global_Context = createContext(null);

const ContextProvider = ({ children }) => {
  const session = useSession()
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");
  console.log(session)
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
      {!loading && (session.status === 'authenticated'||session.status==='unauthenticated')? (
        <div>
          {children}
          <Toaster />
        </div>
      ) : (
        <LoadingSpinner></LoadingSpinner>
      )}
    </Global_Context.Provider>
  );
};

export default ContextProvider;
