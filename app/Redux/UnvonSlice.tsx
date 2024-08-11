import { createSlice } from "@reduxjs/toolkit";

const UnvonSlice = createSlice({
  name: "Unvon",
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
    setModalUnvon: (state, { payload }) => {
      state.modal = payload;
    },
   
  },
});

export const { setModalUnvon } = UnvonSlice.actions;

export default UnvonSlice.reducer;
