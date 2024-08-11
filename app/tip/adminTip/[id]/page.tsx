"use client";
import React, { useEffect, useState } from "react";
import { TextField, IconButton, Button } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import {
  deleteWorker,
  getAllBatalyon,
  getAllWorkers,
  getExcelWorker2,
  searchWorker,
  updateWorker,
} from "@/app/Api/Apis";
import { useSelector, useDispatch } from "react-redux";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { setModalTip } from "@/app/Redux/TipSlice";
import { useParams, useRouter } from "next/navigation";
import { latinToCyrillic } from "../../add/Components/lotin";
import TipTab from "../../Components/TipTab";
import TipModal from "@/app/Components/ExitModal";
import AdminTab from "../../Components/AdminTab";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

function Page() {
  const { id } = useParams();
  const admin = useSelector((s: any) => s.auth.admin);
  const dispatch = useDispatch();
  const JWT = useSelector((s: any) => s.auth.JWT);

  const savedPage = parseInt(sessionStorage.getItem("page") || "0", 10);
  const savedRowsPerPage = parseInt(
    sessionStorage.getItem("rowsPerPage") || "100",
    10
  );

  const [page, setPage] = useState(savedPage);
  const [rowsPerPage, setRowsPerPage] = useState(savedRowsPerPage);
  const [batalyon, setBatalyon] = useState<any>({ username: "", id: 0 });
  const batID = useSelector((s: any) => s.tip.batalyon);
  const [allRanks, setAllRanks] = useState<any[]>([]);
  const [filteredRanks, setFilteredRanks] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [searchStatus, setSearchStatus] = useState(false);
  const [selector, setSelector] = useState([]);
  const open = useSelector((s: any) => s.tip.modal);
  const [value, setValue] = useState<any>({});
  const [change, setChange] = useState(1);
  const router = useRouter();
  const [data, setData] = useState<any>();

  useEffect(() => {
    setBatalyon(batID);
  }, [batID.id]);

  const getAllRanks = async () => {
    const pagiInfo: any =
      typeof sessionStorage !== "undefined"
        ? sessionStorage.getItem("page")
        : "0";

    const res = await getAllWorkers(JWT, id, +pagiInfo + 1, rowsPerPage);

    setData(res);
    setAllRanks(res.data);
    setFilteredRanks(res.data);
  };

  useEffect(() => {
    if (searchStatus) {
      searchWorkerByName(search);
    } else {
      getAllRanks();
    }
  }, [page, rowsPerPage, searchStatus]);

  const deleteUnvon = async () => {
    const res = await deleteWorker(JWT, open.id);
    if (res.success) {
      handleClose();
      dispatch(
        alertChange({
          open: true,
          message: open.name + " " + latinToCyrillic("o'chirildi"),
          status: "success",
        })
      );
      getAllRanks();
    } else {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic(res.message),
          status: "error",
        })
      );
    }
  };

  const deleteAllRanks = () => {
    deleteUnvon();
  };

  const EditUnvon = async (value: any) => {
    const res = await updateWorker(JWT, open.id, value);
    if (res.success) {
      handleClose();
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("FIO tahrirlandi"),
          status: "success",
        })
      );
      getAllRanks();
    } else {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic(res.message),
          status: "error",
        })
      );
    }
  };

  function splitFIO(fio: string) {
    const parts = fio?.split(" ");
    return {
      lastname: parts[0],
      firstname: parts[1],
      fatherName: parts[2],
    };
  }

  useEffect(() => {
    const { lastname, firstname, fatherName } = splitFIO(open.FIO);
    setValue({
      lastname: lastname,
      firstname: firstname,
      fatherName: fatherName,
      batalyon: open.batalyon,
    });
  }, [open.open]);

  const handleSubmit = () => {
    if (value.firstname) {
      EditUnvon(value);
    } else {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Malumotlarni to'liq to'ldiring!"),
          status: "warning",
        })
      );
    }
  };

  const handleClose = () => {
    dispatch(
      setModalTip({
        type: 0,
        open: false,
        id: 0,
        name: "",
        FIO: "Bekzod Abdullayev Ibrohimovich",
      })
    );
  };

  const searchWorkerByName = async (value: string) => {
    const res = await searchWorker(JWT, value);
    console.log(res);

    if (!res.success) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic(res.message),
          status: "error",
        })
      );
    } else {
      setAllRanks(res.data);
      setFilteredRanks(res.data);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchStatus(true);
    searchWorkerByName(search);
  };

  const clearSearch = () => {
    setSearchStatus(false);

    getAllRanks(); // Qidiruv matni tozalanganda filtrlangan natijalarni o'chirish
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    sessionStorage.setItem("page", newPage.toString());
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = +event.target.value;
    setRowsPerPage(newRowsPerPage);
    sessionStorage.setItem("rowsPerPage", newRowsPerPage.toString());
  };

  const getBatalyons = async () => {
    const res = await getAllBatalyon(JWT);
    setSelector(res.data);
  };

  useEffect(() => {
    getBatalyons();
  }, []);

  const handleSelect = (e: any) => {
    setBatalyon(e.target.value);
  };

  const downloadExcel = async () => {
    try {
      const excelBlob = await getExcelWorker2(JWT, id);
      const url = window.URL.createObjectURL(excelBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "excel_file.xlsx"; // Yuklab olinadigan fayl nomi
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

  return (
    <>
      <div className="flex gap-4 relative max-w-[95%] mx-auto pt-5 flex-col">
        <div className="flex justify-between">
          <Button
            onClick={() => router.push("/tip/batalyon")}
            color="success"
            variant="contained"
          >
            {latinToCyrillic("Orqaga")}
          </Button>
          <Button
            onClick={downloadExcel}
            startIcon={<CloudDownloadIcon />}
            variant="contained"
            color="success"
          >
            {"Excel"}
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <form onSubmit={handleSearch} className="flex items-center">
              <TextField
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                label={latinToCyrillic("FIO orqali qidiring")}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                InputProps={{
                  autoComplete: "off",
                  autoCorrect: "off",
                  spellCheck: "false",
                }}
              />
            </form>
            {searchStatus ? (
              <IconButton type="button" size="large" onClick={clearSearch}>
                <CloseIcon fontSize="inherit" color="error" />
              </IconButton>
            ) : (
              <IconButton size="large" onClick={handleSearch}>
                <PersonSearchIcon fontSize="inherit" color="info" />
              </IconButton>
            )}
          </div>
        </div>
        <TipTab
          data={data}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          rowsPerPage={rowsPerPage}
          ranks={filteredRanks}
        />
        {open.open ? (
          <TipModal
            handleDelete={deleteAllRanks}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            value={value}
            setValue={setValue}
          />
        ) : null}
      </div>
    </>
  );
}

export default Page;
