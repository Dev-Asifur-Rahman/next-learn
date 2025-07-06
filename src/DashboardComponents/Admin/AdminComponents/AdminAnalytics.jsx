"use client";

import useShowUsers from "@/hooks/useShowUsers";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminAnalytics = () => {
  const [countCourses, setCountCourses] = useState(0);

  const admin = useShowUsers("admin");
  const instructor = useShowUsers("instructor");
  const student = useShowUsers("student");

  useEffect(() => {
    const countCourses = async () => {
      const res = await axios.get("/api/total-courses");
      setCountCourses(res.data.count);
    };
    countCourses();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Students</h2>
        <p className="text-2xl">{student}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Instructors</h2>
        <p className="text-2xl">{instructor}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Admins</h2>
        <p className="text-2xl">{admin}</p>
      </div>
      <div className="bg-white lg:col-span-3 dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Total Courses</h2>
        <p className="text-2xl">{countCourses}</p>
      </div>
    </div>
  );
};

export default AdminAnalytics;
