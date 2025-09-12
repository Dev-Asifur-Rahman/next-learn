import mongoDb, { collections } from "@/lib/mongoConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// promotion user instructor or admin 
export async function GET(req) {
  const serverSession = await getServerSession()
  const students = await mongoDb(collections.student);
  const instructors = await mongoDb(collections.instructor);
  const admins = await mongoDb(collections.admin);

  const checkRole = serverSession.user.role
  // all codes will be under this condition 
  if(checkRole === 'admin'){

  }
  
  const queries = req.nextUrl.searchParams;
  
  // get the role from query 
  const role = queries.get('role')
  if(role === 'student'){
     
  }

  else if(role === 'instructor'){

  }

  else if(role === 'admin'){

  }

  const currentRole = queries.currentRole
  return NextResponse.json({ success: true });
}
