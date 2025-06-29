"use client";
import React, { useState } from "react";
import AdminAnalytics from "./AdminComponents/AdminAnalytics";
import Profile from "../Profile";

const AdminTab = () => {
  const [activeTab, setActiveTab] = useState("Analytics");

  const tabs = [
    "Analytics",
    "Courses",
    "Admin",
    "Instructor",
    "Students",
    "Profile",
  ];

  const components = {
    Analytics: <AdminAnalytics />,
    Admin: " <Admin />",
    Courses: "<Courses />",
    Instructor: "<Instructor />",
    Students: " <Students />",
    Profile: <Profile />,
  };

  return (
    <div className="flex flex-col">
      <div
        role="tablist"
        className="hidden md:flex lg:hidden tabs tabs-bordered justify-center p-4"
      >
        {tabs.map((tab, index) => (
          <a
            key={index}
            role="tab"
            onClick={() => setActiveTab(tab)}
            className={`tab ${activeTab === tab ? "tab-active font-bold" : ""}`}
          >
            {tab}
          </a>
        ))}
      </div>

     
      <div className="p-4">
        {components[activeTab]}
      </div>
    </div>
  );
};

export default AdminTab;
