import mongoDb, { collections } from "@/lib/mongoConnect";
import React from "react";
import CourseCard from "./CourseCard";
import Pagination from "./Pagination";

const AllCourses = async ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const limit = 8;
  const skip = (page - 1) * limit;
  const data = await mongoDb(collections.courses)
    .find({})
    .skip(skip)
    .limit(limit)
    .toArray();

  const totalItems = await mongoDb(collections.courses).countDocuments();
  const totalPages = Math.ceil(totalItems / limit);
  return (
    <section className="w-full">
      <section className="grid xs:grid-cols-1 ms:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 mt-10">
        {data.map((course) => (
          <CourseCard course={course} key={course._id}></CourseCard>
        ))}
      </section>
      <Pagination currentPage={page} totalPages={totalPages}></Pagination>
    </section>
  );
};

export default AllCourses;
