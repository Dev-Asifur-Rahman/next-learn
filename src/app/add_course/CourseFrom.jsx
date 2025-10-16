"use client";
import { useState } from "react";
import { PiUploadBold } from "react-icons/pi";

const CourseFrom = () => {
  const [lessons, setLessons] = useState([]);
  const [lessonName, setLessonName] = useState(null);
  const [totalLessons, setTotalLessons] = useState(0);
  const handleLesson = (e) => {
    e.preventDefault();
    console.log(e.target);
  };
  const getLesson = (e) => {
    console.log(e.target.value);
  };
  return (
    <form
      onSubmit={handleLesson}
      action=""
      className="w-full flex justify-center"
    >
      <fieldset className="fieldset w-[90%] md:w-full lg:w-full border p-3 md:p-0 lg:p-0 grid grid-cols-1  justify-items-center gap-y-3">
        <div className="w-full max-w-[260px]">
          <label className="label">Select Course</label>
          <select
            onChange={getLesson}
            defaultValue="Select Your Course"
            className="select w-full"
          >
            <option disabled={true}>Select Your Course</option>
            <option value={"crimson"}>Crimson</option>
            <option value={"amber"}>Amber</option>
            <option value={"velvet"}>Velvet</option>
          </select>
        </div>
        <div className="w-full max-w-[260px]">
          <label>Enter Lesson</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Enter Lesson"
          />
        </div>
        <button className="btn w-full max-w-[260px]  bg-white dark:bg-transparent dark:text-white text-black border dark:border-white">
          <div className="flex items-center justify-center gap-2">
            <PiUploadBold /> <p>Add Course</p>
          </div>
        </button>
      </fieldset>
    </form>
  );
};

export default CourseFrom;
