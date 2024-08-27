"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { setModalTip } from "@/app/Redux/TipSlice";
import { styled } from "@mui/system";

import { useRouter } from "next/navigation";
import TablePagination from "@mui/material/TablePagination";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import { Button } from "@mui/material";

const CustomTableHead = styled(TableHead)(({ theme }) => ({
  // Asosiy rang
  "& .MuiTableCell-root": {
    color: "#000",
    fontWeight: "600",
    backgroundColor: "#f1faee",
    // Matn rangini o'zgartirish
  },
}));

interface Column {
  id: "number" | "FIO" | "Otryad" | "phone" | "xabar" | "actions";
  label: string;
  minWidth?: number | string;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: "number",
    label: latinToCyrillic("t/r"),
    align: "left",
    minWidth: "10%",
  },
  {
    id: "FIO",
    label: latinToCyrillic("Mijoz Ismi"),
    align: "center",
    minWidth: "30%",
  },
  {
    id: "Otryad",
    label: latinToCyrillic("Telfon Raqami"),
    align: "center",
    minWidth: "30%",
  },
  {
    id: "phone",
    label: latinToCyrillic("Status"),
    align: "right",
    minWidth: "30%",
  },
];

function createData(number: any, FIO: any, Otryad: any, phone: any): any {
  return { number, FIO, Otryad, phone };
}

export default function SendTab({ ranks }: { ranks: any }) {
  const rows = ranks.map((e: any, i: any) =>
    createData(i + 1, e.username, e.phone, e.success)
  );

  return (
    <Paper sx={{ width: "100%", mb: 10 }}>
      <TableContainer sx={{ overflow: "auto", maxHeight: "90vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <CustomTableHead sx={{ background: "#edede9" }}>
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
            {rows.map((row: any, i: any) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                  {columns.map((column, e) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {e == 3 ? (
                          <div
                            className={`w-[140px] h-[40px] text-white flex justify-center items-center ml-[60%] rounded-xl ${
                              row.phone ? "bg-green-600" : "bg-red-600"
                            }`}
                          >
                            {row.phone
                              ? latinToCyrillic("Jonailtdi")
                              : latinToCyrillic("Jonatilmadi")}
                          </div>
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
  );
}
