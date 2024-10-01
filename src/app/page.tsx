"use client";

import WebApp from "@twa-dev/sdk";
import { useState } from "react";

export default function Home() {
  const [platForm, setPlatForm] = useState<any>();
  const [initData, setInitData] = useState<any>();
  const [initDataUnsafe, setInitDataUnsafe] = useState<any>();

  return (
    <div className="p-14">
      <button
        className="text-2xl font-bold bg-blue p-2 text-white rounded"
        onClick={() => {
          setPlatForm(WebApp.platform);
          setInitData(WebApp.initData);
          setInitDataUnsafe(WebApp.initDataUnsafe);
        }}
      >
        Click to get init data
      </button>
      <h2 className="text-3xl font-bold mt-5">DATA:</h2>
      <div className="mt-5 flex flex-col gap-5">
        <div>platform:::🚀 {JSON.stringify(platForm)}</div>
        <div>initData:::🚀 {JSON.stringify(initData)} </div>
        <div>initDataUnsafe:::🚀 {JSON.stringify(initDataUnsafe)} </div>
      </div>
    </div>
  );
}
