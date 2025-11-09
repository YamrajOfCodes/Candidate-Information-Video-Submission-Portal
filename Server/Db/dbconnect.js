import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

let gfsBucket = null;

const dbConnect = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  const DB_URL = process.env.MONGO_URI

  await mongoose.connect(DB_URL);
  const db = mongoose.connection.db;

  gfsBucket = new GridFSBucket(db, { bucketName: "videos" });
  console.log("MongoDB connected & GridFS initialized");
};

const getGfsBucket = () => {
  if (!gfsBucket) {
    throw new Error("GridFS not initialized yet");
  }
  return gfsBucket;
};

export { dbConnect, getGfsBucket };
