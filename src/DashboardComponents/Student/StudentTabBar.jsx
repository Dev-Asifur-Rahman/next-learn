"use client";
import { useState } from "react";
import Profile from "../Profile";
import StudentAnalytics from "./StudentComponents/StudentAnalytics";
import StudentCourses from "./StudentComponents/StudentCourses";

const StudentTabBar = () => {
  const [activeTab, setActiveTab] = useState("analytics");

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Main Content Area */}
      <main className="p-4">
        {activeTab === "analytics" && (
          <StudentAnalytics></StudentAnalytics>
        )}
        {activeTab === "courses" && (
          <StudentCourses></StudentCourses>
        )}
        {activeTab === "profile" && (
          <Profile></Profile>
        )}
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 w-full bg-base-200 border-t border-base-300 flex justify-around items-center py-2 z-50 shadow-md">
        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex flex-col items-center text-sm ${
            activeTab === "dashboard"
              ? " font-bold"
              : "text-base-content"
          }`}
        >
          Analytics
        </button>

        <button
          onClick={() => setActiveTab("courses")}
          className={`flex flex-col items-center text-sm ${
            activeTab === "courses"
              ? " font-bold"
              : "text-base-content"
          }`}
        >
          Courses
        </button>


        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center text-sm ${
            activeTab === "profile"
              ? " font-bold"
              : "text-base-content"
          }`}
        >
          Profile
        </button>
      </nav>
    </div>
  );
};

export default StudentTabBar;
