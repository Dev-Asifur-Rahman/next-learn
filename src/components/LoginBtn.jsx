"use client";
import Link from "next/link";
import React from "react";


const LoginBtn = () => {
  return <Link href={'/auth/login'}><button className="btn">Sign in</button></Link>;
};

export default LoginBtn;
