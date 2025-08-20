import mongoDb, { collections } from "@/lib/mongoConnect";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// show analytics about students
export async function GET(req) {
  const token = await getToken({ req });
  const email = token.email;
  const students = await mongoDb(collections.student);
  const student = await students.findOne({ email: email });
  if (!student)
    return NextResponse.json({ success: false, message: "Student not Found" });
else{
    return NextResponse.json(student)
}
}
