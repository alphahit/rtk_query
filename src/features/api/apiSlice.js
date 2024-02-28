// Importing Functions from Redux Toolkit:
// createApi: A function that creates a new RTK Query API slice.
// fetchBaseQuery: A small wrapper around the fetch function that aims to simplify its usage 
// for common use cases.

// Creating an API Slice:
// apiSlice: The name given to the created API slice.
// createApi: The function called to create the API slice.

// Configuration Object:
// reducerPath: This defines the key under which the API slice's reducer will be mounted in the Redux
// store. In this case, it's 'api'.
// baseQuery: This is the basic fetch query with the baseUrl set to http://localhost:3500. It means that all requests will be made to this server.

// Endpoints Definition:
// endpoints: A function that returns an object where each key is the name of an endpoint, and the value is an object defining the type of operation and any necessary details. It takes a builder argument that allows you to define query and mutation endpoints.
// getTodos: This is an endpoint defined inside the endpoints object. It's a read operation, as indicated by the builder.query method.
// query: A function that returns the path of the API endpoint. In this case, the endpoint path is /todos, which will be appended to the base URL. So, when getTodos is called, it will make a GET request to http://localhost:3500/todos.

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => '/todos',
      transformResponse: res => res.sort((a,b)=>b.id - a.id),
      providesTags: ['Todos']
    }),
    addTodo: builder.mutation({
        query: (todo) =>({
            url: '/todos',
            method: 'POST',
            body: todo
        }),
        invalidatesTags:['Todos']
    }),
    updateTodo: builder.mutation({
        query: (todo) =>({
            url: `/todos/${todo.id}`,
            method: 'PATCH',
            body: todo
        }),
        invalidatesTags:['Todos']
    }),
    deleteTodo: builder.mutation({
        query: ({id}) =>({
            url: `/todos/${id}`,
            method: 'DELETE',
            body: id
        }),
        invalidatesTags:['Todos']
    }),
  }),
});

//RTK Query creates custom hooks based on the method we provide
export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation
} = apiSlice