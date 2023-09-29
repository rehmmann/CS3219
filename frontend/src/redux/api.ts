import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../utils/types';

const BASE_URL = import.meta.env.VITE_BE_URL;
const QUESTION_URL = import.meta.env.VITE_QUESTION_URL;
const USER_URL = import.meta.env.VITE_USER_URL;
const TOKEN = import.meta.env.VITE_GCLOUD_IDENTITY_TOKEN;
const dummyUser: User = {
  id: '1',
  username: 'dummyuser',
  email: 'dummyuser@example.com',
  role: 'user',
  createdAt: '2023-01-01',
  updatedAt: '2023-01-01',
};
type LoginCredentials = {
  email: string;
  password: string;
};
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `` }),
  endpoints: (builder) => ({
    getQuestions: builder.query<{ questions: any[] }, void>({
      query: () => ({
        url: `${QUESTION_URL}/api/questions`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        }
      }),
    }),
    login: builder.mutation<{ token: string; user: User }, LoginCredentials>({
      query: (credentials) => ({
        url: `${USER_URL}/users/login`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useGetQuestionsQuery } = api;
