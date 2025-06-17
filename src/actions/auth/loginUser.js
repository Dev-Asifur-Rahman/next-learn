"use server";

import mongoDb, { collections } from "@/lib/mongoConnect";
import bcrypt from 'bcrypt'

const loginUser = async (user) => {
  const { email, password } = user;
  const student_collection = mongoDb(collections.student);
  const student = await student_collection.findOne({ email: email });
  if(!student) return null
  const checkPassword = await bcrypt.compare(password,student.password)
  if(!checkPassword) return null
  return student
};

export default loginUser;
