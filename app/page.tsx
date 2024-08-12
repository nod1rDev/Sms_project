"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { puJWT } from "./Redux/AuthSlice";
import Tip from "./tip/Components/Tip";
import Send from "./send/Components/Send";

function Page() {
  const dispatch = useDispatch();
  const JWT = useSelector((state: any) => state.auth.JWT);
  const admin = useSelector((s: any) => s.auth.admin);
  React.useEffect(() => {
    return () => {
      dispatch(puJWT(JWT));
    };
  }, []);

  window.onbeforeunload = function (e: any) {
    if (typeof e == "undefined") {
      e = window.event;
    }

    dispatch(puJWT(sessionStorage.getItem("token")));
  };
  return <Send />;
}

export default Page;
