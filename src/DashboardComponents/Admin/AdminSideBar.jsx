"use client";
import React, { useState } from "react";
import AdminAnalytics from "./AdminComponents/AdminAnalytics";
import Profile from "../Profile";
import AllStudents from "./AdminComponents/AllStudents";
import AllInstructors from "./AdminComponents/AllInstructors";
import AllCoursesAdmin from "./AdminComponents/AllCourseAdmins";
import AllAdmins from "./AdminComponents/AllAdmins";
import { icons } from "./../../../public/icons/react-icons";

const AdminSideBar = () => {
  const [activeTab, setActiveTab] = useState("Analytics");

  const tabs = [
    { name: "Analytics", icon: icons.analytics },
    { name: "Courses", icon: icons.course },
    { name: "Admin", icon: icons.admins },
    { name: "Instructor", icon: icons.instructors },
    { name: "Students", icon: icons.students },
    { name: "Profile", icon: icons.profile },
  ];

  const components = {
    Analytics: <AdminAnalytics />,
    Admin: <AllAdmins></AllAdmins>,
    Courses: <AllCoursesAdmin />,
    Instructor: <AllInstructors />,
    Students: <AllStudents />,
    Profile: <Profile />,
  };

  return (
    <div className="drawer lg:drawer-open">
      {/* Hidden checkbox to toggle drawer on small screens */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col">
        <div className="p-4 w-full">{components[activeTab]}</div>
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
              <div
                onClick={() => setActiveTab(tab?.name)}
                className={`${
                  activeTab === tab?.name
                    ? "dark:bg-white bg-black text-white dark:text-black font-bold rounded-sm"
                    : ""
                }`}
              >
                <div>{tab?.icon}</div>
                <a>{tab?.name}</a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminSideBar;
