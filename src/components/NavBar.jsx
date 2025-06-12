"use client";

import { Context } from "@/Context";
import { useContext, useEffect, useState } from "react";

const NavBar = () => {
  const {greet} = useContext(Context)
  //   const [theme, setTheme] = useState(() => {
  //     if (typeof window !== "undefined") {
  //       return localStorage.getItem("theme") || "light";
  //     }
  //     return "light";
  //   });
  const [theme, setTheme] = useState("light");
  const [isMounted, setIsMounted] = useState(false);

  console.log(greet)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setIsMounted(true);
  }, [theme,isMounted]);

  const theme_controller = (e) => {
    if (e.target.checked) {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  return (
    <div>
      <label className="toggle text-base-content">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={theme_controller}
          className=""
        />

        <svg
          aria-label="sun"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
          </g>
        </svg>

        <svg
          aria-label="moon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </g>
        </svg>
      </label>
    </div>
  );
};

export default NavBar;
