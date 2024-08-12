import { createSlice } from "@reduxjs/toolkit";
const coctavSlice = createSlice({
  name: "Coctav",
  initialState: {
    modal: { type: 0, open: false, id: 0, name: "salom" },
  },

  reducers: {
    setModalCoctav: (state, { payload }) => {
      state.modal = payload;
    },
  },
});

export const { setModalCoctav } = coctavSlice.actions;
export default coctavSlice.reducer;
