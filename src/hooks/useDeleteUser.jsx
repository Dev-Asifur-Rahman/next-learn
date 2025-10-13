"use client";

import deleteUser from "@/actions/admin/deleteUser";
import { useRouter } from "next/navigation";

const useDeleteUser = () => {
  const router = useRouter();
  const DeleteUser = async (data) => {
    const { id, collection } = data;
    console.log(await deleteUser(id, collection));
    return { success: true };
  };
  return { DeleteUser };
};

export default useDeleteUser;
