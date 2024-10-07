import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Loading() {
  return (
    <div className="flex flex-col flex-1 mt-24 md:mt-0 justify-start md:justify-center items-center gap-8">
      <FontAwesomeIcon
        icon={faSpinner}
        spinPulse
        className="w-16 h-16 text-indigo-600"
      />
      <h3 className="font-fugaz text-4xl sm:text-5xl md:text-6xl">
        Loading...
      </h3>
    </div>
  );
}
