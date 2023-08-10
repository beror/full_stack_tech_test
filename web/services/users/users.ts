import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {ICreateUser, IUser} from "@/types/users";

export const usersApi = createApi({
    reducerPath: 'usersApi',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
    endpoints: (builder) => ({

        getListOfUsers: builder.query<IUser[], undefined>({
            query: () => `users`,
            providesTags: ['User'],
        }),

        getUserById: builder.query<IUser, string>({
            query: (id) => `users/${id}`,
        }),

        createUser: builder.mutation<IUser, ICreateUser>({
            query(body) {
                return {
                    url: `users`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['User'],
        })
    }),
})

export const { useGetListOfUsersQuery, useGetUserByIdQuery, useCreateUserMutation } = usersApi;