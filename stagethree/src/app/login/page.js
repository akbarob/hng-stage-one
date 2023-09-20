"use client";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Login() {
  const session = useSession();
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function LoginWithCredentials(e) {
    e.preventDefault();
    console.log({ email, password });
    const login = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    // // console.log(session);
    console.log("login", login);
    if (login.error) {
      toast.error(login.error);
    }
    if (!login.error) {
      router.push("/");
    }
  }

  if (session.status === "loading") return <Loading />;
  else if (session.status === "authenticated" || "unauthenticated")
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-blue-200 via-rose-200 to-sky-500 shadow-xl">
        <div className="grid place-content-center gap-8 w-[80%] md:w-[700px] h-[70%] rounded-lg bg-rose-500 py-4 ">
          <Link
            className="text-center font-bold text-3xl hover:text-rose-900"
            href={"/"}
          >
            HNG Internship
          </Link>
          <h1 className="text-center font-semibold text-lg md:text-2xl">
            Login with email and password
          </h1>
          <form
            onSubmit={LoginWithCredentials}
            className="flex  flex-col justify-center items-center gap-14 "
          >
            <input
              type="email"
              placeholder="email@gmail.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none rounded-lg w-[300px] h-[50px] indent-2 text-rose-700"
            />
            <input
              type="password"
              placeholder="* * * * * * * *"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none rounded-lg w-[300px] h-[50px] indent-2 text-rose-700"
            />
            <button
              disabled={!email || !password}
              type="submit"
              onClick={LoginWithCredentials}
              className=" disabled:opacity-40 h-[50px] px-6 py-2 bg-white text-rose-700 hover:bg-rose-700 hover:text-white rounded-xl"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
}
