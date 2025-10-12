import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./app/authSlice.js";
import { authApi } from "./api/authApi.js";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
