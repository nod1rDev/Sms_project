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
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "number", label: "т/р", align: "left", minWidth: 5 },
  { id: "FIO", label: latinToCyrillic("Sana"), align: "center", minWidth: 100 },
  {
    id: "Otryad",
    label: latinToCyrillic("Mijoz Ismi"),
    minWidth: 100,
    align: "center",
  },
  {
    id: "phone",
    label: latinToCyrillic("Telfon Raqami"),
    minWidth: 100,
    align: "center",
  },
  {
    id: "xabar",
    label: latinToCyrillic("SMS xabarni o'qish"),
    minWidth: 100,
    align: "center",
  },
  {
    id: "actions",
    label: latinToCyrillic("Amallar"),
    minWidth: 100,
    align: "right",
  },
];

function createData(
  number: any,
  FIO: any,
  Otryad: any,
  phone: any,
  xabar: any,
  actions: any,
  id: number
): any {
  return { number, FIO, Otryad, phone, xabar, actions, id };
}

export default function TipTab({
  ranks,
  data,
  page,
  handleChangePage,
  rowsPerPage,
  handleChangeRowsPerPage,
}: {
  ranks: any;
  page: any;
  data: any;
  handleChangePage: any;
  rowsPerPage: any;
  handleChangeRowsPerPage: any;
}) {
 

  const rows = ranks
    ? ranks.map((e: any, i: any) =>
        createData(
          page + 1 * rowsPerPage + i + 1,
          e.senddate,
          e.username,
          e.phone,
          e.report,
          null,
          e.id
        )
      )
    : [];

  const dispatch = useDispatch();
  const router = useRouter();
  const admin = useSelector((s: any) => s.auth.admin);

  const otish = (id: any) => {
    if (admin) {
      router.push("/tip/" + id);
    }
  };

  return (
    <Paper sx={{ width: "100%", mb: 10 }}>
      <TableContainer sx={{ overflow: "auto", maxHeight: "88vh" }}>
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
                <TableRow
                  hover
                  onClick={() => otish(row.id)}
                  role="checkbox"
                  tabIndex={-1}
                  key={i}
                >
                  {columns.map((column, e) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {e === 0 ? (
                          page * rowsPerPage + i + 1
                        ) : e === 4 ? (
                          <>
                            <Button
                              variant="contained"
                              color="info"
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(
                                  setModalTip({
                                    type: 1,
                                    open: true,
                                    id: row.id,
                                    name: row.FIO,
                                    FIO: row.FIO,
                                    report: row.xabar,
                                  })
                                );
                              }}
                            >
                              {latinToCyrillic("habarni o'qish")}
                            </Button>
                          </>
                        ) : e === 5 ? (
                          <>
                            <IconButton
                              sx={{ ml: 1 }}
                              aria-label="delete"
                              size="medium"
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(
                                  setModalTip({
                                    type: 2,
                                    open: true,
                                    id: row.id,
                                    name: row.FIO,
                                    FIO: row.FIO,
                                  })
                                );
                              }}
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
  );
}
