"use client";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";
import { useContext } from "react";
import { Global_Context } from "./ContextProvider";

const BProgressLoader = ({ children }) => {
  const { theme } = useContext(Global_Context);

  return (
    <ProgressProvider
      height="4px"
      color={theme === "light" ? "#000000" :"#FFFFFF" }
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};

export default BProgressLoader;
