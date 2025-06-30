import Link from "next/link";
import NormalButton from "./NormalButton";
import Image from "next/image";

const CourseCard = ({ course }) => {
  const { title, _id, courseImage } = course;
  console.log(courseImage);
  return (
    <section className="w-full flex justify-center">
      <div className="card w-48 bg-white dark:bg-gray-800 text-black dark:text-white shadow-md dark:shadow-lg">
        <figure className="px-6 pt-6">
          <div className="relative w-[144px] lg:w-full h-[85px] lg:h-[80px]">
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
            <Link href={`/courses/${_id}`}>
              <NormalButton name={"Details"}></NormalButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseCard;
