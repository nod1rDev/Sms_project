import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    JWT:
      typeof sessionStorage !== "undefined"
        ? sessionStorage.getItem("token")
        : "out",
    user: null,
    id: 0,
    admin: false,
    relaod: 1,
    loading: false,
  },
  reducers: {
    puJWT: (state, { payload }) => {
      state.JWT = payload;
    },
    setUser: (state, { payload }) => {
      state.admin = payload.data?.adminstatus;

      state.user = payload;
    },
    changeAdminStatuss: (state, { payload }) => {
      state.admin = payload;
    },
    changeReload: (state, { payload }) => {
      state.relaod = state.relaod + payload;
    },
    setLoadingg: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const { puJWT, setUser, changeAdminStatuss, changeReload,setLoadingg } =
  AuthSlice.actions;

export default AuthSlice.reducer;
