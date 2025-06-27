'use client'

import { useState } from "react";

const InstructorTab = () => {
    const [activeTab, setActiveTab] = useState("Analytics");
    
      const tabs = [
        "Analytics",
        "Courses",
        "Profile",
      ];
    
      const components = {
        Analytics: "<Analytics />", 
        Courses: "<Courses />",
        Profile: "<Profile />",
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

export default InstructorTab;