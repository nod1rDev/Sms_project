"use client";
import React, { useEffect, useState } from "react";
import MenuBatalyon from "../Components/MenuBatalyon";
import { getAllBatalyon, getExcelWorker1 } from "@/app/Api/Apis";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
function page() {
  const [select, setSelect] = useState();
  const JWT = useSelector((s: any) => s.auth.JWT);
  const getBatalyons = async () => {
    const res = await getAllBatalyon(JWT);

    setSelect(res.data);
  };

  useEffect(() => {
    getBatalyons();
  }, []);
  const dispatch = useDispatch();
  const downloadExcel = async () => {
    try {
      const excelBlob = await getExcelWorker1(JWT);

      // URL yaratish
      const url = window.URL.createObjectURL(excelBlob);

      // <a> elementi yaratish va yuklab olishni amalga oshirish
      const a = document.createElement("a");
      a.href = url;
      a.download = "excel_file.xlsx"; // Yuklab olinadigan fayl nomi
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Excel file yuklandi"),
          status: "sucess",
        })
      );
    } catch (error) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Excel faylini yuklashda xatolik"),
          status: "error",
        })
      );
    }
  };
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-col ">
        <MenuBatalyon data={select} />
      </div>
    </div>
  );
}

export default page;
