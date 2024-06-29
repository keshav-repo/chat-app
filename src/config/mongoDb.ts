import { MongoClient, Db } from "mongodb";

const uri = "mongodb://localhost:27017";
const dbName = "chat";
let db: Db;

export const connectMongoDB = async () => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("error connecting to mongodb ", err);
    process.exit(1);
  }
};

export const getDb = () => db;
