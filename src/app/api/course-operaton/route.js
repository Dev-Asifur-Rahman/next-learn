import mongoDb, { collections } from "@/lib/mongoConnect";
import { getToken } from "next-auth/jwt";

const { NextResponse } = require("next/server");

export async function POST(req) {
    const students = await mongoDb(collections.student)
    const token = await getToken({req})
  return NextResponse.json({ message: true,token });
}
