'use client'

import { signOut } from "next-auth/react";

const LogoutBtn = () => {
    return (
       <button onClick={()=>signOut()} className="btn">SignOut</button>
    );
};

export default LogoutBtn;