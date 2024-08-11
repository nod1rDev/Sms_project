"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { IconButton, TablePagination } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import { filterWorker, getWorkerInfo } from "@/app/Api/Apis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { alertChange } from "@/app/Redux/ShaxsiySlice";
import TadbirCard from "./Components/TadbirCard";
import { formatNumber } from "@/app/Utils";

const Page = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>([]);
  const [workers, setWorkers] = useState([]);
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [shartnomalar, setShartnomalar] = useState([]);
  const [summa, setSumma] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [search, setSearch] = useState(false);
  const [worker, setWorker] = useState<any>();
  const [value, setValue] = useState<any>({
    date1: "",
    date2: "",
  });

  function formatDateToDDMMYYYY(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() 0-indexed
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  useEffect(() => {
    const date = new Date();
    const filtDate = formatDateToDDMMYYYY(date);
    setValue({ date1: filtDate, date2: filtDate });
  }, []);

  const getAllContract = async () => {
    const res = await getWorkerInfo(JWT, id);

    setSumma(res.allmoney);
    setWorker(`${res.worker[0].fio} `);

    setData(res);
    setShartnomalar(res.data);
  };
  useEffect(() => {
    getAllContract();
  }, []);
  const getSearchData = async () => {
    const res = await filterWorker(JWT, id, value);

    setSumma(res.allmoney);

    setData(res);
    setShartnomalar(res.data);
  };
  const router = useRouter();
  const searchData = () => {
    setSearch(!search);
    if (!search) {
      getSearchData();
    } else {
      getAllContract();
    }
  };

  const handleChangeValue = (e: any) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const admin = useSelector((e: any) => e.auth.admin);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    getAllContract();
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className="w-[80%] flex flex-col mt-6 mx-auto">
        <h1 className="flex justify-center font-bold mb-4 text-[32px]">
          {worker && worker}
        </h1>
        <div className="flex mb-5 justify-start">
          <Button
            startIcon={<ArrowBackIcon />}
            color="info"
            variant="contained"
            onClick={() => (!admin ? router.push("/tip") : router.back())}
          >
            {"орқага"}
          </Button>
        </div>

        <div className="flex w-full justify-between mb-10">
          <div className="flex flex-col">
            <h1 className="text-[28px]  font-bold">
              {latinToCyrillic("Tadbirlardan oladigan maoshi")}
            </h1>
            <span className=" text-red-500 ml-3  font-bold">
              {formatNumber(summa) + " " + latinToCyrillic("sum")}
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex  items-center gap-4">
              <TextField
                id="date1"
                label={latinToCyrillic("Sana 1")}
                sx={{ width: "200px" }}
                onChange={handleChangeValue}
                variant="outlined"
                value={value.date1}
                name="date1"
                autoComplete="off"
              />

              <TextField
                id="date2"
                label={latinToCyrillic("Sana 2")}
                sx={{ width: "200px" }}
                onChange={handleChangeValue}
                variant="outlined"
                value={value.date2}
                name="date2"
                autoComplete="off"
              />

              {search ? (
                <IconButton
                  size="large"
                  sx={{ width: "60px", height: "60px" }}
                  aria-label="delete"
                  onClick={searchData}
                >
                  <CloseIcon fontSize="inherit" color="error" />
                </IconButton>
              ) : (
                <IconButton
                  size="large"
                  sx={{ width: "60px", height: "60px" }}
                  aria-label="delete"
                  onClick={searchData}
                >
                  <SearchIcon fontSize="inherit" color="info" />
                </IconButton>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {shartnomalar &&
            shartnomalar.map((e: any) => <TadbirCard data={e} />)}
        </div>
      </div>
    </>
  );
};

export default Page;
