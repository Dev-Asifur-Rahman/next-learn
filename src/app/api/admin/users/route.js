import mongoDb, { collections } from "@/lib/mongoConnect";
import { NextResponse } from "next/server";

// send user data and count admin instructor and admin on condition
export async function GET(req) {
  const queries = req.nextUrl.searchParams;
  const role = queries.get("role");
  const data = queries.get("data") === "true";

  const students = await mongoDb(collections.student);
  const instructors = await mongoDb(collections.instructor);
  const admins = await mongoDb(collections.admin);

  // if true send data of student instructors and admin 
  if (data === true) {
    if (role === "student") {
      const result = await students.find().toArray();
      return NextResponse.json({ user: result });
    } else if (role === "instructor") {
      const result = await instructors.find().toArray();
      return NextResponse.json({ user: result });
    }
    if (role === "admin") {
      const result = await admins.find().toArray();
      return NextResponse.json({ user: result });
    }
  }
// send count of admin instructor and students 
  if (data === false) {
    if (role === "student") {
      return NextResponse.json({ count: await students.countDocuments() });
    } else if (role === "instructor") {
      return NextResponse.json({
        count: await instructors.countDocuments(),
      });
    } else if (role === "admin") {
      return NextResponse.json({ count: await admins.countDocuments() });
    }
  }
}
