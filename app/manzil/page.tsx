"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, TextField, FormHelperText } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  createAcount,
  createAuth,
  createBoshliq,
  createManzil,
  createShahar,
  deleteAcount,
  deleteBoshliq,
  deleteManzil,
  deleteShahar,
  getAllAcount,
  getAllBoshliq,
  getAllManzil,
  getAllShahar,
  getAuth,
  updateAcount,
  updateBatalyon,
  updateBoshliq,
  updateManzil,
  updateShahar,
} from "@/app/Api/Apis";
import { alertChange, setUserModal } from "@/app/Redux/ShaxsiySlice";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin"; // Correct import
import { setModalCoctav } from "../Redux/CoctavsSlice";
import CoctavModal from "./Components/CoctavModal";

import { setModalManzil, setModalboshliq } from "../Redux/storageSlice";

interface Column {
  id: "number" | "FoydalanuvchiNomi" | "nima" | "actions";
  label: string;
  minWidth?: number | string;
  align?: "left" | "center" | "right";
  flex?: number;
  positsion?: string;
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "number", label: latinToCyrillic("Tuman id"), align: "left", minWidth: 10 },
  {
    id: "FoydalanuvchiNomi",
    label: latinToCyrillic("Tuman"),
    align: "left",
    minWidth: 900,
  },

  {
    id: "actions",
    label: latinToCyrillic("Amallar"),
    minWidth: 170,
    align: "right",
  },
];

interface Data {
  number: number;
  FoydalanuvchiNomi: string;

  actions: any;
  id: number;
}

function createData(
  number: number,
  FoydalanuvchiNomi: string,

  actions: any,
  id: number
): Data {
  return { number, FoydalanuvchiNomi, actions, id };
}

export default function Page() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] =
    React.useState(100000000000000000000000);
  const [users, setUsers] = React.useState<any>();
  const JWT = useSelector((state: any) => state.auth.JWT);
  const [value, setValue] = React.useState<any>({
    name: "",
  });
  const [value2, setValue2] = React.useState<any>({
    name: "",
  });
  const [accountError, setAccountError] = React.useState<string | null>(null);
  const [remainingChars, setRemainingChars] = React.useState<number>(20);

  const getUsers = async () => {
    const res = await getAllManzil(JWT);

    setUsers(res.data);
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const rows = users
    ? users.map((e: any) => createData(e.id, e.name, null, e.id))
    : [];
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (value.name) {
      const pureVal = {
        name: value.name,
      };
      const res = await createManzil(JWT, pureVal);
      if (res.success) {
        dispatch(
          alertChange({
            open: true,
            message: latinToCyrillic("Manzil qo'shildi"),
            status: "success",
          })
        );
        setValue({ ...value, name: "" });
        getUsers();
      } else {
        dispatch(
          alertChange({
            open: true,
            message: latinToCyrillic(res.message),
            status: "error",
          })
        );
      }
    }
  };

  const handleChange = (e: any) => {
    const newValue = e.target.value;
    setValue({ ...value, [e.target.name]: newValue });
  };

  const handleClose = () => {
    dispatch(setModalManzil({ open: false, name: "" }));
  };

  const open = useSelector((s: any) => s.sto.manzil);

  const updateAuth = async (valuee: any) => {
    const res = await updateManzil(JWT, valuee, +open.id);
    if (res.success) {
      handleClose();
      setValue2({
        name: null,
      });
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Manzil  tahrirlandi"),
          status: "success",
        })
      );
      getUsers();
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

  const handleSubmite = () => {
    if (value2.name !== "") {
      updateAuth(value2);
    } else {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Bosh qatorlarni to'ldiring!"),
          status: "warning",
        })
      );
    }
  };

  const deleteData = async () => {
    const res = await deleteManzil(JWT, +open.id);

    if (res.success) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Manzil ochirildi"),
          status: "success",
        })
      );
      getUsers();
      handleClose();
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

  const handleDelete = () => {
    deleteData();
  };

  React.useEffect(() => {
    setValue2({
      name: open.name,
    });
  }, [open.name]);

  return (
    <>
      <Paper sx={{ width: "95%", mx: "auto", mt: "20px", overflow: "hidden" }}>
        <div className="w-full">
          <h1 className="font-bold text-[18px] mt-2 ml-2">
            {latinToCyrillic("Tuman qo'shing")}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex justify-between items-start gap-4 py-4 px-5"
          >
            <TextField
              id="outlined-basic"
              label={latinToCyrillic("Tuman")}
              value={value.name}
              name="name"
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <Button
              color="primary"
              type="submit"
              sx={{ width: "160px", height: "54px" }}
              variant="contained"
            >
              {latinToCyrillic("Qo'shish")}
            </Button>
          </form>
        </div>
        <TableContainer sx={{ maxHeight: "100%", overflow: "auto" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, i: any) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                      {columns.map((column, e) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {e === 2 ? (
                              <>
                                <IconButton
                                  onClick={() =>
                                    dispatch(
                                      setModalManzil({
                                        type: 1,
                                        open: true,
                                        id: row.id,
                                        name: row.FoydalanuvchiNomi,
                                      })
                                    )
                                  }
                                  aria-label="delete"
                                  size="medium"
                                >
                                  <ModeEditOutlineIcon
                                    fontSize="inherit"
                                    color="info"
                                  />
                                </IconButton>

                                <IconButton
                                  sx={{ ml: 1 }}
                                  aria-label="delete"
                                  size="medium"
                                  onClick={() =>
                                    dispatch(
                                      setModalManzil({
                                        type: 2,
                                        open: true,
                                        id: row.id,
                                        name: row.FoydalanuvchiNomi,
                                      })
                                    )
                                  }
                                >
                                  <RemoveCircleOutlineIcon
                                    fontSize="inherit"
                                    color="error"
                                  />
                                </IconButton>
                              </>
                            ) : column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <CoctavModal
        handleClose={handleClose}
        handleDelete={handleDelete}
        handleSubmit={handleSubmite}
        value={value2}
        setValue={setValue2}
      />
    </>
  );
}
