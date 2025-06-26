'use client'

import { useSession } from "next-auth/react";

const UserRole = () => {
    const user = useSession()
    return user.data.user?.role
   
};

export default UserRole;