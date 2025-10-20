import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("selectedUser");

const initialState = {
  selectedUser: savedUser ? JSON.parse(savedUser) : null,
  clearChats: [], 
  onlineUsers: []
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      localStorage.setItem("selectedUser", JSON.stringify(action.payload));
    },

    setClearSelectedUser: (state) => {
      state.selectedUser = null;
      state.clearChats = [];
      localStorage.removeItem("selectedUser"); 
    },

    setOnlineusers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setSelectedUser, setClearSelectedUser, setOnlineusers } =
  chatSlice.actions;

export default chatSlice.reducer;
