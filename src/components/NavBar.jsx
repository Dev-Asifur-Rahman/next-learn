"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import LoginBtn from "./LoginBtn";
import { Global_Context } from "@/providers/ContextProvider";
import { useSession } from "next-auth/react";
import LogoutBtn from "./LogoutBtn";

const NavBar = () => {
  const { theme, setTheme } = useContext(Global_Context);
  const [Dropdown, setDropdown] = useState(false);
  const session = useSession();

  const role = session?.data?.user?.role || "student";

  const routes = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Dashboard", href: `/dashboard/${role}` },
  ];

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
    <div className="navbar">
      <div className="navbar-start">
        <div
          className="dropdown"
          tabIndex={0}
          onClick={() => setDropdown(!Dropdown)}
        >
          <div className="  p-2 lg:hidden">
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
              {routes.map((route, index) => (
                <li key={index} onClick={() => setDropdown(false)}>
                  <Link href={route?.href}>{route?.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Link href={'/'}>
          <p className="text-3xl font-bold hidden md:inline lg:inline">
            NextLearn
          </p>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {routes.map((route, index) => (
            <li key={index}>
              <Link href={route?.href}>{route?.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="flex gap-2 items-center">
          {session?.status === "authenticated" ? (
            <LogoutBtn></LogoutBtn>
          ) : (
            <LoginBtn></LoginBtn>
          )}

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
    </div>
  );
};

export default NavBar;
