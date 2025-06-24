"use client";
import Link from "next/link";
import React from "react";


const LoginBtn = () => {
  return <Link href={'/auth/login'}><button className="btn btn-dash bg-white dark:bg-transparent border dark:border-white  dark:text-white text-black ">Sign in</button></Link>;
};

export default LoginBtn;
