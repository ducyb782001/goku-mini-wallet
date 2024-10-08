import React from "react";
import { ContentType } from "../../constants/enum/general.enum";
import TextContent from "./TextContent";

function PrimaryInputCheckbox({
  className = "",
  onClick = undefined,
  accessoriesLeft = null,
  accessoriesRight = null,
  checked = false,
  onChange = undefined,
  type = "checkbox",
  ...props
}) {
  return (
    <label className={`flex items-center ${className}`}>
      {accessoriesLeft && (
        <div className="mr-2 text-white">{accessoriesLeft}</div>
      )}
      <input
        type={type}
        className="absolute w-5 h-5 opacity-0 cursor-pointer custom-checkbox"
        {...props}
        onClick={onClick}
        checked={checked}
        onChange={onChange}
      />
      <div className="flex items-center justify-center flex-shrink-0 w-5 h-5 border-[2px] border-white rounded-md bg-background focus-within:border-blue-500">
        <svg
          className="hidden"
          width={8}
          height={6}
          viewBox="0 0 8 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.011 5.706a.727.727 0 01-.516-.213L.518 3.516a.728.728 0 111.03-1.032l1.463 1.462 3.44-3.44a.728.728 0 111.031 1.032L3.527 5.493a.727.727 0 01-.516.213z"
            fill="#00f0fd"
          />
        </svg>
      </div>
      {accessoriesRight && (
        <TextContent
          type={ContentType.DESCRIPTION}
          className="ml-3 font-semibold text-white cursor-pointer"
        >
          {accessoriesRight}
        </TextContent>
      )}
    </label>
  );
}

export default PrimaryInputCheckbox;
