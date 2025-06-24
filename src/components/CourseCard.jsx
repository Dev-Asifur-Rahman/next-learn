import Link from "next/link";

const CourseCard = ({ course }) => {
  const { title, _id } = course;
  console.log(title);
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
            <Link href={`/courses/${_id}`}>
              <button className="btn w-full mt-4 bg-white dark:bg-transparent border dark:border-white  dark:text-white text-black ">
                Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseCard;
