"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import {
  ForCheked,
  URL,
  getAllClients,
  getAllWorkers2,
  getByTask,
  pushWorkers,
} from "@/app/Api/Apis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { changeReload } from "@/app/Redux/AuthSlice";
import { ListItemText, CircularProgress, Backdrop } from "@mui/material";
import { setModalCoctav } from "@/app/Redux/CoctavsSlice";
import SendModal from "./SendModal";
import { styled } from "@mui/material/styles";
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
interface Worker {
  FIO: string;
  selected: boolean;
  summa: string;

  _id: string;
}

interface Task {
  id: string;
  inprogress: boolean;
}

const Send: React.FC = () => {
  const [data, setData] = useState<Task | null>(null);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [filteredWorkers, setFilteredWorkers] = useState<Worker[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const JWT = useSelector((state: any) => state.auth.JWT);
  const [infoData, setInfoData] = useState({
    summa: "",
  });
  const [count, setCount] = useState(true);
  const [sendData, setSendData] = useState();

  const getWorkers = async () => {
    const res = await ForCheked(JWT);

    const filData = res.data.map((e: any) => ({
      FIO: e.username,
      phone: e.phone,
      selected: false,
      summa: "",
      _id: e.id,
    }));
    setWorkers(filData);
    setFilteredWorkers(filData);
  };

  useEffect(() => {
    getWorkers();
  }, []);

  const handleToggle = useCallback((id: string) => {
    setWorkers((prevWorkers) =>
      prevWorkers.map((worker) =>
        worker._id === id ? { ...worker, selected: !worker.selected } : worker
      )
    );
    setFilteredWorkers((prevFiltered) =>
      prevFiltered.map((worker) =>
        worker._id === id ? { ...worker, selected: !worker.selected } : worker
      )
    );
  }, []);

  const dispatch = useDispatch();
  const router = useRouter();

  const createWorker = async (value: any) => {
    setLoading(true);
    const res = await pushWorkers(JWT, value);

    if (res.success) {
      setLoading(false);
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Mijozlarga SMS jonatilindi qo'shildi"),
          status: "success",
        })
      );
      setSendData(res.data);
      dispatch(setModalCoctav({ open: true }));
      getWorkers();
    } else {
      setLoading(false);
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic(res.message),
          status: "error",
        })
      );
    }
  };

  const handleChageInfoData = (e: any, id: any) => {
    setWorkers((prevWorkers) =>
      prevWorkers.map((worker) =>
        worker._id === id ? { ...worker, summa: e.target.value } : worker
      )
    );
    setFilteredWorkers((prevFiltered) =>
      prevFiltered.map((worker) =>
        worker._id === id ? { ...worker, summa: e.target.value } : worker
      )
    );
  };

  const handleSubmit = () => {
    const FiltWorker = workers.filter((e) => e.selected);
    const pureWorker = FiltWorker.map((e) => {
      return {
        id: +e._id,
        summa: +e.summa,
      };
    });

    if (pureWorker.length > 0) {
      createWorker(pureWorker);
    } else {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Hodim tanlang!"),
          status: "warning",
        })
      );
    }
  };

  const handleSelectAll = () => {
    setCount(!count);
    if (count) {
      setWorkers((prevWorkers) =>
        prevWorkers.map((worker) => ({ ...worker, selected: true }))
      );
      setFilteredWorkers((prevFiltered) =>
        prevFiltered.map((worker) => ({
          ...worker,
          selected: true,
        }))
      );
    } else {
      setWorkers((prevWorkers) =>
        prevWorkers.map((worker) => ({ ...worker, selected: false }))
      );
      setFilteredWorkers((prevFiltered) =>
        prevFiltered.map((worker) => ({
          ...worker,
          selected: false,
        }))
      );
    }
  };

  function cyrillicToLatin(input: string): string {
    const map: { [key: string]: string } = {
      А: "A",
      Б: "B",
      В: "V",
      Г: "G",
      Д: "D",
      Е: "E",
      Ё: "Yo",
      Ж: "Zh",
      З: "Z",
      И: "I",
      Й: "Y",
      К: "K",
      Л: "L",
      М: "M",
      Н: "N",
      О: "O",
      П: "P",
      Р: "R",
      С: "S",
      Т: "T",
      У: "U",
      Ф: "F",
      Х: "X",
      Ц: "Ts",
      Ч: "Ch",
      Ш: "Sh",
      Щ: "Shch",
      Ъ: "",
      Ы: "I",
      Ь: "",
      Э: "E",
      Ю: "Yu",
      Я: "Ya",
      а: "a",
      б: "b",
      в: "v",
      г: "g",
      д: "d",
      е: "e",
      ё: "yo",
      ж: "zh",
      з: "z",
      и: "i",
      й: "y",
      к: "k",
      л: "l",
      м: "m",
      н: "n",
      о: "o",
      п: "p",
      р: "r",
      с: "s",
      т: "t",
      у: "u",
      ф: "f",
      х: "x",
      ц: "ts",
      ч: "ch",
      ш: "sh",
      щ: "shch",
      ъ: "",
      ы: "i",
      ь: "",
      э: "e",
      ю: "yu",
      я: "ya",
    };

    return input
      .split("")
      .map((char) => map[char] || char)
      .join("");
  }

  function normalizeText(input: string): string {
    const latinized = checkName(input) ? input : cyrillicToLatin(input);

    const normalized = latinized
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
    return normalized.replace(/[\W_]+/g, "");
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = workers.filter((worker) => {
      const normalizedWorker = normalizeText(worker.FIO);
      const normalizedSearch = normalizeText(search);

      return normalizedWorker.includes(normalizedSearch);
    });

    setFilteredWorkers(filtered);
  };

  const clearSearch = () => {
    setSearch("");
    setFilteredWorkers(workers);
  };

  const memoizedFilteredWorkers = useMemo(
    () => filteredWorkers,
    [filteredWorkers]
  );

  const cyrillicAlphabet = [
    "А",
    "Б",
    "В",
    "Г",
    "Д",
    "Е",
    "Ё",
    "Ж",
    "З",
    "И",
    "Й",
    "К",
    "Л",
    "М",
    "Н",
    "О",
    "П",
    "Р",
    "С",
    "Т",
    "У",
    "Ф",
    "Х",
    "Ц",
    "Ч",
    "Ш",
    "Щ",
    "Ъ",
    "Ы",
    "Ь",
    "Э",
    "Ю",
    "Я",
    "а",
    "б",
    "в",
    "г",
    "д",
    "е",
    "ё",
    "ж",
    "з",
    "и",
    "й",
    "к",
    "л",
    "м",
    "н",
    "о",
    "п",
    "р",
    "с",
    "т",
    "у",
    "ф",
    "х",
    "ц",
    "ч",
    "ш",
    "щ",
    "ъ",
    "ы",
    "ь",
    "э",
    "ю",
    "я",
  ];
  const textToJson = (text: string) => {
    try {
      const jsonObject = JSON.parse(text);
      return jsonObject;
    } catch (error) {
      return { success: false, message: "Invalid JSON format" };
    }
  };
  const isLatin = (char: string): boolean => !cyrillicAlphabet.includes(char);

  const checkName = (name: string): boolean => {
    for (let i = 0; i < name.length; i++) {
      if (!isLatin(name[i])) {
        return false;
      }
    }
    return true;
  };
  const handleClose = () => {
    dispatch(setModalCoctav({ open: false }));
  };
  const [file, setFile] = useState<any>(null);
  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files?.[0];

    setFile(selectedFile);
  };
  interface Obj {
    phone: string;
    selected: boolean;
  }

  function filterUnique(arr: Obj[]): any {
    const result: Obj[] = [];
    const seenPhones = new Set<string>();

    arr.forEach((obj: any) => {
      if (!seenPhones.has(obj._id)) {
        const similarObjs = arr.filter((item: any) => item._id === obj._id);

        if (similarObjs.length > 1) {
          const selectedObj = similarObjs.find((item) => item.selected);
          if (selectedObj) {
            result.push(selectedObj);
          } else {
            result.push(similarObjs[0]); // Agar 'selected: true' yo'q bo'lsa, birinchisini oladi
          }
        } else {
          result.push(obj); // Yagona bo'lsa, o'zini qo'shadi
        }

        seenPhones.add(obj._id);
      }
    });

    return result;
  }

  const handleSubmite = async () => {
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

    fetch(URL + "/sms/import/from/excel", requestOptions)
      .then((response) => response.text())
      .then((result: any) => {
        const res = textToJson(result);
        if (res.success) {
          const filData = res.data.map((e: any) => ({
            FIO: e.username,
            phone: e.phone,
            selected: true,
            summa: e.summa,
            _id: e.id,
          }));

          setWorkers(filterUnique([...workers, ...filData]));
          console.log(filterUnique([...workers, ...filData]));

          setFilteredWorkers(filterUnique([...workers, ...filData]));

          dispatch(
            alertChange({
              open: true,
              message: latinToCyrillic("Exel file kiritildi"),
              status: "success",
            })
          );
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
    <div className="w-[95%] mt-5 flex-col gap-6 mx-auto">
      <div className="max-w-[100%]">
        <div className="flex gap-4 items-center justify-end">
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
              onClick={handleSubmite}
              variant="contained"
              color="secondary"
            >
              {latinToCyrillic("Fileni Yuklash")}
            </Button>
          )}
        </div>
        <div className="flex flex-col pb-5 border-b  gap-3">
          <h1 className="font-bold">{latinToCyrillic("Filter")}</h1>
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-3 w-full"
          >
            <Button variant="contained" color="info" type="submit">
              {latinToCyrillic("Qidirish")}
            </Button>
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              label={latinToCyrillic("Mijoz ismi oraqli qidiring qidiring")}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              InputProps={{
                autoComplete: "off",
                autoCorrect: "off",
                spellCheck: "false",
                endAdornment: search ? (
                  <IconButton onClick={clearSearch}>
                    <CloseIcon color="error" />
                  </IconButton>
                ) : (
                  <IconButton type="submit">
                    <PersonSearchIcon color="info" />
                  </IconButton>
                ),
              }}
            />
          </form>
          <div className="font-bold text-[18px] mt-5 mb-2 flex  justify-between w-full">
            <div className="flex  justify-center gap-2">
              <Checkbox onClick={handleSelectAll} />
              <span className="mt-1">
                {latinToCyrillic("hammasini tanlash")}
              </span>
            </div>
            <span className="">
              {latinToCyrillic("jami ") +
                workers?.filter((e: any) => e.selected).length +
                " " +
                latinToCyrillic("mijoz biriktirildi")}
            </span>
          </div>
          <Button variant="contained" color="info" onClick={handleSubmit}>
            {latinToCyrillic("Jo'natish")}
          </Button>
        </div>

        <List
          sx={{
            width: "100%",
            maxWidth: "100%",
            bgcolor: "background.paper",
          }}
        >
          <div className="flex flex-col gap-4">
            {memoizedFilteredWorkers.map((value: any) => {
              const labelId = `checkbox-list-label-${value._id}`;
              return (
                <ListItem key={value._id} disablePadding>
                  <div className="border-b w-full flex items-center justify-between border-b-[#000] pb-2">
                    <div className="flex justify-center">
                      <ListItemIcon>
                        <Checkbox
                          onClick={() => handleToggle(value._id)}
                          edge="start"
                          checked={value.selected}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <div className="flex mt-2 justify-center">
                        <span className="w-[200px] text-left">{value.FIO}</span>
                        <span className="w-[200px] text-right">
                          {value.phone}
                        </span>
                      </div>
                    </div>
                    <TextField
                      autoComplete="off"
                      label={latinToCyrillic("Summa")}
                      variant="outlined"
                      sx={{ width: 300 }}
                      type="number"
                      name="summa"
                      value={value.summa}
                      onChange={(e) => {
                        handleChageInfoData(e, value._id);
                      }}
                    />
                  </div>
                </ListItem>
              );
            })}
          </div>
        </List>
      </div>
      <SendModal data={sendData} handleClose={handleClose} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Send;
