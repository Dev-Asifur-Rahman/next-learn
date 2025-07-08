import mongoDb, { collections } from "@/lib/mongoConnect";
import { NextResponse } from "next/server";

// send conditional courses to admin panel
export async function GET(req) {
  const queries = req.nextUrl.searchParams;
  const data = queries.get("data") === "true";

  const courses = await mongoDb(collections.courses);

  if (data === true) {
    const res = await courses.find().sort({courseId :1}).toArray();
    return NextResponse.json({ courses: res });
  }
  if (data === false) {
    const countCourses = await courses.countDocuments();
    return NextResponse.json({ count: countCourses });
  }
}
