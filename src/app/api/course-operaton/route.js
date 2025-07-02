import mongoDb, { collections } from "@/lib/mongoConnect";
import { getToken } from "next-auth/jwt";

const { NextResponse } = require("next/server");

export async function POST(req) {
  const students = await mongoDb(collections.student);
  const token = await getToken({ req });
  const email = token.email;

  const find_student = await students.findOne({ email: email });
  const courses = find_student.enrolledCourses || [];
  
  return NextResponse.json({ success: true, courses });
}
