import { createSlice } from "@reduxjs/toolkit";

const LovozimSlice = createSlice({
  name: "Lavozim",
  initialState: {
    modal: {
      type: 0,
      open: false,
      id: 0,
      name: "",
      koefsent: "",
    },

    modal2: {
      type: 0,
      open: false,
      id: 0,
      name: "",
      koefsent: "",
    },
  },
  reducers: {
    setModalLavozim: (state, { payload }) => {
      state.modal = payload;
    },
    setModalShowWorker: (state, { payload }) => {
      state.modal2 = payload;
    },
  },
});

export const { setModalLavozim, setModalShowWorker } = LovozimSlice.actions;

export default LovozimSlice.reducer;
