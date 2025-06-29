"use client";

import Image from "next/image";

const Profile = () => {
  const user = {
    // Change role to test student, instructor, or admin
    role: "student",
    userId: "s001",
    name: "Sadia Noor",
    email: "sadia.noor@studentmail.com",
    profileImage: "https://i.ibb.co/xJ6ktCx/student.png",
    location: "Chittagong, Bangladesh",
    joinedAt: "2025-06-10T15:30:00+06:00",
    enrolledCourses: [],
  };

  // Uncomment to test instructor data
  /*
  const user = {
    role: "instructor",
    userId: "i006",
    name: "Farhana Sultana",
    email: "farhana.sultana@nextlearn.com",
    profileImage: "https://i.ibb.co/TqLc1RN3/1711954655184-1.jpg",
    location: "Dhaka, Bangladesh",
    joinedAt: "2025-06-01T20:10:00+06:00",
    bio: "Specializes in Python and AI, working as a data scientist in Dhaka.",
    specialization: "Python, AI, Data Science",
  };
  */

  // Uncomment to test admin data
  /*
  const user = {
    role: "admin",
    userId: "a001",
    name: "Asifur Rahman",
    email: "asifurrahman.ac@gmail.com",
    joinedAt: "2025-06-01T16:00:00+06:00",
  };
  */

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <div className=" rounded-lg shadow-md p-6 flex flex-col sm:flex-row items-center gap-6">
        {/* Profile Image */}
        {user.profileImage && (
          <div className="w-32 h-32 rounded-full overflow-hidden   border-4">
            {/* <Image
              src={user.profileImage}
              alt={user.name}
              width={128}
              height={128}
              className="object-cover w-full h-full"
            /> */}
            <img
              src={user.profileImage}
              alt={user.name}
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        {/* Profile Details */}
        <div className="text-center sm:text-left space-y-2">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {user.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            {user.email}
          </p>
          <p className="text-sm font-medium text-violet-600 dark:text-violet-400 uppercase">
            {user.role}
          </p>

          {/* Role-specific fields */}
          {user.role === "student" && (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Location: {user.location}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enrolled Courses: {user.enrolledCourses.length}
              </p>
            </>
          )}

          {user.role === "instructor" && (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Specialization: {user.specialization}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Location: {user.location}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Bio: {user.bio}
              </p>
            </>
          )}

          {user.role === "admin" && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Admin joined at: {new Date(user.joinedAt).toLocaleDateString()}
            </p>
          )}

          {/* Joined At */}
          <p className="text-xs text-gray-400">
            Joined at: {new Date(user.joinedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
