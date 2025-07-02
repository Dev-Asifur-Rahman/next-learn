import axios from "axios";
import React, { useEffect, useState } from "react";
import EnrolledCoursesCard from "./EnrolledCoursesCard";

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get("/api/user-enrolled");
      setCourses(res.data.enrolledCourses);
      setLoading(false);
    };
    fetchCourses();
  }, []);
  if (loading) return <p>Loading...</p>;

  return (
    <section className="w-full border">
      <section className="grid border xs:grid-cols-1 ms:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 mt-10">
        {courses.map((course, index) => (
          <EnrolledCoursesCard
            course={course}
            key={index}
          ></EnrolledCoursesCard>
        ))}
      </section>
    </section>
  );
};

export default StudentCourses;
