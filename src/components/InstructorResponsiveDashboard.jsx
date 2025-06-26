"use client";
import InstructorSideBar from "@/DashboardComponents/Instructor/InstructorSideBar";
import InstructorTabBar from "@/DashboardComponents/Instructor/InstructorTabBar";
import InstructorTab from "@/DashboardComponents/Instructor/InstructorTab";

import useScreenSize from "@/hooks/useScreenSize";


const InstructorResponsiveDashboard = () => {
  const screenSize = useScreenSize();
  const components = {
    lg: <InstructorSideBar />,
    md: <InstructorTab />,
    sm: <InstructorTabBar />
  };

  return components[screenSize] 
};
export default InstructorResponsiveDashboard;
