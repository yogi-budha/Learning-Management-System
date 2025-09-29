import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
import authReducer from "@/features/authSlice";   
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth:authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
});

export default rootReducer;
