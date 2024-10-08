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
  id: "number" | "FIO" | "Phone" | "summa" | "actions";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "number", label: "т/р", align: "left", minWidth: 5 },

  {
    id: "FIO",
    label: latinToCyrillic("Mijoz Ismi"),
    align: "left",
    minWidth: 140,
  },
  {
    id: "Phone",
    label: latinToCyrillic("Telefon Raqami"),
    align: "center",
    minWidth: 150,
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
  FIO: any;
  Phone: any;

  actions: any;
  id: number;
}

function createData(
  number: any,
  FIO: any,
  Phone: any,

  actions: any,
  id: number
): Data {
  return {
    number,
    FIO,
    Phone,

    actions,
    id,
  };
}

export default function AdminTab({
  data,
  ranks,
  page,
  handleChangePage,
  rowsPerPage,
  handleChangeRowsPerPage,
}: {
  ranks: any;
  data: any;
  page: any;
  handleChangePage: any;
  rowsPerPage: any;
  handleChangeRowsPerPage: any;
}) {
  const rows = ranks
    ? ranks.map((e: any, i: any) =>
        createData(i + 1, e.username, e.phone, null, e.id)
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
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ overflow: "auto", maxHeight: "70vh" }}>
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
                  onClick={() => {
                    otish(row.id);
                  }}
                  role="checkbox"
                  tabIndex={-1}
                  key={i}
                >
                  {columns.map((column, e) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {e == 0 ? (
                          page * rowsPerPage + i + 1
                        ) : e == 3 ? (
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
                                    phone: row.Phone,
                                  })
                                );
                              }}
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
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(
                                  setModalTip({
                                    type: 2,
                                    open: true,
                                    id: row.id,
                                    name: row.FIO,
                                    FIO: row.FIO,
                                    phone: row.Phone,
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
        rowsPerPageOptions={[10, 20, 100, 200, 500]}
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
