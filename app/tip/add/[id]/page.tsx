"use client"
import React from "react";
import { useParams, useRouter } from "next/navigation";
import AddFuqoro from "../Components/AddFuqoro";

function page() {
    const { id } = useParams();
  return (
    <div>
      {" "}
      <AddFuqoro id={id} />
    </div>
  );
}

export default page;
