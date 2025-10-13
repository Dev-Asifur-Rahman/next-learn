'use server'

import mongoDb, { collections } from "@/lib/mongoConnect";

const deleteUser = async(id,collection) => {
    const getCollection = await mongoDb(collections[collection])
    const user = await getCollection.findOne({userId : id})
    console.log(user)
    return {success : true}
};

export default deleteUser;