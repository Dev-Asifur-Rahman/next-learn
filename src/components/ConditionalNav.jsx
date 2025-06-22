"use client";

import { usePathname } from "next/navigation";
import React from "react";
import NavBar from "./NavBar";

const ConditionalNav = () => {
  const pathname = usePathname();
  const hideNavBar = ["/auth/login", "/auth/register"];
  const shouldHideNavbar = hideNavBar.includes(pathname);
  return !shouldHideNavbar && <NavBar></NavBar>
};

export default ConditionalNav;
