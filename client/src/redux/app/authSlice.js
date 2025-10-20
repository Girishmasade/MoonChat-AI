import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials: (state, action) => {
        const {data} = action.payload;
        state.user = data.user;
        state.token = data.token

        localStorage.setItem("userInfo", JSON.stringify(data.user))
        localStorage.setItem("token", data.token)
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
