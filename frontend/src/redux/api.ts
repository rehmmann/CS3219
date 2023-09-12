import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../utils/types';

const dummyUser: User = {
  id: '1',
  username: 'dummyuser',
  email: 'dummyuser@example.com',
  role: 'user',
  createdAt: '2023-01-01',
  updatedAt: '2023-01-01',
};
  
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    login: builder.query<{ token: string; user: User }, void>({
      // Replace this with your custom logic to simulate a login
      queryFn: async (arg, api, extraOptions, baseQuery) => {
        return {
           data: { 
            token: 'dummyToken', 
            user: dummyUser 
          }
        };
      },
    }),
  }),
});

export const { useLoginQuery } = api;