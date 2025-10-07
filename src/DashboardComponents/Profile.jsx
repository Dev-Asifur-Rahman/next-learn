"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const Profile = () => {
  const [loading,setLoading] = useState(true)
  const [user,setUser] = useState(null)

  useEffect(()=>{
    const fetchUser = async() =>{
      const res = await axios.get('/api/user')
      setUser(res.data)
      setLoading(false)
    }
    fetchUser()
  },[])

  if (loading) {
    return <div className="w-full flex justify-center"><LoadingSpinner></LoadingSpinner></div>;
  }

  if (!user) {
    return <div className="text-center py-10">No user data found.</div>;
  }
  return (
    <section className="max-w-3xl mx-auto px-4 py-6 md:py-10 lg:py-10" >
      <div className="rounded-lg shadow-lg dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] dark:shadow-white/45 p-6 flex flex-col sm:flex-row items-center gap-6">
        {/* Profile Image */}
        {user?.profileImage && (
          <div className="w-32 h-32 rounded-full overflow-hidden border-4">
            <Image
              src={user.profileImage}
              alt={user.name}
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
            {/* <img
              src={user?.profileImage}
              alt={user?.name}
              width={128}
              height={128}
              className="object-cover w-full h-full"
            /> */}
          </div>
        )}

        <div className="text-center sm:text-left space-y-2">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {user?.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            {user?.email}
          </p>
          <p className="text-sm font-medium text-violet-600 dark:text-violet-400 uppercase">
            {user?.role}
          </p>

          {/* Role-specific fields */}
          {user?.role === "student" && (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Location: {user?.location}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enrolled Courses: {user?.enrolledCourses?.length || 0}
              </p>
            </>
          )}

          {user?.role === "instructor" && (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Specialization: {user?.specialization}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Location: {user?.location}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Bio: {user?.bio}
              </p>
            </>
          )}

          {/* Joined At */}
          <p className="text-xs text-gray-400">
            Joined at: {new Date(user?.joinedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Profile;

