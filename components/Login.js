"use client";

import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const { signUp, logIn, currentUser } = useAuth();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Clear the error if the user is authenticated
    if (currentUser?.uid) {
      setError(null);
    }
  }, [currentUser]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password || password.length < 6 || !emailRegex.test(email)) {
      setError(
        "Please provide a valid email and a password of at least 6 characters"
      );
      return;
    }

    setAuthenticating(true);
    try {
      if (isRegister) {
        await signUp(email, password);
      } else {
        await logIn(email, password);
      }
    } catch (err) {
      err?.message?.includes("invalid")
        ? setError("Invalid credentials. Please try again.")
        : setError("An error occurred when logging in. Please try again.");
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-live="polite"
      className="flex flex-col flex-1 justify-center items-center gap-4"
    >
      <h1 className="font-fugaz text-4xl sm:text-5xl md:text-6xl">
        {isRegister ? "Register" : "Login"}
      </h1>
      <p>You&#39;re one step away!</p>
      <label htmlFor="email" className="sr-only">
        Email
      </label>
      <input
        id="email"
        name="email"
        className="w-full max-w-96 px-3 py-2 sm:px-3 border border-indigo-400 hover:border-indigo-600 rounded-full focus:outline-amber-600 duration-200"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        aria-required="true"
        aria-invalid={!!error}
      />
      <label htmlFor="password" className="sr-only">
        Password
      </label>
      <div className="relative w-full max-w-96">
        <input
          id="password"
          name="password"
          className="w-full px-3 py-2 sm:px-3 border border-indigo-400 hover:border-indigo-600 rounded-full focus:outline-amber-600 duration-200"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          aria-required="true"
          aria-invalid={!!error}
        />
        <button
          type="button"
          className="absolute right-3 top-2 text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <FontAwesomeIcon icon={faEyeSlash} />
          ) : (
            <FontAwesomeIcon icon={faEye} />
          )}
        </button>
      </div>
      {error && (
        <p className="text-amber-700" role="alert">
          {error}
        </p>
      )}
      <div className="w-full max-w-96">
        <Button
          type="submit"
          text={authenticating ? "Submitting" : "Submit"}
          full
          aria-busy={authenticating}
          aria-live="assertive"
        />
      </div>
      <p className="text-center">
        {!isRegister ? (
          <>Don&#39;t have an account? </>
        ) : (
          "Already registered? Go to "
        )}
        <button
          type="button" // Use type button to prevent form submission
          onClick={() => setIsRegister(!isRegister)}
          className="text-indigo-600 hover:underline cursor-pointer"
        >
          {isRegister ? "Login" : "Register"}
        </button>
      </p>
    </form>
  );
}
