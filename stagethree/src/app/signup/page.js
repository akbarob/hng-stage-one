"use client";

import Loading from "@/components/Loading";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const session = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState();

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      const response = await fetch("api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      response.status === 201 &&
        router.push("/?success= HNG Account has been created");
      console.log(email, password);
    } catch (err) {
      setError(err.message);
    }
  }
  if (session.status === "loading") return <Loading />;
  else if (session.status === "authenticated" || "unauthenticated")
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-blue-200 via-rose-200 to-sky-500 shadow-xl">
        <div className="grid place-content-center gap-8 w-[80%] md:w-[700px] h-[70%]  rounded-lg bg-rose-500 ">
          <Link
            className="text-center font-bold text-3xl hover:text-rose-900"
            href={"/"}
          >
            HNG Internship
          </Link>{" "}
          <h1 className="text-center font-semibold text-2xl">Sign up</h1>
          <form
            onSubmit={() => handleSignUp}
            className="flex  flex-col justify-center items-center gap-14 "
          >
            <input
              type="email"
              placeholder="email@gmail.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none rounded-lg w-[300px] h-[50px] indent-2 text-black"
            />
            <input
              type="password"
              placeholder="* * * * * * * *"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none rounded-lg w-[300px] h-[50px] indent-2 text-black"
            />
            <button
              type="submit"
              onClick={handleSignUp}
              className="h-[50px] px-6 py-2 bg-white text-rose-700 hover:bg-rose-700 hover:text-white rounded-xl"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    );
}
