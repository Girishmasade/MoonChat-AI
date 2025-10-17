import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("selectedUser");

const initialState = {
  selectedUser: savedUser ? JSON.parse(savedUser) : null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,

  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      localStorage.setItem("selectedUser", JSON.stringify(action.payload));
    },
  },
});

export const { setSelectedUser } = chatSlice.actions;
export default chatSlice.reducer;
