import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { useDispatch, useSelector } from "react-redux";
import { setBatalyon } from "@/app/Redux/TipSlice";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { latinToCyrillic } from "../add/Components/lotin";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { URL, cleintExcel } from "@/app/Api/Apis";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
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
export default function MenuBatalyon({ data }: { data: any }) {
  const itemData = data || []; // To handle if data is undefined
  const dispatch = useDispatch();
  const router = useRouter();
  const handleClick = (item: any) => {
    dispatch(setBatalyon(item));
    sessionStorage.setItem("batalyonId", item.id);
    router.push("/tip/" + item.id);
  };
  const JWT = useSelector((s: any) => s.auth.JWT);
  const downloadExcel = async () => {
    try {
      const excelBlob = await cleintExcel(JWT);
      const url = window.URL.createObjectURL(excelBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "excel_file.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Excel file yuklandi"),
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Excel faylini yuklashda xatolik"),
          status: "error",
        })
      );
    }
  };
  const [file, setFile] = React.useState<any>(null);
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

    fetch(URL + "/client/import/excel", requestOptions)
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

          location.reload();
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
  return (
    <>
      <div className="flex justify-end mt-10 mr-10">
        <div className="flex justify-between gap-10">
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
          <Button
            onClick={downloadExcel}
            startIcon={<CloudDownloadIcon />}
            variant="contained"
            color="info"
          >
            {"Excel"}
          </Button>
        </div>
      </div>
      <h1 className="text-[28px] mt-10 font-bold mx-auto text-center mb-4">
        {latinToCyrillic("Tuman tanlang")}
      </h1>

      <div className="w-[80%] mb-10 mx-auto flex flex-col gap-4">
        {itemData.map((item: any, index: number) => (
          <button
            key={index}
            onClick={() => handleClick(item)}
            className={`flex gap-6 justify-center items-center px-4 w-full  py-12 rounded-xl transition-all duration-300 bg-[#1976D2] text-white hover:bg-[#fff] hover:text-[#1976D2] hover:scale-105`}
          >
            <h1 className="text-[20px] font-bold text-center">{item.name}</h1>
          </button>
        ))}
      </div>
    </>
  );
}
