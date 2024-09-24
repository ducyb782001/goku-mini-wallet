import React from "react";
import { ButtonType } from "../../constants/enum/general.enum";

type ButtonProps = {
  className?: string;
  accessoriesLeft?: React.ReactNode;
  accessoriesRight?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  type?: ButtonType;
  [key: string]: any;
};

function TButton({
  className = "",
  accessoriesLeft = null,
  accessoriesRight = null,
  children,
  onClick = undefined,
  type = ButtonType.PRIMARY,
  ...props
}: ButtonProps) {
  const classNameTheme = {
    primary:
      "py-3 px-4 w-full rounded-full text-secondary active:bg-primarySelected disabled:bg-primaryDisabled bg-primary hover:bg-primaryHover",
    secondary: `bg-[#011A28] bg-[#011A28] hover:bg-subBg active:bg-[#011a28] active:border-backTextOff p-3 rounded-xl`,
  };

  return (
    <button
      onClick={onClick}
      className={`border border-transparent font-medium disabled:cursor-not-allowed smooth-transform flex justify-center items-center gap-2 text-sm ${classNameTheme[type]} ${className}`}
      {...props}
    >
      {accessoriesLeft && <div className="">{accessoriesLeft}</div>}
      {children}
      {accessoriesRight && <div className="">{accessoriesRight}</div>}
    </button>
  );
}

export default TButton;
