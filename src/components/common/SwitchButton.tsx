import React from "react";
import WrongSwitch from "react-switch";

const Switch = WrongSwitch as any;

type SwitchButtonProps = {
  handleSwitch: () => void;
  isChecked: boolean;
};

function SwitchButton({ handleSwitch, isChecked }: SwitchButtonProps) {
  return (
    <Switch
      onChange={handleSwitch}
      checked={isChecked || false}
      width={44}
      height={24}
      className="!opacity-100"
      uncheckedIcon={null}
      checkedIcon={null}
      offColor="#022439"
      onColor="#00FFFF"
      offHandleColor="#556C7A"
      onHandleColor="#E6E9EB"
    />
  );
}

export default SwitchButton;
