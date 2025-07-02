import Link from "next/link";

const error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6 text-center">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-4 py-2 border-2 dark:border-white dark:hover:bg-white dark:hover:text-black border-black rounded-md font-semibold hover:bg-black hover:text-white transition"
      >
        Go back home
      </Link>
    </div>
  );
};

export default error;
