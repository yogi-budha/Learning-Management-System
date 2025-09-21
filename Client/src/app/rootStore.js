import { authApi } from "@/features/api/authApi";
import { authSlice } from "@/features/authSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    [authApi.reducerPath] : authApi.reducer,
    auth : authSlice    
})

export default rootReducer