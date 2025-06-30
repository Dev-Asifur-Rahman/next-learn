'use client'

import { useSession } from "next-auth/react";

const useUserRole = () => {
    const user = useSession()
    return user.data.user?.role
   
};

export default useUserRole;