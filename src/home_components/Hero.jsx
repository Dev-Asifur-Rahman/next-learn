import Image from "next/image";
import Link from "next/link";
// import banner from "/public/images/next-learn-banner-two.png"

const Hero = () => {
  return (
    <section className=" text-black">
      <div className="container mx-auto px-4 lg:py-15 md:py-15 py-10 flex flex-col md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <span className="inline-block bg-black dark:text-black text-white dark:bg-white   font-semibold px-3 py-1 rounded-full text-sm">
            🌟 New AI Learning Platform
          </span>
          <h1 className="text-4xl md:text-5xl text-black dark:text-white font-bold">
            Learn Smarter with NextLearn
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-white">
            Access AI-generated quizzes, smart study planners, and personalized
            dashboards for students, instructors, and admins.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Link href={"/auth/login"}>
              <button className="bg-black dark:bg-transparent dark:border text-white w-[180px] py-3 rounded-full font-semibold dark:hover:text-black dark:hover:bg-white transition">
                Get Started
              </button>
            </Link>
            <Link href={'/courses'}>
              <button className="border dark:border-white w-[180px] py-3 rounded-full font-semibold hover:bg-black dark:hover:bg-white dark:hover:text-black dark:text-white hover:text-white transition">
                Browse Courses
              </button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[400px] mt-10 md:mt-0">
          <Image
            src='/images/next-learn-banner-two.png'
            alt="Hero Illustration"
            fill
            className="object-cover rounded-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
