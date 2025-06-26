"use client";

import AdminSideBar from "@/DashboardComponents/Admin/AdminSideBar";
import AdminTab from "@/DashboardComponents/Admin/AdminTab";
import AdminTabBar from "@/DashboardComponents/Admin/AdminTabBar";
import useScreenSize from "@/hooks/useScreenSize";

const AdminResponsiveDashboard = () => {
  const screenSize = useScreenSize();
  const components = {
    lg: <AdminSideBar />,
    md: <AdminTab />,
    sm: <AdminTabBar />
  };

  return components[screenSize]
};

export default AdminResponsiveDashboard;
