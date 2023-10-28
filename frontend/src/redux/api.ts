import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../utils/types';

const QUESTION_URL = import.meta.env.VITE_QUESTION_URL;
const USER_URL = import.meta.env.VITE_USER_URL;
const TOKEN = import.meta.env.VITE_GCLOUD_IDENTITY_TOKEN;

type UserCredentials = {
  email: string;
  password: string;
  username?: string;
};
type QuestionCreateProps = {
  questionId: number;
  questionTitle: string;
  questionDescription: string;
  questionComplexity: string;
  questionCategories: string[];
}
type ChangePasswordObject = {
  passwords: {
    oldPassword: string;
    newPassword: string;
  },
  id: string

}
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `` }),
  tagTypes: ['Question'],
  endpoints: (builder) => ({
    getQuestions: builder.query<{ questions: any[] }, void>({
      query: () => ({
        url: `${QUESTION_URL}/api/questions`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }),
      providesTags: ['Question'],
    }),
    createQuestion: builder.mutation<{ question: any }, QuestionCreateProps>({
      query: (question) => ({
        url: `${QUESTION_URL}/api/questions/new`,
        method: 'POST',
        body: question,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }),
      invalidatesTags: ['Question'],
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
    changePassword: builder.mutation<{}, ChangePasswordObject>({
      query: (changePasswordObject) => ({
        url: `${USER_URL}/users/change-password/${changePasswordObject.id}`,
        method: 'PUT',
        body: changePasswordObject.passwords,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetQuestionsQuery,
  useCreateQuestionMutation,
  useLoginMutation,
  useChangePasswordMutation,
} = api;
