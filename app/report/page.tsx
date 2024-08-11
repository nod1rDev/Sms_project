"use client";
import React, { useEffect, useState } from "react";
import MenuBatalyon from "./Components/MenuBatalyon";
import { getDates } from "../Api/Apis";
import { useSelector } from "react-redux";

function page() {
  const [data, setData] = useState<any>([]);
  const JWT = useSelector((s: any) => s.auth.JWT);
  const getData = async () => {
    const res = await getDates(JWT);
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
