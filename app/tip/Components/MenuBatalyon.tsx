import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { useDispatch } from "react-redux";
import { setBatalyon } from "@/app/Redux/TipSlice";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { latinToCyrillic } from "../add/Components/lotin";

export default function MenuBatalyon({ data }: { data: any }) {
  const itemData = data || []; // To handle if data is undefined
  const dispatch = useDispatch();
  const router = useRouter();
  const handleClick = (item: any) => {
    dispatch(setBatalyon(item));
    sessionStorage.setItem("batalyonId", item.id);
    router.push("/tip/adminTip/" + item.id);
  };

  return (
    <>
      <h1 className="text-[28px] mt-10 font-bold mx-auto text-center mb-4">
        {latinToCyrillic("Bataly'on tanlang")}
      </h1>

      <div className="w-[80%] mb-10 mx-auto flex flex-col gap-4">
        {itemData.map((item: any, index: number) => (
          <button
            key={index}
            onClick={() => handleClick(item)}
            className={`flex gap-6 justify-center items-center px-4 w-full  py-12 rounded-xl transition-all duration-300 bg-[#1976D2] text-white hover:bg-[#fff] hover:text-[#1976D2] hover:scale-105`}
          >
            <h1 className="text-[20px] font-bold text-center">
              {item.username}
            </h1>
          </button>
        ))}
      </div>
    </>
  );
}
