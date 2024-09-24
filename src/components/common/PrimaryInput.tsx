import React from "react";
import { ContentType } from "../../constants/enum/general.enum";
import TextContent from "./TextContent";

function PrimaryInput({
  title = null,
  className = "",
  placeholder = "",
  type = "",
  onChange = undefined,
  classNameInput = "",
  id = "",
  message = "",
  note = null,
  accessoriesLeft = null,
  accessoriesRight = null,
  value = undefined,
  disabled = false,
  classNameAccessoriesRight = "",
  classNameAccessoriesLeft = "",
  readOnly = false,
  ...props
}) {
  return (
    <div className={`${className}`}>
      {title && (
        <TextContent
          type={ContentType.DESCRIPTION}
          className="mb-2 font-semibold text-grayLight"
        >
          {title}
        </TextContent>
      )}
      {note && <div className="mb-2 text-[13px] text-gray">{note}</div>}
      <div className="relative w-full">
        {accessoriesLeft && (
          <div className={`absolute top-3 left-4 ${classNameAccessoriesLeft}`}>
            {accessoriesLeft}
          </div>
        )}

        <input
          id={id}
          placeholder={placeholder}
          {...props}
          autoFocus={false}
          type={type}
          onChange={onChange}
          value={value}
          disabled={disabled}
          className={`placeholder-gray w-full text-base md:text-[15px] md:leading-[20px] py-3 rounded-xl outline-none px-4 bg-secondBackground text-white border border-backTextOff focus:border-primary hover:border-primary smooth-transform read-only:bg-[#1A394C] read-only:hover:border-secondary read-only:focus:border-secondary  ${
            accessoriesLeft && "pl-12"
          } ${accessoriesRight && "pr-12"}
              ${classNameInput}`}
          tabIndex={-1}
          readOnly={readOnly}
        />
        {message && (
          <TextContent
            type={ContentType.SHORT_DESCRIPTION}
            className="mt-2 text-red smooth-transform"
          >
            {message}
          </TextContent>
        )}
        {accessoriesRight && (
          <div
            className={`absolute cursor-pointer top-[13px] right-4 ${classNameAccessoriesRight}`}
          >
            {accessoriesRight}
          </div>
        )}
      </div>
    </div>
  );
}

export default PrimaryInput;
