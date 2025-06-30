"use client";

import useUserRole from "@/hooks/useUserRole";
import { Global_Context } from "@/providers/ContextProvider";
import axios from "axios";
import { useContext, useState } from "react";
import Swal from "sweetalert2";

const EnrollBtn = ({ courseId,courseName }) => {
  const { theme } = useContext(Global_Context);
  const role = useUserRole();

  const confirmEnroll = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Enroll!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.post(`/api/enroll?id=${courseId}`);
        if (res.data.message) {
          Swal.fire({
            title: "Enrolled!",
            text: `Congratulations! You Have Enrolled ${courseName}`,
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <button
      disabled={role !== "student"}
      onClick={confirmEnroll}
      className="btn btn-dash w-28 mt-4 bg-white dark:bg-transparent border dark:border-white  dark:text-white text-black "
    >
      Enroll
    </button>
  );
};

export default EnrollBtn;
