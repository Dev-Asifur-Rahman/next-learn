import React, { useState } from "react";
import AdminAnalytics from "./AdminComponents/AdminAnalytics";
import Profile from "../Profile";

const AdminTabBar = () => {
  const [activeTab, setActiveTab] = useState("analytics");
  const [dropdown, setDropdown] = useState(false);
  const all_roles = ["admins", "instructors", "students"];
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Main Content Area */}
      <main className="p-4">
        {activeTab === "analytics" && (
          <AdminAnalytics></AdminAnalytics>
        )}
        {activeTab === "courses" && (
          <p className="text-lg font-semibold"> Courses</p>
        )}
        {activeTab === "users" && (
          <p className="text-lg font-semibold">Users</p>
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
            activeTab === "analytics" ? " font-bold" : "text-base-content"
          }`}
        >
          Analytics
        </button>
        <div className="relative">
          <button
            onClick={() => {
              setActiveTab("users");
              setDropdown(!dropdown);
            }}
            className={`flex flex-col items-center bg-transparent shadow-none hover:bg-transparent  ${
              activeTab === "users" ? "font-bold" : "text-base-content"
            }`}
          >
            Users
          </button>
          {dropdown && (
            <ul className="absolute bottom-9 left-[-80%] menu bg-base-100 rounded-box z-[1] w-fit p-2 shadow-2xl">
              {all_roles.map((role, index) => {
                return (
                  <li onClick={()=>setDropdown(!dropdown)} key={index}>
                    <a>{role}</a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <button
          onClick={() => setActiveTab("courses")}
          className={`flex flex-col items-center text-sm ${
            activeTab === "courses" ? " font-bold" : "text-base-content"
          }`}
        >
          Courses
        </button>
        <button
          onClick={() => setActiveTab("profile")}
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
