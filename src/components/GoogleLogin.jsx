"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const GoogleLogin = () => {
  const router = useRouter();
  const session = useSession();
  const handle_google = async (e) => {
    await signIn("google", { redirect: false });
  };
  return (
    <button onClick={handle_google} className="btn btn-neutral">
      Google
    </button>
  );
};

export default GoogleLogin;
