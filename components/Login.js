import React from "react";
import Button from "./Button";

export default function Login() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className="font-fugaz text-4xl sm:text-5xl md:text-6xl">
        Login / Register
      </h3>
      <p>Yo&#39;re one step away!</p>
      <input
        className="w-full max-w-96 px-3 py-2 sm:px-3 border border-indigo-400 hover:border-indigo-600 rounded-full focus:outline-amber-600 duration-200 "
        type="email"
        placeholder="E-mail"
      />
      <input
        className="w-full max-w-96 px-3 py-2 sm:px-3 border border-indigo-400 hover:border-indigo-600 rounded-full focus:outline-amber-600 duration-200 "
        type="password"
        placeholder="Password"
      />
      <div className="w-full max-w-96">
        <Button text="Submit" full />
      </div>
      <p className="text-center">
        Don&#39;t have an account?{" "}
        <span className="text-indigo-600 hover:underline cursor-pointer">
          Sign up
        </span>
      </p>
    </div>
  );
}
