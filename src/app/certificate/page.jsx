"use client";

import QuizEnrolledCoursesCard from "@/DashboardComponents/Student/StudentComponents/QuizEnrolledCourseCard";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [completedCourses, setCompletedCourses] = useState([]);
  useEffect(() => {
    const fetchCompletedCourses = async () => {
      const res = await axios.get("/api/completed-user-enrolled");
      const data = res.data;
      setCompletedCourses(data?.enrolledCourses);
    };
    fetchCompletedCourses();
  }, []);

  const getCertificate = async () => {
    const loading = toast.loading("Waiting for Response");
    const response = await axios.post("/api/student/certificates");
    const data = response.data;
    if (data?.success) {
      toast.dismiss(loading);
      return toast.success("Congratulations! You will be Notified Soon");
    } else {
      toast.dismiss(loading);
      return toast.error("Something Went Wrong! Try Again");
    }
  };


  return (
    <section className="w-full">
      <h2 className="text-xl font-semibold mt-6 mb-4">Completed Courses</h2>
      {completedCourses.length === 0 ? (
        <p className="text-lg py-2 px-4 lg:border-2 md:border-2 border rounded-xl  font-normal ">
          No completed courses found.
        </p>
      ) : (
        <section className="grid xs:grid-cols-1 ms:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 mt-4">
          {completedCourses?.map((course) => (
            <QuizEnrolledCoursesCard
              course={course}
              key={course._id}
            ></QuizEnrolledCoursesCard>
          ))}
        </section>
      )}
      <section className="w-full flex items-center justify-center overflow-y-scroll">
        <button onClick={getCertificate}>Request For Certificate</button>
      </section>
    </section>
  );
};

export default page;
