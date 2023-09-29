import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../utils/types';

const BASE_URL = import.meta.env.VITE_BE_URL;
const QUESTION_URL = import.meta.env.VITE_QUESTION_URL;
const USER_URL = import.meta.env.VITE_USER_URL;
const TOKEN = import.meta.env.VITE_GCLOUD_IDENTITY_TOKEN;

type UserCredentials = {
  email: string;
  password: string;
  username?: string;
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
    login: builder.mutation<{ token: string; user: User }, UserCredentials>({
      query: (credentials) => ({
        url: `${USER_URL}/users/login`,
        method: 'POST',
        body: credentials,
      }),
    }),
    createUser: builder.mutation<{ token: string; user: User }, UserCredentials>({
      query: (credentials) => ({
        url: `${USER_URL}/users`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useGetQuestionsQuery, useLoginMutation } = api;
