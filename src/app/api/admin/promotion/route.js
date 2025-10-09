import mongoDb, { collections } from "@/lib/mongoConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const findLastUserId = async (prefix, promotingCollection) => {
  const getCollection = await mongoDb(collections[promotingCollection]);
  // get the last id of promotion role

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

const roleSet = async (currentCollection, promotingCollection, userId) => {
  const collection = await mongoDb(collections[currentCollection]);

  const getPromotingCollection = await mongoDb(
    collections[promotingCollection]
  );

  // find the user
  const user = await collection.findOne({ userId: userId });

  if (user) {
    if (promotingCollection === "student") {
      const newId = await findLastUserId("s", "student");
      const result = await getPromotingCollection.insertOne({
        userId: newId,
        name: user?.name,
        email: user?.email,
        role: "student",
        profileImage: user?.profileImage,
        location: user?.location || null,
        password: user?.password || null,
        joinedAt: dayjs().tz("Asia/Dhaka").format(),
        enrolledCourses: [],
        certificates: [],
      });

      const delete_user = await collection.deleteOne({ userId: userId });

      if (result.insertedId && delete_user.deletedCount == 1) {
        return { success: true };
      } else {
        return { success: false };
      }
    } else if (promotingCollection === "instructor") {
      const newId = await findLastUserId("i", "instructor");
      const result = await getPromotingCollection.insertOne({
        userId: newId,
        name: user?.name,
        email: user?.email,
        password: user?.password || null,
        role: "instructor",
        bio: null,
        specialization: null,
        location: null,
        joinedAt: dayjs().tz("Asia/Dhaka").format(),
        profileImage: user?.profileImage,
      });

      const delete_user = await collection.deleteOne({ userId: userId });

      if (result.insertedId && delete_user.deletedCount == 1) {
        return { success: true };
      } else {
        return { success: false };
      }
    } else if (promotingCollection === "admin") {
      const newId = await findLastUserId("a", "admin");
      const result = await getPromotingCollection.insertOne({
        userId: newId,
        name: user?.name,
        email: user?.email,
        password: user?.password || null,
        role: "admin",
        joinedAt: dayjs().tz("Asia/Dhaka").format(),
        profileImage: user?.profileImage,
      });

      const delete_user = await collection.deleteOne({ userId: userId });

      if (result.insertedId && delete_user.deletedCount == 1) {
        return { success: true };
      } else {
        return { success: false };
      }
    } else {
      return { success: false, message: "user not found" };
    }
  }
};

// promotion user instructor or admin
export async function POST(req) {
  const serverSession = await getServerSession(authOptions);

  const checkRole = await serverSession?.user.role;

  // all codes will be under this condition
  if (checkRole === "admin") {
    const queries = req.nextUrl.searchParams;

    // get the role from query
    const role = queries.get("role");

    // get Requested role from queries
    const requestedRole = queries.get("request");

    const id = queries.get("userId");

    if (requestedRole === "student") {
      const result = await roleSet(role, requestedRole, id);
      return result?.success === true
        ? NextResponse.json({ success: true })
        : NextResponse.json({ success: false });
    } else if (requestedRole === "instructor") {
      const result = await roleSet(role, requestedRole, id);
      return result?.success === true
        ? NextResponse.json({ success: true })
        : NextResponse.json({ success: false });
    } else if (requestedRole === "admin") {
      const result = await roleSet(role, requestedRole, id);
      return result?.success === true
        ? NextResponse.json({ success: true })
        : NextResponse.json({ success: false });
    }
  } else {
    return NextResponse.json({
      success: false,
      message: "Verify Your Identity First",
    });
  }
}
