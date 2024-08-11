import { createSlice } from "@reduxjs/toolkit";
const coctavSlice = createSlice({
  name: "Coctav",
  initialState: {
    modal: { type: 0, open: false, id: 0, name: "salom" },
    modalN1: { type: 0, open: false, id: 0, name: "salom" },
  },

  reducers: {
    setModalCoctav: (state, { payload }) => {
      state.modal = payload;
    },
    setModalN1: (state, { payload }) => {
      state.modalN1 = payload;
    },
  },
});

export const { setModalCoctav,setModalN1 } = coctavSlice.actions;
export default coctavSlice.reducer;
