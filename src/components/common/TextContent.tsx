import { ContentType } from "@/constants/enum/general.enum";
import React from "react";

type ContentProps = {
  className?: string;
  children: React.ReactNode;
  type?: ContentType;
  [key: string]: any;
};

function TextContent({
  className = "",
  type = ContentType.SMALL_TITLE,
  children,
  ...props
}: ContentProps) {
  const classNameContent = {
    headTitle: "md:text-[38px] md:leading-[46px] text-[30px] leading-[36px]",
    title: "md:text-[30px] md:leading-[36px] text-[24px] leading-[30px]",
    subTitle: "md:text-[24px] md:leading-[30px] text-[19px] leading-[23px]",
    smallTitle: "md:text-[19px] md:leading-[23px] text-[15px] leading-[18px]",
    description: "text-[15px] leading-[18px]",
    shortDescription: "text-[12px] leading-[15px]",
  };

  return (
    <div className={`${classNameContent[type]} ${className}`} {...props}>
      {children}
    </div>
  );
}

export default TextContent;
