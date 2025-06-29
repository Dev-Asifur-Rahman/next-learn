// components/instructor/Analytics.jsx

"use client";

const InstructorAnalytics = () => {
  // Dummy data for instructor analytics
  const coursesCreated = 2;
  const totalStudents = 25;
  const averageCourseRating = 4.5; // optional

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Courses Created</h2>
        <p className="text-2xl">{coursesCreated}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Total Students</h2>
        <p className="text-2xl">{totalStudents}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Average Course Rating</h2>
        <p className="text-2xl">{averageCourseRating}</p>
      </div>
    </div>
  );
};

export default InstructorAnalytics;
