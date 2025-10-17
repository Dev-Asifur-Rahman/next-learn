"use server";

import mongoDb, { collections } from "@/lib/mongoConnect";
import { ObjectId } from "mongodb";

export const addCourse = async (instructor_object) => {
  const { title, courseId, description, courseImage, instructor_id } =
    instructor_object;

  const instructorCollection = await mongoDb(collections.instructor);

  const instructor = await instructorCollection.findOne({
    _id: new ObjectId(instructor_id),
  });

  if (!instructor) {
    return { success: false, message: "instructor not found" };
  } else {
    const courses = await mongoDb(collections.courses);
    const course_object = {
      courseId,
      title,
      description,
      instructor: {
        userId: instructor.userId,
        name: instructor.name,
        bio: instructor.bio,
        profileImage: instructor.profileImage,
      },
      enrolledId: [],
      courseImage,
    };
    console.log(course_object);
    return { success: true, message: "course added" };
  }
};
