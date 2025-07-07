import mongoDb, { collections } from "@/lib/mongoConnect";
import { NextResponse } from "next/server";

// send conditional courses to admin panel 
export async function GET(req) {
    const courses = await mongoDb(collections.courses)
    const countCourses = await courses.countDocuments()
    return NextResponse.json({count:countCourses})
}