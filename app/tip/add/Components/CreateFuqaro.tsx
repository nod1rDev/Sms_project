"use client";
import React, { useEffect, useState } from "react";
import LatCyrConverter, { latinToCyrillic } from "./lotin";
import { useSelector, useDispatch } from "react-redux";

import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { IconButton, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { ranksData } from "@/app/Utils";
import { URL } from "@/app/Api/Apis";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function CreateFuqaro({ data, setData }: { data: any; setData: any }) {
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [createInp, setCreateInp] = useState({
    lastname: "",
    firstname: "",
    fatherName: "",
  });

  const [clear, setClear] = useState(1);
  const [file, setFile] = useState<any>(null);
  const dispatch = useDispatch();

  const handleCreateChange = (i: any) => {
    const { name, value } = i.target;
    if (name === "selectRank") {
    } else {
      setCreateInp({ ...createInp, [name]: value });
    }
  };

  const saqlsh = (e: any) => {
    e.preventDefault();
    if (createInp.lastname) {
      if (createInp.firstname) {
        setData([
          ...data,
          { ...createInp, _id: Math.ceil(Math.random() * 15415645488) },
        ]);
        setCreateInp({
          lastname: "",
          firstname: "",
          fatherName: "",
        });
        setClear(clear + 213);
      } else {
        dispatch(
          alertChange({
            open: true,
            message: latinToCyrillic("Familya Isim Sharifni togri kiriting"),
            status: "warning",
          })
        );
      }
    } else {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Malumotlarni to'liq to'ldiring"),
          status: "warning",
        })
      );
    }
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files?.[0];

    setFile(selectedFile);
  };
  const textToJson = (text: string) => {
    try {
      const jsonObject = JSON.parse(text);
      return jsonObject;
    } catch (error) {
      return { success: false, message: "Invalid JSON format" };
    }
  };
  const router = useRouter();
  const admin = useSelector((s: any) => s.auth.admin);
  const handleSubmit = async () => {
    if (!file) return;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${JWT}`);

    const formdata = new FormData();
    formdata.append("file", file);

    const requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(URL + "/worker/import/excel", requestOptions)
      .then((response) => response.text())
      .then((result: any) => {
        const res = textToJson(result);
        if (res.success) {
          dispatch(
            alertChange({
              open: true,
              message: latinToCyrillic("Exel file kiritildi"),
              status: "success",
            })
          );

          !admin ? router.push("/tip") : router.back();
        } else {
          dispatch(
            alertChange({
              open: true,
              message: latinToCyrillic(res.message),
              status: "error",
            })
          );
        }
      })
      .catch((error) =>
        dispatch(
          alertChange({
            open: true,
            message: error,
            status: "error",
          })
        )
      );
  };
  const handleChange = (e: any) => {
    setCreateInp({ ...createInp, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={saqlsh} className="w-full mt-6 flex flex-col gap-4">
      <div className="flex w-full justify-between">
        <div className="flex gap-4 items-center">
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            color="success"
            startIcon={<CloudUploadIcon />}
          >
            {latinToCyrillic("Exel file yuklash")}
            <VisuallyHiddenInput
              type="file"
              hidden
              accept=".xlsx,.xls"
              onChange={handleFileChange}
            />
          </Button>
          {file && (
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="secondary"
            >
              {latinToCyrillic("Fileni Yuklash")}
            </Button>
          )}
        </div>
        <Button type="submit" variant="contained">
          {latinToCyrillic("Qo'shish")}
        </Button>
      </div>

      <div className="w-full flex justify-between gap-5">
        <TextField
          name="lastname"
          sx={{ width: "33%" }}
          onChange={handleChange}
          id="outlined-basic"
          value={createInp.lastname}
          label={latinToCyrillic("Familyasi")}
          variant="outlined"
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
          name="firstname"
          sx={{ width: "33%" }}
          onChange={handleChange}
          value={createInp.firstname}
          id="outlined-basic"
          label={latinToCyrillic("Ismi")}
          variant="outlined"
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
          name="fatherName"
          sx={{ width: "33%" }}
          onChange={handleChange}
          value={createInp.fatherName}
          id="outlined-basic"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          InputProps={{
            autoComplete: "off",
            autoCorrect: "off",
            spellCheck: "false",
          }}
          label={latinToCyrillic("Sharifi")}
          variant="outlined"
        />
      </div>
    </form>
  );
}

export default CreateFuqaro;
