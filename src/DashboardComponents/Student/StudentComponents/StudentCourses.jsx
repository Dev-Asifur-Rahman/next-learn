import axios from "axios";
import React, { useEffect, useState } from "react";
import EnrolledCoursesCard from "./EnrolledCoursesCard";
import QuizEnrolledCourseCard from "./QuizEnrolledCourseCard";

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSecond, setLoadingSecond] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get("/api/user-enrolled");
      setCourses(res.data.enrolledCourses);
      setLoading(false);
    };

    const fetchCompletedCourses = async () => {
      const res = await axios.get("/api/completed-user-enrolled");
      setCompletedCourses(res.data.enrolledCourses);
      setLoadingSecond(false);
    };

    fetchCompletedCourses();
    fetchCourses();
  }, []);
  if (loading && loadingSecond) return <p>Loading...</p>;

  return (
    <section className="w-full">
      {/* In Progress Courses */}
      <h2 className="text-xl font-semibold mb-4">In Progress Courses</h2>
      {courses.length === 0 ? (
        <p>No in progress courses found.</p>
      ) : (
        <section className="grid xs:grid-cols-1 ms:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 mt-4">
          {courses.map((course) => (
            <EnrolledCoursesCard
              course={course}
              key={course._id}
            ></EnrolledCoursesCard>
          ))}
        </section>
      )}

      {/* Completed Courses */}
      <h2 className="text-xl font-semibold mt-10 mb-4">Completed Courses</h2>
      {completedCourses.length === 0 ? (
        <p>No completed courses found.</p>
      ) : (
        <section className="grid xs:grid-cols-1 ms:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 mt-4">
          {completedCourses.map((course) => (
            <QuizEnrolledCourseCard
              course={course}
              key={course._id}
            ></QuizEnrolledCourseCard>
          ))}
        </section>
      )}
    </section>
  );
};

export default StudentCourses;
