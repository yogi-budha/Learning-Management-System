import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/course/",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    createCoursess: builder.mutation({
      query: (inputData) => ({
        url: "create",
        method: "POST",
        body: inputData,
      }),
      providesTags: ["course"],
      invalidatesTags: ["course"],
    }),

    getCourses: builder.query({
      query: () => ({
        url: "getCourses",
        method: "GET",
      }),
      providesTags: ["course"],
    }),

    editCourse: builder.mutation({
      query: ({ inputData, courseId }) => ({
        url: `${courseId}`,
        method: "PUT",
        body: inputData,
      }),
      invalidatesTags:["course"],
    }),

    getCourseById: builder.query({
      query: (courseId) => ({
        url: `${courseId}`,
        method: "GET",
      }),
      providesTags:["course"],
    }),

    createLecture: builder.mutation({
      query: ({ inputData, courseId }) => ({
        url: `${courseId}/lecture`,
        method: "POST",
        body: inputData,
      }),
      invalidatesTags: ["lecture"],
    }),

    getCourseLecture: builder.query({
      query: (courseId) => ({
        url: `${courseId}/lecture`,
        method: "GET",
      }),
      providesTags: ["lecture"],
    }),

    editLecture: builder.mutation({
      query: ({ lectureTitle,isFree,videoUrl,publicUrl, courseId,lectureId }) => ({
        url: `${courseId}/lecture/${lectureId}`,
        method: "POST",
        body: { lectureTitle,isFree,videoUrl,publicUrl},
      }),
      invalidatesTags: ["lecture"],
    }),

    deleteLecture: builder.mutation({
      query: (lectureId) => ({
        url: `lecture/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["lecture"],
    }),

    getLecture: builder.query({
      query: (lectureId) => ({
        url: `lecture/${lectureId}`,
        method: "GET",
      }),
      providesTags: ["lecture"],
    }),

    publishCourse: builder.mutation({
      query: ({courseId,query}) => ({
        url: `${courseId}?query=${query}`,
        method: "PATCH",
      }),
      invalidatesTags:["course"],
    }),
    
  }),
});

export const {
  useCreateCoursessMutation,
  useGetCoursesQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLectureMutation,
  useDeleteLectureMutation,
  useGetLectureQuery,
  usePublishCourseMutation
} = courseApi;
