import { createSlice } from "@reduxjs/toolkit";

const storageSlice = createSlice({
  name: "storageSlice",
  initialState: {
    shahar: { open: false, id: 0, name: "" },
    boshliq: { open: false, id: 0, name: "" },
    manzil: { open: false, id: 0, name: "" },
    bank: { open: false, id: 0, name: "" },
    Mfo: { open: false, id: 0, name: "" },
    str: { open: false, id: 0, name: "" },
  },
  reducers: {
    setModalShahar: (state, { payload }) => {
      state.shahar = payload;
    },
    setModalboshliq: (state, { payload }) => {
      state.boshliq = payload;
    },
    setModalManzil: (state, { payload }) => {
      state.manzil = payload;
    },
    setModalBank: (state, { payload }) => {
      state.bank = payload;
    },
    setModalMfo: (state, { payload }) => {
      state.Mfo = payload;
    },
    setModalstr: (state, { payload }) => {
      state.str = payload;
    },
  },
});
export const {
  setModalShahar,
  setModalboshliq,
  setModalManzil,
  setModalBank,
  setModalMfo,
  setModalstr,
} = storageSlice.actions;
export default storageSlice.reducer;
