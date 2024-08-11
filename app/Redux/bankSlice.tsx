import { createSlice } from "@reduxjs/toolkit";
const bankSlice = createSlice({
  name: "Bank",
  initialState: {
    modal: {
      type: 0,
      open: false,
      id: 0,
      name: "",
      summa: "",
    },
  },
  reducers: {
    setModalBank: (state, { payload }) => {
      state.modal = payload;
    },
  },
});
export const { setModalBank } = bankSlice.actions;
export default bankSlice.reducer;
