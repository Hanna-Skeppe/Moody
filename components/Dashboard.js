"use client";

import React, { useEffect, useState } from "react";
//import Button from "./Button";
import Calendar from "./Calendar";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Loading from "./Loading";
import Login from "./Login";

export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
  const [data, setData] = useState({});
  const now = new Date();

  function countExistingValues() {
    let totalNumberOfDays = 0;
    let sumMoods = 0;
    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let daysMood = data[year][month][day];
          totalNumberOfDays++;
          sumMoods += daysMood;
        }
      }
    }

    const avgMood =
      sumMoods > 0 && totalNumberOfDays > 0
        ? (sumMoods / totalNumberOfDays).toFixed(1)
        : null;
    return { days_tracked: totalNumberOfDays, average_mood: avgMood };
  }

  const hoursRemaining =
    (23 - now.getHours()).length > 1
      ? 23 - now.getHours()
      : (23 - now.getHours()).toString().padStart(2, "0");
  const minutesRemaining =
    (60 - now.getMinutes()).length > 1
      ? 60 - now.getMinutes()
      : (60 - now.getMinutes()).toString().padStart(2, "0");

  const statuses = {
    ...countExistingValues(),
    time_remaining: `${hoursRemaining}H ${minutesRemaining}M`,
  };

  async function handleSetMood(mood) {
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    try {
      const newData = { ...userDataObj };

      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }
      newData[year][month][day] = mood;
      // update current state
      setData(newData);
      // update the context/global state:
      setUserDataObj(newData);
      // update firebase
      const docRef = doc(db, "users", currentUser.uid);
      const res = await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        { merge: true }
      );
    } catch (err) {
      console.log("Failed to set data: ", err?.message);
    }
  }

  const moods = {
    "&@$#+!": "😭",
    Sad: "🥲",
    Existing: "😶",
    Good: "😊",
    "Awesome!": "😍",
  };

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return;
    }
    setData(userDataObj);
  }, [currentUser, userDataObj]);

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <div className="p-4 gap-4 grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg">
        {Object.keys(statuses).map((status) => {
          return (
            <div className="flex flex-col gap-1 sm:gap-2" key={status}>
              <p className="font-medium text-xs sm:text-sm uppercase truncate">
                {status.replaceAll("_", " ")}
              </p>
              <p className="font-fugaz text-base sm:text-lg text-wrap">
                {status === "average_mood" && statuses[status] < 1
                  ? "Not calculated yet"
                  : statuses[status]}
                {status === "days_tracked" && statuses[status] > 0 ? " 🙌" : ""}
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
              onClick={() => handleSetMood(moodIndex + 1)}
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
      <Calendar completeData={data} handleSetMood={handleSetMood} />
    </div>
  );
}
