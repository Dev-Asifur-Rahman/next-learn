"use client";

import QuizEnrolledCoursesCard from "@/DashboardComponents/Student/StudentComponents/QuizEnrolledCourseCard";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import certificate from '```````````/images/newsletter.png'

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

    try {
      const response = await axios.post(
        "/api/student/certificates",
        {
          name:'Asifur Rahman', courseName:'Html Course', date: '29-09-2025'
        },
        {
          responseType: "blob",
        }
      );

      // Create a URL for the blob
      const imageBlob = response.data;
      const url = URL.createObjectURL(imageBlob);

      console.log(url);
      window.open(url);

      // Preview image
      const img = document.createElement("img");
      img.src = url;
      const image_div = document.getElementById("certificate");
      image_div.innerHTML = "";
      image_div.appendChild(img);

      toast.dismiss(loading);
      toast.success("Certificate Generated! Preview Below.");
    } catch (error) {
      console.error(error);
      toast.dismiss(loading);
      toast.error("Something Went Wrong! Try Again");
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
      <div id="certificate" className="w-full border"></div>
    </section>
  );
};

export default page;
