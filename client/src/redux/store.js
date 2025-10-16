import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./app/authSlice.js";
import { apiSlice } from "./app/apiSlice.js";
import chatReducer from './app/chatSlice.js'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(apiSlice.middleware),
});
