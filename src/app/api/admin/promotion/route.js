import mongoDb, { collections } from "@/lib/mongoConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { collections } from "./../../../../lib/mongoConnect";

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

const roleSet = async (currentRole, requestedRole, collection) => {
  const collection = await mongoDb(collections[collection]);

  if (currentRole === "student") {
    const newId = await findLastUserId("s", "student");
  } else if (currentRole === "instructor") {
    const newId = await findLastUserId("i", "instructor");
  } else if (currentRole === "admin") {
    const newId = await findLastUserId("a", "admin");
  } else {
    return { success: false };
  }
};

// promotion user instructor or admin
export async function POST(req) {
  const serverSession = await getServerSession(authOptions);

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
      const result = await roleSet();
    } else if (role === "instructor") {
    } else if (role === "admin") {
    }
  } else {
    return NextResponse.json({
      success: false,
      message: "Verify Your Identity First",
    });
  }
  return NextResponse.json({ success: true });
}
