import { authApi } from "@/features/api/authApi";
import { authSlice } from "@/features/authSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export default rootReducer;
