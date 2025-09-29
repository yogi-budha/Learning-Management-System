import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootStore";
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,courseApi.middleware),
});


const initializeApp = async ()=>{
  await store.dispatch(authApi.endpoints.getUser.initiate({},{forceRefetch:true}))
}

initializeApp()