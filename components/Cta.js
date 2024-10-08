"use client";

import { useAuth } from "@/context/AuthContext";
import React from "react";
import Link from "next/link";
import Button from "./Button";

export default function Cta() {
  const { currentUser } = useAuth();

  return (
    <div
      className={`grid ${
        currentUser?.uid ? "grid-cols-1" : "grid-cols-2 gap-4"
      }  w-fit mx-auto`}
    >
      {currentUser?.uid ? (
        <>
          <Link href={"/dashboard"}>
            <Button dark text="Go to dashboard" />
          </Link>
        </>
      ) : (
        <>
          <Link href={"/dashboard"}>
            <Button text="Sign up" />
          </Link>
          <Link href={"/dashboard"}>
            <Button text="Login" dark />
          </Link>
        </>
      )}
    </div>
  );
}
