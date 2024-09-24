import React from "react";

function XIcon({ ...props }) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 5L5 15M5 5l10 10"
        stroke="#556C7A"
        strokeWidth={1.77778}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default XIcon;
