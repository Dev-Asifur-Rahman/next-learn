import { MongoClient, ServerApiVersion } from "mongodb";

export const collections = {
  courses:'courses'
}

export default function mongoDb(collection_name) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  return client.db(process.env.DB_NAME).collection(collection_name);
}
