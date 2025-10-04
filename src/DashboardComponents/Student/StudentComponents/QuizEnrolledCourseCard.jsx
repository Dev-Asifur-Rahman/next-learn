import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const QuizEnrolledCoursesCard = ({ course }) => {
  const { title, courseImage, _id } = course;
  const pathname = usePathname();

  const getCertificate = async () => {
    toast.success("Congratulations! You will be notified Soon");

    try {
      const response = await axios.post("/api/student/certificates", {
        name: "Asifur Rahman",
        courseName: "Html Course",
        date: "29-09-2025",
      });
    } catch (error) {
      toast.error("Something Went Wrong! Try Again");
    }
  };
  return (
    <section className="w-full flex justify-center">
      <div className="card w-48 dark:border-4 dark:border-white text-black dark:text-white rounded-2xl dark:shadow-white/15 dark:hover:shadow-white/35 hover:scale-105 shadow-xl transition-transform duration-300">
        <figure className="px-6 pt-6">
          <div className="relative w-[144px] lg:w-full h-[85px] lg:h-[70px]">
            <Image
              src={courseImage}
              alt="Shoes"
              className="rounded-xl object-cover"
              fill
              sizes="(min-width: 1024px) 120px, 144px"
            />
          </div>
        </figure>
        <div className="card-body items-center text-center">
          <h2 className=" text-base font-bold w-full truncate">{title}</h2>
          <div className=" w-full">
            {pathname === "/certificate" ? (
              <button className="btn btn-sm w-full mt-4 bg-white dark:bg-transparent border dark:border-white  dark:text-white text-black " onClick={getCertificate}>
                Certificate
              </button>
            ) : (
              <Link href={`/quiz/${_id}`}>
                <button className="btn btn-sm w-full mt-4 bg-white dark:bg-transparent border dark:border-white  dark:text-white text-black ">
                  Generate Quiz
                </button>
              </Link>
            )}
          </div>
          <div className=" w-full">
            <Link href={`/class/${_id}`}>
              <button className="btn btn-sm w-full mt-1 bg-white dark:bg-transparent border dark:border-white  dark:text-white text-black ">
                Continue
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizEnrolledCoursesCard;
