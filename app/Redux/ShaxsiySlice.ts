import { createSlice } from "@reduxjs/toolkit";

const ShaxsiySlice = createSlice({
  name: "Shaxsiy",
  initialState: {
    modal: false,
    userModal: {
      open: false,
      name: "",
    },
    alert: {
      open: false,
      message: "",
      status: "error",
    },
  },
  reducers: {
    setModalShaxsiy: (state, { payload }) => {
      state.modal = payload;
    },
    alertChange: (state, { payload }) => {
      state.alert = payload;
    },
    alertClose: (state, { payload }) => {
      state.alert.open = payload;
    },
    setUserModal: (state, { payload }) => {
      state.userModal = payload;
    },
  },
});

export const { setModalShaxsiy, alertChange, alertClose,setUserModal } =
  ShaxsiySlice.actions;

export default ShaxsiySlice.reducer;
