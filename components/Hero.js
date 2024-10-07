import React from "react";
import Link from "next/link";
import Button from "./Button";
import Calendar from "./Calendar";

export default function Hero() {
  return (
    <div className="py-4 md:py-10 flex flex-col gap-8 sm:gap-10">
      <h1 className="text-5xl text-center font-fugaz sm:text-6xl md:text-7xl">
        <span className="textGradient">Moody</span> helps you track your
        <span className="textGradient"> daily</span> mood!
      </h1>
      <p className="w-full mx-auto max-w-[500px] lg:max-w-[600px] text-lg sm:text-xl md:text-2xl text-center">
        Create your mood record and visualize your
        <span className="font-semibold"> yearly and monthly</span> mood-trends
      </p>
      <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
        <Link href={"/dashboard"}>
          <Button text="Sign up" />
        </Link>
        <Link href={"/dashboard"}>
          <Button text="Login" dark />
        </Link>
      </div>
      <Calendar demo />
    </div>
  );
}
