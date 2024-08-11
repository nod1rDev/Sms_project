import { createSlice } from "@reduxjs/toolkit";
const locationSlice = createSlice({
  name: "location",
  initialState: {
    modal: { type: 0, open: false, id: 0, name: "", },
  },
  reducers: {
    setModalLocation: (state, { payload }) => {
      state.modal = payload;
    },
  },
});

export const { setModalLocation } = locationSlice.actions;
export default locationSlice.reducer;
