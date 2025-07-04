"use client";

import Lottie from "lottie-react";
import React from "react";

const LottieComponent = ({ animation }) => {
  return (
    <div className="w-[200px] lg:w-[200px] md:w-[200px] mx-auto">
      <Lottie animationData={animation}></Lottie>
    </div>
  );
};

export default LottieComponent;
