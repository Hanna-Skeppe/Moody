"use client";

import React, { useState } from "react";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const { signUp, logIn } = useAuth();

  async function handleSubmit() {
    // TODO: add regex check for email
    if (!email || !password || password.length < 6) {
      return;
    }
    setAuthenticating(true);
    try {
      if (isRegister) {
        console.log("signing up new user");
        await signUp(email, password);
      } else {
        console.log("logging in existing user");
        await logIn(email, password);
      }
    } catch (err) {
      // TODO: Expand on this later: add an error state and handle the error in the FE
      console.log("cannot login or signup:", err?.message);
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className="font-fugaz text-4xl sm:text-5xl md:text-6xl">
        {isRegister ? "Register" : "Login"}
      </h3>
      <p>Yo&#39;re one step away!</p>
      <input
        className="w-full max-w-96 px-3 py-2 sm:px-3 border border-indigo-400 hover:border-indigo-600 rounded-full focus:outline-amber-600 duration-200 "
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
      />
      <input
        className="w-full max-w-96 px-3 py-2 sm:px-3 border border-indigo-400 hover:border-indigo-600 rounded-full focus:outline-amber-600 duration-200 "
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <div className="w-full max-w-96">
        <Button
          clickHandler={handleSubmit}
          text={authenticating ? "Submitting" : "Submit"}
          full
        />
      </div>
      <p className="text-center">
        {!isRegister ? (
          <>Don&#39;t have an account? </>
        ) : (
          "Already registered? Go to "
        )}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-indigo-600 hover:underline cursor-pointer"
        >
          {isRegister ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
}
