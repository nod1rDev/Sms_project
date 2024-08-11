import { createSlice } from "@reduxjs/toolkit";

const fileSliceUnique = createSlice({
  name: "fileSliceUnique",
  initialState: {
    modal: {
      type: 0,
      open: false,
      id: 0,
      name: "",
      selectPosition: "",
      selectPercent: "",
      selectSalary: "",
      selectRegion: "",
      selectCoctav: "",
      selectTip: "",
      selectStavka: "",
    },

    changeScren: 0,
  },
  reducers: {
    setModalFile: (state, { payload }) => {
      state.modal = payload;
    },
    changeSceren: (state, { payload }) => {
      state.changeScren = payload;
    },
  },
});

export const { setModalFile, changeSceren } = fileSliceUnique.actions;
export default fileSliceUnique.reducer;
