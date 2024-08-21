"use client";
import React, { useEffect, useState } from "react";
import Tips from "./Components/Tip";
import MenuBatalyon from "./Components/MenuBatalyon";
import { useSelector } from "react-redux";
import { getAllManzil } from "../Api/Apis";

function page() {
  const [data, setData] = useState();
  const JWT = useSelector((s: any) => s.auth.JWT);
  const getData = async () => {
    const res = await getAllManzil(JWT);
    setData(res.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <MenuBatalyon data={data} />
    </>
  );
}

export default page;
