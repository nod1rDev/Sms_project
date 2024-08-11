"use client";
import React, { useState } from "react";
import AddFuqaroTab from "./AddFuqaroTab";
import CreateFuqaro from "./CreateFuqaro";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

import { useSelector, useDispatch } from "react-redux";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { latinToCyrillic } from "./lotin";
import { createWorker } from "@/app/Api/Apis";
function AddFuqoro() {
  const [data, setData] = useState([]);
  const JWT = useSelector((s: any) => s.auth.JWT);
  const router = useRouter();
  const create = async () => {
    const res = await createWorker(JWT, data);
    if (res.success) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Fuqoro Qo'shildi"),
          status: "success",
        })
      );
      setData([]);
      router.push("/tip");
    } else {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic(res.message),
          status: "error",
        })
      );
    }
  };
  const dispatch = useDispatch();
  const handleSave = () => {
    create();
  };
  const admin = useSelector((s: any) => s.auth.admin);
  return (
    <div className="flex flex-col max-w-[80%] mx-auto">
      <div className=" mx-auto text-[28px] font-bold mb-4">
        {latinToCyrillic("Xodim qo'shish")}
      </div>
      <div className="mb-4">
        <Button
          onClick={() => (!admin ? router.push("/tip") : router.back())}
          variant="contained"
        >
          {latinToCyrillic("Orqaga")}
        </Button>
      </div>

      <div className="my-5">
        <CreateFuqaro data={data} setData={setData} />
      </div>
      <AddFuqaroTab setData={setData} ranks={data} />
      <div className="w-full">
        <Button
          onClick={handleSave}
          color="success"
          fullWidth
          sx={{ mt: "20px" }}
          variant="contained"
        >
          {latinToCyrillic("Saqlash")}
        </Button>
      </div>
    </div>
  );
}

export default AddFuqoro;
