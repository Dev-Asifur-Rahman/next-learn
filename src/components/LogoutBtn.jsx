'use client'

import { signOut } from "next-auth/react";

const LogoutBtn = () => {
    return (
       <button onClick={()=>signOut()} className="btn btn-dash bg-white dark:bg-transparent border dark:border-white  dark:text-white text-black ">SignOut</button>
    );
};

export default LogoutBtn;