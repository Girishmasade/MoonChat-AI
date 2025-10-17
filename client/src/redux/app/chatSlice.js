import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("selectedUser");

const initialState = {
  selectedUser: savedUser ? JSON.parse(savedUser) : null,
  clearChats: [], // optional, can track cleared chat state
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      localStorage.setItem("selectedUser", JSON.stringify(action.payload));
    },

    // Clear selected user and/or chats
    clearSelectedUser: (state) => {
      state.selectedUser = null;
      state.clearChats = [];
      localStorage.removeItem("selectedUser"); // fixed typo
    },

    // Optional: track cleared chats (if needed)
    setClearChats: (state, action) => {
      state.clearChats = action.payload;
    },
  },
});

export const { setSelectedUser, clearSelectedUser, setClearChats } =
  chatSlice.actions;

export default chatSlice.reducer;
