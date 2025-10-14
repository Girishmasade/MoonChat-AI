import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./app/authSlice.js";
import { authApi } from "./api/authApi.js";
import { aiChatApi } from "./api/aiChatApi.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [aiChatApi.reducerPath]: aiChatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(authApi.middleware)
  .concat(aiChatApi.middleware)
  ,
});
