
import EnrollBtn from "@/components/EnrollBtn";
import mongoDb, { collections } from "@/lib/mongoConnect";
import { ObjectId } from "mongodb";
import React from "react";

export async function generateMetadata({ params }) {
  const course_id = await params.details;
  const courses = await mongoDb(collections.courses);
  const course_details = await courses.findOne({
    _id: new ObjectId(course_id),
  });
  const course_name = course_details.title;
  return {
    title: course_name,
  };
}

const page = async ({ params }) => {
  const course_id = await params.details;
  const courses = await mongoDb(collections.courses);
  const course_details = await courses.findOne({
    _id: new ObjectId(course_id),
    
  });
  return (
    <section className="lg:h-[calc(100vh-64px)] lg:mt-0 mt-10 md:mt-16 w-full flex justify-center items-center">
      <div
        className={`
        max-w-4xl p-6 
      bg-white dark:bg-transparent
      rounded-lg 
      shadow-md dark:shadow-[0_4px_6px_-1px_rgba(255,255,255,0.3),0_2px_4px_-1px_rgba(255,255,255,0.06)]
      border border-gray-200 dark:border-white

      mx-4
      md:mx-auto md:w-3/4
      lg:w-2/3
      `}
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {course_details.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          {course_details.description}
        </p>

        <div className="border-t border-gray-200 dark:border-white pt-4 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Instructor
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
            <div className="w-24 h-24 border-2 rounded-full flex-shrink-0 mb-3 sm:mb-0">
              <img src={course_details.instructor.profileImage} alt="" className="h-full w-full rounded-full" />
            </div>
            {/* Placeholder for instructor image */}
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {course_details.instructor.name}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {course_details.instructor.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Enrolled count */}
        <p className="mb-4 text-gray-700 dark:text-gray-300 font-semibold">
          Enrolled Students: {course_details.enrolledId.length}
        </p>

        {/* Enroll Button */}
        <EnrollBtn courseId={course_details?._id} courseName={course_details?.title}></EnrollBtn>
      </div>
    </section>
  );
};

export default page;
