"use client";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

export default function Login() {
  const session = useSession();
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function LoginWithCredentials(e) {
    e.preventDefault();
    console.log("logged in", { email, password });
    signIn("credentials", { email, password });
  }
  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session.status]);

  if (session.status === "loading") return <Loading />;

  console.log("session status", session.status);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-blue-200 via-rose-200 to-sky-500 shadow-xl">
      <div className="grid place-content-center gap-20 w-[800px] h-[800px] rounded-lg bg-rose-500 ">
        <button onClick={() => signIn("google")}>Login with Google</button>

        <h1 className="text-center">Login with email and password</h1>
        <form
          onSubmit={() => LoginWithCredentials}
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
            required
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none rounded-lg w-[300px] h-[50px] indent-2 text-black"
          />
          <button
            type="submit"
            onClick={LoginWithCredentials}
            className="px-6 py-2 bg-slate-500 rounded-xl"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
