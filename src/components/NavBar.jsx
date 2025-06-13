"use client";

import { Context } from "@/Context";
import { useContext, useEffect, useState } from "react";

const NavBar = () => {
  const { greet } = useContext(Context);
  //   const [theme, setTheme] = useState(() => {
  //     if (typeof window !== "undefined") {
  //       return localStorage.getItem("theme") || "light";
  //     }
  //     return "light";
  //   });
  const [theme, setTheme] = useState("light");
  const [isMounted, setIsMounted] = useState(false);
  const [Dropdown, setDropdown] = useState(false);

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
  }, [theme, isMounted]);

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
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div
          className="dropdown"
          tabIndex={0}
          onClick={() => setDropdown(!Dropdown)}
        >
          <div className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          {Dropdown && (
            <ul
              tabIndex={0}
              className="menu menu-sm bg-base-100 dropdown-content rounded-box z-1 mt-3 w-40 p-2 shadow"
            >
              {/* 2. Added onClick to each <li> to close the dropdown */}
              <li onClick={() => setDropdown(false)}>
                <a>Item 1</a>
              </li>
              <li onClick={() => setDropdown(false)}>
                <a>Item 2</a>
              </li>
              <li onClick={() => setDropdown(false)}>
                <a>Item 3</a>
              </li>
            </ul>
          )}
        </div>
        <p className="text-3xl font-bold hidden md:inline lg:inline">DaisyUI</p>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn">SignIn</button>
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
    </div>
  );
};

export default NavBar;
