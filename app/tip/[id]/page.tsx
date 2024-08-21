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
import Tip from "../Components/Tip";

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
      <div className="mt-5 ml-10">
        <Button
          onClick={() => router.push("/tip")}
          color="info"
          variant="contained"
        >
          {latinToCyrillic("Orqaga")}
        </Button>
      </div>
      <Tip id={id} />
    </>
  );
};

export default Page;
