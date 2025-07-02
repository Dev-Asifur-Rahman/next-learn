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

  const courseId = student.enrolledCourses || [];

  if (courseId.length === 0) {
    return NextResponse.json(
      { success: true, enrolledCourses: [] },
      { status: 200 }
    );
  }

  const objectIds = courseId.map((course) => new ObjectId(course.id));

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

export async function POST(req) {
  const data = await req.json();
  const id = data.id;
  const token = await getToken({ req });
  const email = token.email;

  const students = await mongoDb(collections.student);

  const student = await students.findOne({ email });
  const courseObjectId = new ObjectId(id);

  const courseIndex = student.enrolledCourses.findIndex((c) =>
    c.id.equals(courseObjectId)
  );

  if (student.enrolledCourses[courseIndex].complete === true) {
    return NextResponse.json({ success: true, showToast: false });
  }
  student.enrolledCourses[courseIndex].complete = true;
  
  const result = await students.updateOne(
    { email },
    { $set: { enrolledCourses: student.enrolledCourses } }
  );

  if (result.modifiedCount === 1) {
    return NextResponse.json({ success: true, showToast: true });
  }
}
