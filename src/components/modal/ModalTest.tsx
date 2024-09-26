import React from "react";
import TButton from "../common/TButton";
import { ButtonType } from "@/constants/enum/general.enum";
import CloseDialogIcon from "../icons/CloseDialogIcon";

function ModalTest({ setIsShowModal }) {
  return (
    <div>
      <TButton
        type={ButtonType.ICON}
        onClick={() => {
          setIsShowModal(false);
        }}
      >
        <CloseDialogIcon />
      </TButton>
      <div>Hello world</div>
    </div>
  );
}

export default ModalTest;
