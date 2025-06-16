"use client";

import { createContext, useState } from "react";

export const Global_Context = createContext(null);

const ContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const Object = {
    loading,
  };
  return (
    <Global_Context.Provider value={Object}>{children}</Global_Context.Provider>
  );
};

export default ContextProvider;
