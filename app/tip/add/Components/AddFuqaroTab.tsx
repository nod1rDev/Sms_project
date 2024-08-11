"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Select from "@mui/material/Select";
import { styled } from "@mui/system";
import { TextField, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { latinToCyrillic } from "./lotin";
import { ranksData } from "@/app/Utils";

const CustomTableHead = styled(TableHead)(({ theme }) => ({
  "& .MuiTableCell-root": {
    color: "#000",
    fontWeight: "600",
    backgroundColor: "#f1faee",
  },
}));

interface Column {
  id: "number" | "lastname" | "firstname" | "fatherName" | "actions";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
}

const columns: readonly Column[] = [
  { id: "number", label: "т/р", align: "left", minWidth: 5 },

  {
    id: "lastname",
    label: latinToCyrillic("Familyasi"),
    align: "center",
    minWidth: 180,
  },
  {
    id: "firstname",
    label: latinToCyrillic("Familyasi"),
    align: "center",
    minWidth: 180,
  },
  {
    id: "fatherName",
    label: latinToCyrillic("Sharifi"),
    align: "center",
    minWidth: 180,
  },
  {
    id: "actions",
    label: latinToCyrillic("Amallar"),
    minWidth: 100,
    align: "right",
  },
];

interface Data {
  number: any;
  lastname: any;

  firstname: any;
  fatherName: any;
  actions: any;
  id: number;
}

function createData(
  number: any,
  lastname: any,

  firstname: any,
  fatherName: any,
  actions: any,
  id: number
): Data {
  return { number, lastname, firstname, fatherName, actions, id };
}

export default function AddFuqaroTab({
  ranks,
  setData,
}: {
  ranks: any;
  setData: any;
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] =
    React.useState(100000000000000000000000000);
  const [latinText, setLatinText] = useState("");
  const [active, setActive] = useState<number | null>(null);
  const [select, setSelect] = useState<any>();
  const JWT = useSelector((state: any) => state.auth.JWT);



  const handleLatinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLatinText(value);
    if (active !== null) {
      setData((prevData: any) =>
        prevData.map((item: any) =>
          item._id === active ? { ...item, [e.target.name]: value } : item
        )
      );
    }
  };

  const rows = ranks
    ? ranks.map((e: any, i: number) =>
        createData(i + 1, e.lastname, e.firstname, e.fatherName, null, e._id)
      )
    : [];

  const handleTwo = (event: any) => {
    const { name, value } = event.target;
    if (active !== null) {
      setData((prevData: any) =>
        prevData.map((item: any) =>
          item._id === active ? { ...item, [name]: value } : item
        )
      );
    }
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ overflow: "auto", maxHeight: "70vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <CustomTableHead>
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
          </CustomTableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, i: any) => (
                <TableRow
                  hover
                  onClick={() => setActive(row.id)}
                  role="checkbox"
                  tabIndex={-1}
                  key={i}
                >
                  {columns.map((column, index) => {
                    const value = row[column.id];

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {index === 0 ? (
                          i + 1
                        ) : index === 2 ? (
                          <div className="flex w-full items-center justify-between gap-3">
                            <TextField
                              value={row.firstname}
                              onChange={handleLatinChange}
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
                          </div>
                        ) : index === 1 ? (
                          <div className="flex w-full items-center justify-between gap-3">
                            <TextField
                              value={row.lastname}
                              onChange={handleLatinChange}
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
                          </div>
                        ) : index === 3 ? (
                          <div className="flex w-full items-center justify-between gap-3">
                            <TextField
                              value={row.fatherName}
                              onChange={handleLatinChange}
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
                        ) : index === 4 ? (
                          <IconButton
                            onClick={() => {
                              setData((prevData: any) =>
                                prevData.filter((_: any, idx: any) => idx !== i)
                              );
                            }}
                          >
                            <RemoveCircleOutlineIcon color="error" />
                          </IconButton>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
