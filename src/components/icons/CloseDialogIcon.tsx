import React from "react"

function CloseDialogIcon({ ...props }) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.667 7.333L7.334 20.666M7.334 7.333l13.333 13.333"
        stroke="#E6E9EB"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default CloseDialogIcon
