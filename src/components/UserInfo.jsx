'use client'

import { useSession } from "next-auth/react";

const UserInfo = () => {
    const user = useSession()
    return (
        <div>
            {JSON.stringify(user)}
        </div>
    );
};

export default UserInfo;