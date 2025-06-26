"use client";

import useScreenSize from "@/hooks/useScreenSize";
import StudentSideBar from "@/DashboardComponents/Student/StudentSideBar";
import StudentTabBar from "@/DashboardComponents/Student/StudentTabBar";
import StudentTab from "@/DashboardComponents/Student/StudentTab";


const StudentResponsiveDashboard = () => {
  const screenSize = useScreenSize();
  const components = {
    lg: <StudentSideBar />,
    md: <StudentTab />,
    sm: <StudentTabBar />
  };

  return components[screenSize]
};

export default StudentResponsiveDashboard;
