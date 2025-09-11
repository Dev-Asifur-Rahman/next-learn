import mongoDb, { collections } from "@/lib/mongoConnect";
import { NextResponse } from "next/server";

export async function GET() {
  const students = await mongoDb(collections.student);
  const instructors = await mongoDb(collections.instructor);
  const admins = await mongoDb(collections.admin);
  return NextResponse.json({ success: true });
}
