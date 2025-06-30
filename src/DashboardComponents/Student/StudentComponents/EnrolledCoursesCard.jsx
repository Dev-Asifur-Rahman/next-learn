import NormalButton from "@/components/NormalButton";
import Link from "next/link";
import React from "react";

const EnrolledCoursesCard = ({ course }) => {
  const { title } = course;
  return (
    <section className="w-full flex justify-center">
      <div className="card w-48 bg-white dark:bg-gray-800 text-black dark:text-white shadow-md dark:shadow-lg">
        <figure className="px-6 pt-6">
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className=" text-base font-bold w-full truncate">{title}</h2>
          <div className=" w-full">
            <Link href={`/courses`}>
              <NormalButton name={"Continue"}></NormalButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnrolledCoursesCard;
