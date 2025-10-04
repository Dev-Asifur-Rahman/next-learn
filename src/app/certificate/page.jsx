"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import QuizEnrolledCoursesCard from "@/DashboardComponents/Student/StudentComponents/QuizEnrolledCourseCard";
import axios from "axios";
import { useEffect, useState } from "react";

const page = () => {
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCompletedCourses = async () => {
      const res = await axios.get("/api/completed-user-enrolled");
      const data = res.data;
      setCompletedCourses(data?.enrolledCourses);
      setLoading(false);
    };
    fetchCompletedCourses();
  }, []);

  

  return (
    <section className="w-full">
      <h2 className="text-xl font-semibold mt-6 mb-4 ml-6">
        Completed Courses
      </h2>
      {loading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <section className="w-full">
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
        </section>
      )}
    </section>
  );
};

export default page;
