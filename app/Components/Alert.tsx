"use client"
import * as React from "react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { alertClose } from "../Redux/ShaxsiySlice";

export default function Alertt() {

  const alertInfo = useSelector((s: any) => s.shax.alert);

  const dispatch = useDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(alertClose(false));
  };

  return (
    <div>
      <Snackbar
        open={alertInfo.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={alertInfo.status}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertInfo.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
