import { createSlice } from "@reduxjs/toolkit";

const folderSlice = createSlice({
  name: "folder",
  initialState: {
    modal: { open: false, status: "create" },
    activePath: {
      id: null,
      name: "",
    },
    all: 0,
  },
  reducers: {
    cahngeModal: (state, { payload }) => {
      state.modal = payload;
    },
    setActivePath: (state, { payload }) => {
      state.activePath = payload;
    },
    setAll: (state, { payload }) => {
      state.all = state.all + payload;
    },
  },
});

export const { cahngeModal, setActivePath, setAll } = folderSlice.actions;

export default folderSlice.reducer;
