import { NextResponse } from "next/server";
import mongoDb, { collections } from "@/lib/mongoConnect";
import { getToken } from "next-auth/jwt";

// get the use based on role
export async function GET(req) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = token.email;
  
  const students = await mongoDb(collections.student);
  const instructors = await mongoDb(collections.instructor);
  const admins = await mongoDb(collections.admin);

  
  const [student, instructor, admin] = await Promise.all([
    students.findOne({ email }),
    instructors.findOne({ email }),
    admins.findOne({ email }),
  ]);

  let user = student || instructor || admin;
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
