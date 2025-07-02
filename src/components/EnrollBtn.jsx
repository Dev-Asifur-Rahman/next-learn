"use client";

import useUserRole from "@/hooks/useUserRole";
import { Global_Context } from "@/providers/ContextProvider";
import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const EnrollBtn = ({ courseId, courseName }) => {
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
        try {
          const res = await axios.post(`/api/enroll?id=${courseId}`);
          if (res.data.message) {
            Swal.fire({
              title: "Enrolled!",
              text: `Congratulations! You Have Enrolled ${courseName}`,
              icon: "success",
            });
            window.location.reload()
          }
        } catch (error) {
          if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
          } else {
            toast.error("Something went wrong.");
          }
        }
      }
    });
  };

  return (
    <button
      disabled={role !== "student"}
      onClick={confirmEnroll}
      className="btn btn-dash w-28 mt-4 bg-white dark:bg-transparent border dark:border-white dark:text-white text-black"
    >
      Enroll
    </button>
  );
};

export default EnrollBtn;
