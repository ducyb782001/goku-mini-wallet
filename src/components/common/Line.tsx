import { LineDirection } from "@/constants/enum/general.enum";
import React from "react";

type LineProps = {
  className?: string;
  direction?: LineDirection;
  [key: string]: any;
};

function Line({
  className = "",
  direction = LineDirection.HORIZONTAL,
}: LineProps) {
  const classNameDirection = {
    verticle: `h-full w-[1px]`,
    horizontal: `w-full h-[1px]`,
  };

  return (
    <div
      className={`bg-backLine ${classNameDirection[direction]} ${className}`}
    ></div>
  );
}

export default Line;
