"use client";
import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/");
  };
  return (
    <div className="wrapper h-screen bg-slate-300  flex flex-col justify-center items-center">
      <div className="form-wrapper">
        <h1 className="mb-30 text-center font-bold text-2xl mb-3 uppercase">
          Sign up
        </h1>
        <form onSubmit={handleForm} className="form">
          <label htmlFor="email">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
          <div className="mt-3 bg-blue-600 items-center justify-center mx-auto text-center p-1">
            <button type="submit" className="font-bold text-white">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
