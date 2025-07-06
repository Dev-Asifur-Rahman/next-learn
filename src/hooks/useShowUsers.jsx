import axios from "axios";
import { useEffect, useState } from "react";

const useShowUsers = (role) => {
  const [userCount, setUserCount] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/admin/users?role=${role}`);
      setUserCount(res.data.count);
    };
    fetchUser();
  }, [role]);

  return userCount;
};

export default useShowUsers;
