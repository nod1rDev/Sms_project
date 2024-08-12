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

export default function TipModal({
  value,
  setValue,
  handleSubmit,
  handleClose,
  handleDelete,
}: {
  value: any;
  setValue: any;
  handleSubmit: any;
  handleClose: any;
  handleDelete: any;
}) {
  const theme = useTheme();
  const JWT = useSelector((s: any) => s.auth.JWT);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const open = useSelector((s: any) => s.tip.modal);
  const [select, setSelect] = React.useState<any>();
  const [isLatinToCyrillic, setIsLatinToCyrillic] = React.useState(true);
  const [latinText, setLatinText] = React.useState("");
  const [cyrillicText, setCyrillicText] = React.useState("");
  const [isLotin, setIsLotin] = React.useState(true);

  const adminStatus = useSelector((s: any) => s.auth.admin);

  const dispatch = useDispatch();

  const handleChange = (i: any) => {
    setValue({
      ...value,
      [i.target.name]: i.target.value,
    });
  };
  const getBatalyons = async () => {
    const res = await getAllBatalyon(JWT);

    setSelect(res.data);
  };

  React.useEffect(() => {
    getBatalyons();
  }, []);
  const handleSubmite = async () => {
    handleSubmit();
  };

  return (
    <React.Fragment>
      {open.type == 1 ? (
        <Dialog
          fullScreen={fullScreen}
          open={open.open}
          onClose={handleClose}
          sx={{
            "& .MuiDialog-paper": {
              maxWidth: "800px", // Custom width here
            },
          }}
          aria-labelledby="responsive-dialog-title"
        >
          <div className="font-bold text-[24px] ml-2 mt-2">
            {latinToCyrillic("Sms habari")}
          </div>
          <div className="flex flex-row  min-w-[800px] p-4 gap-2 px-4">
            <span className="font-bold text-[18px]">{open.report}</span>
          </div>
          <DialogActions>
            <div className="flex justify-between w-full mt-3 pb-2">
              <Button variant="contained" color="info" onClick={handleClose}>
                {latinToCyrillic("Orqaga")}
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          fullScreen={fullScreen}
          open={open.open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {`"${open.name}"` +
              " " +
              latinToCyrillic("ushbu hisobotni ochirishni istaysizmi ?")}
          </DialogTitle>
          <div className="w-[300px] mt-5"></div>
          <DialogActions>
            <div className="flex justify-between w-full mt-3 pb-2">
              <Button variant="contained" color="inherit" onClick={handleClose}>
                {latinToCyrillic("Orqaga")}
              </Button>
              <Button onClick={handleDelete} color="error" variant="contained">
                {latinToCyrillic("O'chirish")}
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  );
}
