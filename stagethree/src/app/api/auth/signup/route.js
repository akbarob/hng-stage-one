import User from "@/Model/User";
import Connect from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";

export async function POST(req) {
  const { email, password } = await req.json();
  await Connect();
  const hashPassword = await bcrypt.hash(password, 3);
  const newUser = new User({
    email,
    password: hashPassword,
  });
  try {
    await newUser.save();

    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}
