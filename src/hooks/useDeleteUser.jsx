"use client";

import deleteUser from "@/actions/admin/deleteUser";
import { useRouter } from "next/navigation";

const useDeleteUser = () => {
  const router = useRouter();
  const DeleteUser = async (data) => {
    const { id, collection } = data;
    const result = await deleteUser(id, collection);
    if (result?.success === true) {
      return { success: true, message: result?.message };
    } else {
      return { success: false, message: result?.message };
    }
  };
  return { DeleteUser };
};

export default useDeleteUser;
