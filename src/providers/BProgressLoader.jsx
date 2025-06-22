"use client";
import { AppProgressProvider as ProgressProvider } from '@bprogress/next';
const BProgressLoader = ({ children }) => {
  return (
    <ProgressProvider
      height="4px"
      color="#fffd00"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};

export default BProgressLoader;
