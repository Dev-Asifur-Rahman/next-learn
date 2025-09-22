import mongoDb, { collections } from "@/lib/mongoConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

// promotion user instructor or admin
export async function POST(req) {
  const serverSession = await getServerSession(authOptions);

  const students = await mongoDb(collections.student);
  const instructors = await mongoDb(collections.instructor);
  const admins = await mongoDb(collections.admin);

  const checkRole = await serverSession.user.role;
  console.log(checkRole)
  // all codes will be under this condition
  if (checkRole === "admin") {
    const queries = req.nextUrl.searchParams;

    // get the role from query
    const role = queries.get("role");

    // get Requested role from queries 
    const requestedRole = queries.get("request");
    console.log(role,requestedRole)
    if (role === "student") {
    } else if (role === "instructor") {
    } else if (role === "admin") {
    }
  }
  else{
    return NextResponse.json({success : false})
  }

  return NextResponse.json({ success: true });
}
