import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootStore";
import { authApi } from "@/features/api/authApi";
export const store = configureStore({
        reducer:rootReducer,
        middleware:(dM)=>dM().concat(authApi.middleware)

})