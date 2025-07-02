import mongoDb, { collections } from "@/lib/mongoConnect";
import { ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req) {
  const token = await getToken({ req });
  const email = token.email;

  const students = await mongoDb(collections.student);
  const contents = await mongoDb(collections.contents);

  const student = await students.findOne({ email: email });

  if (!student) {
    return NextResponse.json({ success: false });
  }

  const courseId = (student.enrolledCourses || [])
    .filter((course) => course.complete === true)
    .map((course) => course.id);

  if (courseId.length === 0) {
    return NextResponse.json(
      { success: true, enrolledCourses: [] },
      { status: 200 }
    );
  }

  const objectIds = courseId.map((id) => new ObjectId(id));

  const enrolledContents = await contents
    .find({ _id: { $in: objectIds } })
    .toArray();

  return NextResponse.json(
    {
      success: true,
      enrolledCourses: enrolledContents,
    },
    { status: 200 }
  );
}