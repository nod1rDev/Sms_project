"use client";
import * as React from "react";

import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";

import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { setModalN1 } from "@/app/Redux/CoctavsSlice";
import { getInfo } from "@/app/Api/Apis";
import TaskDetails from "./TsskDetails";

export default function ModalN1({ data }: any) {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const open = useSelector((s: any) => s.coctav.modalN1);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setModalN1({ open: false, id: 0 }));
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open.open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "1200px", // Custom width here
          },
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title"></DialogTitle>
        <div className="flex flex-col min-w-[1200px] gap-2 px-4">
          <TaskDetails data={data} />
        </div>
        <DialogActions>
          <div className="flex justify-between w-full mt-3 pb-2">
            <Button variant="contained" color="info" onClick={handleClose}>
              Orqaga
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
