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

import TipTab from "../../Components/TipTab";


import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import TipModal from "../../Components/TipModal";

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

    const res = await getAllWorkers(JWT, id);

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

  return (
    <>
      <div className="flex gap-4 relative max-w-[95%] mx-auto pt-5 flex-col">
        <div className="flex justify-between">
          <Button
            onClick={() => router.back()}
            color="success"
            variant="contained"
          >
            {latinToCyrillic("Orqaga")}
          </Button>
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
