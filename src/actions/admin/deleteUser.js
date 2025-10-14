"use server";

import mongoDb, { collections } from "@/lib/mongoConnect";

const deleteUser = async (id, collection) => {
  const getCollection = await mongoDb(collections[collection]);
  const user = await getCollection.findOne({ userId: id });
  if (!user) {
    return { success: false, message: "user not found !" };
  } else {
    const result = await getCollection.deleteOne({ userId: id });
    if (result?.acknowledged === true) {
      return { success: true, message: "user removed successfully !" };
    }
  }
};

export default deleteUser;
