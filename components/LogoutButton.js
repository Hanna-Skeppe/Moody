"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Button from "./Button";

export default function LogoutButton() {
  const { currentUser, logOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogOut() {
    setIsLoggingOut(true);
    try {
      await logOut();
    } catch (err) {
      console.log("cannot logout user:", err?.message);
    } finally {
      setIsLoggingOut(false);
    }
  }
  if (currentUser?.uid) {
    return (
      <Button
        slim
        clickHandler={handleLogOut}
        text={`${isLoggingOut ? "Logging out..." : "Log out"}`}
      />
    );
  }
  return null;
}
