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
import { cyrillicToLatin, latinToCyrillic } from "../add/Components/lotin";
import { ranksData } from "@/app/Utils";
import { getAllBatalyon } from "@/app/Api/Apis";

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
          <DialogTitle id="responsive-dialog-title">
            {open.name + " " + latinToCyrillic("o'zgartirin")}
          </DialogTitle>
          <div className="flex flex-row  min-w-[800px] p-4 gap-2 px-4">
            <div className="w-full flex justify-between gap-4">
              {adminStatus ? (
                <FormControl sx={{ width: "40%" }} fullWidth>
                  <InputLabel id="region-select-label">
                    {latinToCyrillic("Batalyon")}{" "}
                  </InputLabel>
                  <Select
                    labelId="region-select-label"
                    id="region-select"
                    label={latinToCyrillic("Batalyon")}
                    name="batalyon"
                    value={value.batalyon}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 1124, // Example max height, adjust as needed
                        },
                      },
                    }}
                    onChange={handleChange}
                  >
                    {select &&
                      select.map((e: any) => (
                        <MenuItem key={e.username} value={e.username}>
                          {e.username}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              ) : (
                ""
              )}
              <div
                className={`flex gap-2 justify-between ${
                  adminStatus ? "w-[60%]" : "w-[100%]"
                }`}
              >
                <TextField
                  label={latinToCyrillic("Familyasi")}
                  value={value.lastname}
                  onChange={handleChange}
                  fullWidth
                  name="lastname"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  InputProps={{
                    autoComplete: "off",
                    autoCorrect: "off",
                    spellCheck: "false",
                  }}
                />
                <TextField
                  label={latinToCyrillic("Ismi")}
                  value={value.firstname}
                  onChange={handleChange}
                  fullWidth
                  name="firstname"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  InputProps={{
                    autoComplete: "off",
                    autoCorrect: "off",
                    spellCheck: "false",
                  }}
                />
                <TextField
                  label={latinToCyrillic("Sharifi")}
                  value={value.fatherName}
                  onChange={handleChange}
                  fullWidth
                  name="fatherName"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  InputProps={{
                    autoComplete: "off",
                    autoCorrect: "off",
                    spellCheck: "false",
                  }}
                />
              </div>
            </div>
          </div>
          <DialogActions>
            <div className="flex justify-between w-full mt-3 pb-2">
              <Button variant="contained" color="inherit" onClick={handleClose}>
                {latinToCyrillic("Orqaga")}
              </Button>
              <Button onClick={handleSubmite} color="info" variant="contained">
                {latinToCyrillic("Saqlash")}
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
              latinToCyrillic("ushbu Fuqoroni ochirishni istaysizmi ?")}
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
