"use client";

import React, { useState } from "react";
import { gradients, baseRating } from "@/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const months = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sept",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};
const monthsArr = Object.keys(months);
const dayList = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function Calendar(props) {
  const { demo, handleSetMood, completeData } = props;
  const now = new Date();

  const currMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(
    Object.keys(months)[currMonth]
  );
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const numericMonth = monthsArr.indexOf(selectedMonth);
  const data = completeData?.[selectedYear]?.[numericMonth] || {};

  function handleChangeMonth(value) {
    // if hitting the bounds of the months, adjust the year that is displayed instead.
    if (numericMonth + value < 0) {
      // set the month value to 11 and decrement the year
      setSelectedYear((prev) => prev - 1);
      setSelectedMonth(monthsArr[monthsArr.length - 1]);
    } else if (numericMonth + value > 11) {
      // set month value to 0 and increment the year
      setSelectedYear((prev) => prev + 1);
      setSelectedMonth(monthsArr[0]);
    } else {
      setSelectedMonth(monthsArr[numericMonth + value]);
    }
  }

  const monthNow = new Date(
    selectedYear,
    Object.keys(months).indexOf(selectedMonth),
    1
  );
  const firstDayOfMonth = (monthNow.getDay() + 6) % 7;
  const daysInMonth = new Date(selectedYear, numericMonth + 1, 0).getDate();
  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-6 gap-4 items-center">
        <button
          className="mr-auto w-4 h-4 sm:w-5 sm:h-5 col-span-1"
          onClick={() => handleChangeMonth(-1)}
        >
          <FontAwesomeIcon
            className="w-full h-full text-indigo-800 duration-200 hover:opacity-60"
            icon={faChevronLeft}
          />
        </button>
        <p className="font-fugaz text-center capitalize textGradient text-lg sm:text-xl col-span-4">
          {selectedMonth} {selectedYear}
        </p>

        <button
          className="ml-auto w-4 h-4 sm:w-5 sm:h-5 col-span-1"
          onClick={() => handleChangeMonth(+1)}
        >
          <FontAwesomeIcon
            className="w-full h-full text-indigo-800 duration-200 hover:opacity-60"
            icon={faChevronRight}
          />
        </button>
      </div>
      <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10">
        <div className="grid grid-cols-7 gap-1 mb-5 font-medium uppercase text-xs sm:text-sm font-openSans text-indigo-800">
          {dayList.map((day) => {
            return (
              <div key={day}>
                <span className="md:hidden">{day.slice(0, 3)}</span>
                <span className="hidden md:block">{day}</span>
              </div>
            );
          })}
        </div>
        {[...Array(numRows).keys()].map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="grid grid-cols-7 gap-1">
              {dayList.map((_, dayOfWeekIndex) => {
                let dayIndex =
                  rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);
                let dayDisplay =
                  dayIndex > daysInMonth
                    ? false
                    : row === 0 && dayOfWeekIndex < firstDayOfMonth
                    ? false
                    : true;

                let isToday =
                  dayIndex === now.getDate() &&
                  now.getMonth() === monthsArr.indexOf(selectedMonth);
                if (!dayDisplay) {
                  return (
                    <div
                      key={`${rowIndex}-${dayOfWeekIndex}`}
                      className="bg-white"
                    />
                  );
                }
                let color = demo
                  ? gradients.indigo[baseRating[dayIndex]]
                  : dayIndex in data
                  ? gradients.indigo[data[dayIndex]]
                  : "white";

                return (
                  <div
                    className={`text-sm md:text-base border p-2 sm:p-3 flex items-center gap-2 justify-between rounded-lg ${
                      isToday ? "border-indigo-900" : "border-indigo-100"
                    } ${color === "white" ? "text-indigo-400" : "text-white"}`}
                    style={{ background: color }}
                    key={dayIndex}
                  >
                    <p className="sm:pl-2">{dayIndex}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
