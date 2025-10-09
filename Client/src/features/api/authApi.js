import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { userLoggedIn } from '../authSlice'
// import { userLoggedIn } from '../authSlice'

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
                    dispatch(userLoggedIn({user:result.data.user}))
                } catch (error) {
                    console.log(error)
                    
                }
            }
        }),
        getUser:builder.query({
            query:()=>({
                url:"getUser",
                method:"GET"
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try {
                    const result = await queryFulfilled
                    dispatch(userLoggedIn({user:result.data.user}))
                } catch (error) {
                    console.log(error)
                    
                }
            }
        }),
        logoutUser:builder.mutation({
            query:()=>({
                url:"logout",
                method:"POST"
            })
        }),
        updateUser:builder.mutation({
            query:(data)=>({
                url:"updateUser",
                method:"PUT",
                body:data
            })
        }),
    })
})

export const {useUserLoginMutation,useUserSignupMutation,useGetUserQuery,useLogoutUserMutation,useUpdateUserMutation} = authApi