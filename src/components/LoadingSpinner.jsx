"use client";

import { RotatingLines } from "react-loader-spinner";
import { Global_Context } from "@/providers/ContextProvider";
import { useContext } from "react";

const LoadingSpinner = () => {
  const { theme } = useContext(Global_Context);
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <RotatingLines
        visible={true}
        height="30"
        width="30"
        color="red"
        strokeWidth="5"
        animationDuration="5"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
        strokeColor={theme === "light" ? "black" : "white"}
      />
    </div>
  );
};

export default LoadingSpinner;
