

"use client";

import { useEffect, useState } from "react";


const StudentAnalytics = () => {
  const [studentData,setStudentData] = useState(null)
  useEffect(()=>{
    const fetchAnalytics = async() =>{
      const response = await fetch('/api/student/analytics')
      const data = await response.json()
      setStudentData(data)
    }
    fetchAnalytics()
  },[])
  // Dummy data for student analytics
  const coursesEnrolled = 3;
  const coursesCompleted = 1;
  const averageQuizScore = 80;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Courses Enrolled {studentData?.coursesEnrolled}</h2>
        <p className="text-2xl">{coursesEnrolled}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Courses Completed</h2>
        <p className="text-2xl">{coursesCompleted}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Average Quiz Score</h2>
        <p className="text-2xl">{averageQuizScore}%</p>
      </div>
    </div>
  );
};

export default StudentAnalytics;
