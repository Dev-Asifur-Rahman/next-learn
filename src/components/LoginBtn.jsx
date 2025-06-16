"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const LoginBtn = () => {
  return <button className="btn" onClick={() => signIn()}>Sign in</button>;
};

export default LoginBtn;
