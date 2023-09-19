"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
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
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-blue-200 via-rose-200 to-sky-500 shadow-xl">
      <div className="grid place-content-center gap-20 w-[800px] h-[800px] rounded-lg bg-rose-500 ">
        <button onClick={() => signIn("google")}>Login with Google</button>

        <h1 className="text-center">Login with email and password</h1>
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
            required
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none rounded-lg w-[300px] h-[50px] indent-2 text-black"
          />
          <button
            type="submit"
            onClick={handleSignUp}
            className="px-6 py-2 bg-slate-500 rounded-xl "
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
