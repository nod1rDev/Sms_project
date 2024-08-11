import { createSlice } from "@reduxjs/toolkit";

const TipSlice = createSlice({
  name: "TIP",
  initialState: {
    modal: {
      type: 0,
      open: false,
      id: 0,
      name: "",
      FIO: "Bekzod Abdullayev Ibrohimovich",
    },
    modal2: { open: false, shartnomaId: 0, organId: 0, sana: "" },
    batalyon: { username: "", id: 2 },
  },
  reducers: {
    setModalTip: (state, { payload }) => {
      state.modal = payload;
    },
    setModalBitta: (state, { payload }) => {
      state.modal2 = payload;
    },
    setBatalyon: (state, { payload }) => {
      state.batalyon = payload;
    },
  },
});

export const { setModalTip, setModalBitta, setBatalyon } = TipSlice.actions;

export default TipSlice.reducer;
