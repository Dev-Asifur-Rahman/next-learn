import mongoDb, { collections } from "@/lib/mongoConnect";
import { ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// enroll in a course 
export async function POST(req) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const email = token.email;

  const courses = await mongoDb(collections.courses);
  const contents = await mongoDb(collections.contents);
  const students = await mongoDb(collections.student);

  try {
    const student = await students.findOne({ email: email });
    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }
    const studentId = student._id;

    const course = await courses.findOne({ _id: new ObjectId(id) });
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const isStudentEnrolled = course.enrolledId.some(
      (sid) => sid.toString() === studentId.toString()
    );

    if (isStudentEnrolled) {
      return NextResponse.json(
        { error: "Student already enrolled in this course" },
        { status: 400 }
      );
    }
    const getCourseContent = await contents.findOne({
      courseId: course.courseId,
    });
    if (!getCourseContent) {
      return NextResponse.json(
        { error: "Course content not found" },
        { status: 404 }
      );
    }

    const courseContentId = getCourseContent._id;

    await students.updateOne(
      { _id: studentId },
      {
        $addToSet: {
          enrolledCourses: {
            id: courseContentId,
            complete: false,
          },
        },
      }
    );

    await courses.updateOne(
      { _id: new ObjectId(id) },
      { $addToSet: { enrolledId: studentId } }
    );

    return NextResponse.json(
      { message: "Enrolled successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
