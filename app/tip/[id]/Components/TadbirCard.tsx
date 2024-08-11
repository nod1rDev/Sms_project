"use client";
import React from "react";
import { latinToCyrillic } from "../../add/Components/lotin";
import { formatNumber } from "@/app/Utils";

function TadbirCard({ data }: { data: any }) {
  return (
    <div className="w-full flex cursor-pointer  px-8 py-6 bg-[#f1faee] rounded-2xl justify-between items-center hover:border hover:border-[#0096c7]">
      <span className="font-bold text-left w-[200px] truncate">
        {data.clientname}
      </span>
      <span className="w-[300px] text-center truncate">{data.taskdate}</span>
      <span className="w-[300px] text-center truncate">{data.address}</span>
      <span className="w-[300px] text-center  truncate">{formatNumber(data.summa)}</span>
      <span className="w-[200px]  text-right truncate">
        {data.pay ? latinToCyrillic("To'landi") : latinToCyrillic("To'lanmadi")}
      </span>
    </div>
  );
}

export default TadbirCard;
