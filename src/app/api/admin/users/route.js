import mongoDb, { collections } from "@/lib/mongoConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
  const queries = req.nextUrl.searchParams;
  const role = queries.get("role");
  if (role === "student") {
    const students = await mongoDb(collections.student);
    return NextResponse.json({ count: await students.countDocuments() });
  } else if (role === "instructor") {
    const instructors = await mongoDb(collections.instructor);
    return NextResponse.json({
      count: await instructors.countDocuments(),
    });
  } else if (role === "admin") {
    const admins = await mongoDb(collections.admin);
    return NextResponse.json({ count: await admins.countDocuments() });
  }
}
