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
import { latinToCyrillic } from "../add/Components/lotin";
import { useRouter } from "next/navigation";
import TablePagination from "@mui/material/TablePagination";

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
  id: "number" | "FIO" | "Otryad" | "actions";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "number", label: "т/р", align: "left", minWidth: 5 },
  { id: "FIO", label: latinToCyrillic("FIO"), align: "center", minWidth: 180 },
  {
    id: "Otryad",
    label: latinToCyrillic("Batalyon"),
    minWidth: 180,
    align: "center",
  },
  {
    id: "actions",
    label: latinToCyrillic("Amallar"),
    minWidth: 150,
    align: "right",
  },
];

interface Data {
  number: any;
  FIO: any;
  Otryad: any;
  actions: any;
  id: number;
}

function createData(
  number: any,
  FIO: any,
  Otryad: any,
  actions: any,
  id: number
): Data {
  return { number, FIO, Otryad, actions, id };
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
  const rows = ranks.map((e: any, i: any) =>
    createData(page + 1 * rowsPerPage + i + 1, e.fio, e.username, null, e.id)
  );

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
      <TableContainer sx={{ overflow: "auto", maxHeight: "78vh" }}>
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
                        ) : e === 3 ? (
                          <>
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(
                                  setModalTip({
                                    type: 1,
                                    open: true,
                                    id: row.id,
                                    name: row.FIO,
                                    FIO: row.FIO,
                                    batalyon: row.Otryad,
                                  })
                                );
                              }}
                              aria-label="edit"
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
      <TablePagination
        rowsPerPageOptions={[10, 20, 100, 200]}
        component="div"
        count={data ? data.count : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
