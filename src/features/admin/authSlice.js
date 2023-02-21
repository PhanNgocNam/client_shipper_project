import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  refreshToken: "",
};

const authSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loggin: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
});

export default authSlice.reducer;
export const { loggin, logout } = authSlice.actions;
