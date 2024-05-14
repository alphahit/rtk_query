import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categorySlice = createApi({
    reducerPath: "",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3500'}),
    tagTypes: ["Categories"],
    endpoints: (builder) => ({
        getCategories: builder.query({
          query: () => '/categories',
          transformResponse: res => res.sort((a,b) => a.id - b.id),
          providesTags: ['Categories']
        }),
        addCategory: builder.mutation({
            query: (category) => ({
                url: '/categories',
                method: 'POST',
                body: category
            }),
            invalidatesTags: ['Categories']
        }),
        updateCategory: builder.mutation({
            query: (category) => ({
                url: `/categories/${category.id}`,
                method: 'PATCH',
                body: category
            }),
            invalidatesTags: ["Categories"]
        }),
        deleteCategory: builder.mutation({
            query: ({id}) => ({
                url: `/categories/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Categories']
        }),
      }),
})

export const {
    useGetCategoriesQuery,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation
  } = categorySlice;