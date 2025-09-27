import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootStore";
import { authApi } from "@/features/api/authApi";
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
