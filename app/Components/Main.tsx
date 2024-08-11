"use client";
import React from "react";
import Header from "./Header";

function Main({ children }: { children: any }) {
  return (
    <>
      <div className="flex min-h-full min-w-full mx-auto">
        <Header />
        <div className="overflow-y-auto ml-[300px] w-full pb-14">{children}</div>
      </div>
    </>
  );
}

export default Main;
