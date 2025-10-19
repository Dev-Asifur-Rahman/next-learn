"use server";

import mongoDb, { collections } from "@/lib/mongoConnect";
import { ObjectId } from "mongodb";

export const allInstructorCourses = async (courseId) => {
  const instructors = await mongoDb(collections.instructor);
  const courses = await mongoDb(collections.courses);

  const instructor = await instructors.findOne({ _id: new ObjectId(courseId) });
  const userId = instructor?.userId;

  const instructorCourses = await courses
    .find(
      { "instructor.userId": userId },
      {
        projection: {
            _id: 0,
          courseId: 1,
          title: 1,
          "instructor.userId": 1,
        },
      }
    )
    .toArray();

  return instructorCourses;
};
