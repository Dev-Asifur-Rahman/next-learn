import mongoDb, { collections } from "@/lib/mongoConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

const findLastUserId = async (prefix, collection) => {
  const getCollection = await mongoDb(collections[collection]);
  const lastUser = await getCollection
    .aggregate([
      {
        $match: { userId: { $regex: `^${prefix}` } },
      },
      {
        $addFields: {
          numericId: { $toInt: { $substr: ["$userId", 1, -1] } },
        },
      },
      {
        $sort: { numericId: -1 },
      },
      {
        $limit: 1,
      },
    ])
    .toArray();

  const lastNumericId = lastUser[0]?.numericId || 0;
  const nextNumericId = lastNumericId + 1;
  const formattedNumber = String(nextNumericId).padStart(3, "0");
  const newId = `${prefix}${formattedNumber}`;
  return newId;
};

const roleSet = async (name, role) => {
  const collection = await mongoDb(collections.name);

  if (role === "student") {
    const lastIdNumber = await findLastUserId("s");
    console.log(lastIdNumber);
  } else if (role === "instructor") {
    const lastIdNumber = await findLastUserId("i");
    console.log(lastIdNumber);
  } else if (role === "admin") {
    const lastIdNumber = await findLastUserId("a");
    console.log(lastIdNumber);
  } else {
    return { success: false };
  }
};

// promotion user instructor or admin
export async function POST(req) {
  const serverSession = await getServerSession(authOptions);

  const students = await mongoDb(collections.student);
  const instructors = await mongoDb(collections.instructor);
  const admins = await mongoDb(collections.admin);

  const checkRole = await serverSession.user.role;

  // all codes will be under this condition
  if (checkRole === "admin") {
    const queries = req.nextUrl.searchParams;

    // get the role from query
    const role = queries.get("role");

    // get Requested role from queries
    const requestedRole = queries.get("request");

    const id = queries.get("userId");

    if (role === "student") {
      const getStudent = await students.findOne({ userId: id });
      const newId = await findLastUserId("s", "student");
      console.log(newId);
    } else if (role === "instructor") {
      const getInstructor = await instructors.findOne({ userId: id });
      const newId = await findLastUserId("i", "instructor");
      console.log(newId);
    } else if (role === "admin") {
      const getAdmin = await admins.findOne({ userId: id });
      const newId = await findLastUserId("a", "admin");
      console.log(newId);
    }
  } else {
    return NextResponse.json({
      success: false,
      message: "Verify Your Identity First",
    });
  }
  return NextResponse.json({ success: true });
}
