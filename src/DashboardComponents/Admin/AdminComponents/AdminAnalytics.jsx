// components/admin/Analytics.jsx

"use client";

const AdminAnalytics = () => {
  // Dummy data for admin analytics
  const totalUsers = 120;
  const students = 90;
  const instructors = 25;
  const admins = 5;
  const newUsersThisWeek = 7;
  const totalCourses = 35;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Total Users</h2>
        <p className="text-2xl">{totalUsers}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Students</h2>
        <p className="text-2xl">{students}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Instructors</h2>
        <p className="text-2xl">{instructors}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Admins</h2>
        <p className="text-2xl">{admins}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold">New Users This Week</h2>
        <p className="text-2xl">{newUsersThisWeek}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Total Courses</h2>
        <p className="text-2xl">{totalCourses}</p>
      </div>
    </div>
  );
};

export default AdminAnalytics;
