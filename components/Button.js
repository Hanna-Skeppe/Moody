import React from "react";

export default function Button(props) {
  const { text, dark, full, clickHandler } = props;
  return (
    <button
      onClick={clickHandler}
      className={`${dark ? "text-white bg-indigo-600 " : "text-indigo-600"} ${
        full ? "grid place-items-center w-full" : ""
      } duration-200 rounded-full overflow-hidden border-2 border-indigo-600 hover:opacity-60`}
    >
      <p className="font-fugaz px-6 sm:px-10 whitespace-nowrap py-2 sm:pt-3">
        {text}
      </p>
    </button>
  );
}
