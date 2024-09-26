"use client";

import React from "react";

function MainLayout({ children }: any) {
  return (
    <div className="min-w-full min-h-screen md:pt-20 pt-[60px] md:pl-[100px] text-black bg-white">
      <div className={`px-4 pb-10`}>{children}</div>
    </div>
  );
}

export default MainLayout;
