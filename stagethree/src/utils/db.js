import mongoose from "mongoose";

export default async function Connect() {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    throw new Error(error.message);
  }
}
