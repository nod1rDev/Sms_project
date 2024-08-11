import { createSlice } from "@reduxjs/toolkit";

const namesSlice = createSlice({
  name: "names",
  initialState: { modal: false },
  reducers: {
    setModalRaxbar: (state, { payload }) => {
      state.modal = payload;
    },
  },
});
export const { setModalRaxbar } = namesSlice.actions;
export default namesSlice.reducer;
