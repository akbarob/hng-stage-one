import mongoose from "mongoose";

export default async function Connect() {
  try {
    await mongoose.connect(process.env.Mongo);
  } catch (error) {
    throw new Error(" Connection to MongoAtlas Failed");
  }
}
