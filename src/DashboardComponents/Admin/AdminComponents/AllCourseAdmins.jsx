import axios from "axios";
import React, { useEffect, useState } from "react";
import { TfiTrash } from "react-icons/tfi";
import { RxCross1 } from "react-icons/rx";

const AllCoursesAdmin = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get(`/api/total-courses?data=${true}`);
      setCourses(res.data.courses);
    };
    fetchCourses();
  }, []);
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th className="text-center">CourseId</th>
            <th>Instructor</th>
            <th className="text-center">Enrolled</th>
            <th>
              <TfiTrash />
            </th>
          </tr>
        </thead>
        <tbody>
          {courses?.map((course, index) => {
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{course.title}</td>
                <td className="text-center">{course.courseId}</td>
                <td>{course.instructor.name}</td>
                <td className="text-center">{course.enrolledId.length}</td>
                <td>
                  <RxCross1 />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllCoursesAdmin;
