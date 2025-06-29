"use server";

import mongoDb, { collections } from "@/lib/mongoConnect";
import bcrypt from "bcrypt";

const loginUser = async (user) => {
  const { email, password } = user;

  const students = mongoDb(collections.student);
  const admins = mongoDb(collections.admin);
  const instructors = mongoDb(collections.instructor);

  const [student, admin, instructor] = await Promise.all([
    students.findOne({ email: email }),
    admins.findOne({ email: email }),
    instructors.findOne({ email: email }),
  ]);
  const dbUser = student || admin || instructor;
  if (!dbUser) return null;
  const checkPassword = await bcrypt.compare(password, dbUser.password);
  if (!checkPassword) {
    return null;
  }
  return dbUser;
};

export default loginUser;
