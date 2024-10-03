import React from "react";
import Button from "./Button";
import Calendar from "./Calendar";

export default function Dashboard() {
  const statuses = {
    num_days: 14,
    time_remaining: "13:14:26",
    date: new Date().toDateString(),
  };

  const moods = {
    "&@$#+!": "😭",
    Sad: "🥲",
    Existing: "😶",
    Good: "😊",
    "Awesome!": "😍",
  };

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <div className="p-4 gap-4 grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg">
        {Object.keys(statuses).map((status, index) => {
          return (
            <div className="flex flex-col gap-1 sm:gap-2" key={index}>
              <p className="font-medium uppercase text-xs sm:text-sm truncate">
                {status.replaceAll("_", " ")}
              </p>
              <p className="font-fugaz text-base sm:text-lg text-wrap">
                {statuses[status]}
              </p>
            </div>
          );
        })}
      </div>
      <h4 className="font-fugaz text-5xl sm:text-6xl md:text-7xl text-center">
        How do you you <span className="textGradient">feel</span> today?
      </h4>
      <div className="flex items-stretch flex-wrap gap-4 w-full max-w-96 md:max-w-none mx-auto">
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button
              className={` flex flex-col flex-1 items-center gap-2 py-4 px-6 rounded-lg purpleShadow duration-200 bg-indigo-50 text-center hover:bg-indigo-100 `}
              key={moodIndex}
            >
              <p className="text-4xl sm:text-5xl md:6xl">{moods[mood]}</p>
              <p className=" text-xs sm:text-sm md:text-base font-fugaz text-indigo-500">
                {mood}
              </p>
            </button>
          );
        })}
      </div>
      <Calendar />
    </div>
  );
}
