"use client";
import React, { useState } from "react";
import AdminAnalytics from "./AdminComponents/AdminAnalytics";
import Profile from "../Profile";
import AllCoursesAdmin from "./AdminComponents/AllCourseAdmins";
import AllAdmins from "./AdminComponents/AllAdmins";
import AllStudents from "./AdminComponents/AllStudents";
import AllInstructors from "./AdminComponents/AllInstructors";

const AdminTabBar = () => {
  const [activeTab, setActiveTab] = useState("analytics");
  const [dropdown, setDropdown] = useState(false);
  const all_roles = ["admin", "instructor", "student"];

  const userFunction = () => {
    if (
      activeTab !== "users-admin" &&
      activeTab !== "users-instructor" &&
      activeTab !== "users-student"
    ) {
      setActiveTab("users-admin");
      return;
    } else {
      setDropdown(!dropdown)
      return
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Main Content Area */}
      <main className="p-4 mb-[40px]">
        {activeTab === "analytics" && <AdminAnalytics></AdminAnalytics>}
        {activeTab === "courses" && <AllCoursesAdmin></AllCoursesAdmin>}
        {activeTab === "users-admin" && <AllAdmins></AllAdmins>}
        {activeTab === "users-student" && <AllStudents></AllStudents>}
        {activeTab === "users-instructor" && <AllInstructors></AllInstructors>}
        {activeTab === "profile" && <Profile></Profile>}
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 w-full bg-base-200 border-t border-base-300 h-[40px] flex justify-around items-center py-2 z-50 shadow-md">
        <button
          onClick={() => {
            setDropdown(false);
            setActiveTab("analytics");
          }}
          className={`flex flex-col items-center text-sm ${
            activeTab === "analytics" ? " font-bold" : "text-base-content"
          }`}
        >
          Analytics
        </button>
        <div className="relative">
          <button
            onClick={userFunction}
            className={`flex flex-col items-center bg-transparent shadow-none hover:bg-transparent  ${
              activeTab === "users-admin" ||
              activeTab === "users-student" ||
              activeTab === "users-instructor"
                ? "font-bold"
                : "text-base-content"
            }`}
          >
            Users
          </button>
          {dropdown && (
            <ul className="absolute bottom-9 left-[-80%] menu bg-base-100 rounded-box z-[1] w-fit p-2 shadow-2xl">
              {all_roles.map((role, index) => {
                return (
                  <li
                    onClick={() => {
                      setActiveTab(`users-${role}`);
                      setDropdown(!dropdown);
                    }}
                    key={index}
                  >
                    <a>{role}</a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <button
          onClick={() => {
            setDropdown(false);
            setActiveTab("courses");
          }}
          className={`flex flex-col items-center text-sm ${
            activeTab === "courses" ? " font-bold" : "text-base-content"
          }`}
        >
          Courses
        </button>
        <button
          onClick={() => {
            setActiveTab("profile");
            setDropdown(false);
          }}
          className={`flex flex-col items-center text-sm ${
            activeTab === "profile" ? " font-bold" : "text-base-content"
          }`}
        >
          Profile
        </button>
      </nav>
    </div>
  );
};

export default AdminTabBar;
