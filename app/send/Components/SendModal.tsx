import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { IconButton } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

import { ranksData } from "@/app/Utils";
import { getAllBatalyon } from "@/app/Api/Apis";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import SendTab from "./SendTab";

export default function SendModal({
  data,
  handleClose,
}: {
  data: any;
  handleClose: any;
}) {
  const theme = useTheme();
  const JWT = useSelector((s: any) => s.auth.JWT);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const open = useSelector((s: any) => s.coctav.modal);

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
        <div className="font-bold text-[24px] ml-2 mt-2">
          {latinToCyrillic("Sms jonatilish xaqida malumot")}
        </div>
        <div className="flex flex-row  min-w-[1200px] p-4 gap-2 px-4">
          <SendTab ranks={data} />
        </div>
        <DialogActions>
          <div className="flex justify-between w-full mt-3 pb-2">
            <Button variant="contained" color="info" onClick={handleClose}>
              {latinToCyrillic("Orqaga")}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
