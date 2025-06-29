"use client";
import React, { useState } from "react";
import AdminAnalytics from "./AdminComponents/AdminAnalytics";
import Profile from "../Profile";

const AdminSideBar = () => {
  const [activeTab, setActiveTab] = useState("Analytics");

  const tabs = ["Analytics", "Courses", "Admin", "Instructor", "Students", "Profile"];

  const components = {
    Analytics: <AdminAnalytics />,
    Admin: "<Admin />",
    Courses: "<Courses />",
    Instructor: "<Instructor />",
    Students: "<Students />",
    Profile: <Profile />,
  };

  return (
    <div className="drawer lg:drawer-open">
      {/* Hidden checkbox to toggle drawer on small screens */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col">
        <div className="p-4 border w-full">
          {components[activeTab]}
        </div>
      </div>

      {/* Sidebar drawer */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          className="drawer-overlay lg:hidden"
          aria-label="close sidebar"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {tabs.map((tab, index) => (
            <li key={index}>
              <a
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? "dark:bg-white bg-black text-white dark:text-black font-bold"
                    : ""
                }`}
              >
                {tab}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminSideBar;
