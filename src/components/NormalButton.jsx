import React from "react";

const NormalButton = ({name}) => {
  return (
    <button className="btn w-full mt-4 bg-white dark:bg-transparent border dark:border-white  dark:text-white text-black ">
      {name}
    </button>
  );
};

export default NormalButton;
