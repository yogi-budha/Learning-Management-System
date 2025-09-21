import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { userLoggedIn } from '../authSlice'

export const authApi = createApi({
    reducerPath : 'authApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl:'http://localhost:5000/api/user/',
            credentials:"include"
            
        }
    ),
    endpoints:(builder)=>({
        userSignup : builder.mutation({
            query: (inputData)=>({
                url:'register',
                method:"POST",
                body:inputData
            }),
            providesTags:"user",
            invalidatesTags:"user",
        }),
        userLogin : builder.mutation({
            query: (inputData)=>({
                url:'login',
                method:"POST",
                body:inputData
            }),     
            providesTags:"user",
            invalidatesTags:"user",
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try {
                    const result = await queryFulfilled
                    console.log(result)
                    dispatch(userLoggedIn({user:result.data.user}))
                } catch (error) {
                    console.log(error)
                    
                }
            }
        })
    })
})

export const {useUserLoginMutation,useUserSignupMutation} = authApi