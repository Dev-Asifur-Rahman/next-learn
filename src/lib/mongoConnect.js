import { MongoClient, ServerApiVersion } from "mongodb";

export const collections = {
  courses: 'courses',
  admin: 'admin',
  instructor: 'instructor',
  student: 'student',
  contents: 'contents',
};

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default async function mongoDb(collection_name) {
  const client = await clientPromise;
  return client.db(process.env.DB_NAME).collection(collection_name);
}
