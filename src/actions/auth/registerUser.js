"use server";
import mongoDb, { collections } from "@/lib/mongoConnect";
import bcrypt from 'bcrypt'

const registerUser = async (user) => {
  const student_collection = mongoDb(collections.student);
  const { name, email, profileImage, location,enrolledCourses,password } = user;
  const students = await student_collection.find({}).toArray();
  const find_student = await student_collection.findOne({ email: email });
  if (!find_student) {
    const hashedPassword = bcrypt.hash(password,10)
    const student_data = {
      userId: `s${String(students.length + 1).padStart(3, "0")}`,
      name,
      email,
      role: "student",
      profileImage,
      location,
      password:hashedPassword,
      joinedAt: "2025-06-10T15:30:00+06:00",
      enrolledCourses
    };
    const result = await student_collection.insertOne(student_data)
    return {success:true};
  }
  else{
    return {success:false}
  }

  
};

export default registerUser;
