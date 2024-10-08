import React from "react";

export default function Button(props) {
  const { text, dark, full, clickHandler, slim } = props;
  return (
    <button
      onClick={clickHandler}
      className={`${dark ? "text-white bg-indigo-600" : "text-indigo-600"} ${
        full ? "grid place-items-center w-full" : ""
      }  ${
        slim ? "px-4 sm:px-3 py-1 text-sm" : "px-6 sm:px-10 py-2 sm:py-3"
      } duration-200 overflow-hidden border-2 border-indigo-600 hover:opacity-60 rounded-full`}
    >
      <p className="font-fugaz whitespace-nowrap">{text}</p>
    </button>
  );
}
