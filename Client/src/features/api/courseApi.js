import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const courseApi = createApi({
    reducerPath : 'courseApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl:'http://localhost:5000/api/course/',
            credentials:"include"
            
        }
    ),
    endpoints:(builder)=>({
        createCoursess : builder.mutation({
            query: (inputData)=>({
                url:'create',
                method:"POST",
                body:inputData
            }),
            providesTags:"user",
            invalidatesTags:"user",
        }),
    
        getCourses : builder.query({
            query: ()=>({
                url:'getCourses',
                method:"GET",
            }),
            providesTags:"user",
    
    })
    }),
})

export const {useCreateCoursessMutation,useGetCoursesQuery} = courseApi