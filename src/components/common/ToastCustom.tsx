import React from "react";

function ToastCustom({ title = "", icon = null, description = "" }) {
  return (
    <div>
      <p>{title}</p>
      <div>
        <span className="mr-[6px] mb-1 inline-block align-middle">{icon}</span>
        <span>{description}</span>
      </div>
    </div>
  );
}

export default ToastCustom;
