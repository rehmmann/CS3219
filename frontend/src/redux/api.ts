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

type CheckPasswordObject = {
  id: string;
  password: string;
}

type QuestionUpdateProps = {
  id: string;
  data : {
    questionTitle: string;
    questionDescription: string;
    questionComplexity: string;
    questionCategories: string[];
  }
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
    deleteQuestion: builder.mutation<{ question: any }, string>({
      query: (id) => ({
        url: `${QUESTION_URL}/api/questions/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }),
      invalidatesTags: ['Question'],
    }),
    updateQuestion: builder.mutation<{ question: any }, QuestionUpdateProps>({
      query: (question) => ({
        url: `${QUESTION_URL}/api/questions/${question.id}`,
        method: 'PUT',
        body: question.data,
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
    deleteUser: builder.mutation<{ token: string; user: User }, string>({
      query: (id) => ({
        url: `${USER_URL}/users/signined/${id}`,
        method: 'DELETE',
      }),
    }),
    changePassword: builder.mutation<{}, ChangePasswordObject>({
      query: (changePasswordObject) => ({
        url: `${USER_URL}/users/change-password/${changePasswordObject.id}`,
        method: 'PUT',
        body: changePasswordObject.passwords,
      }),
    }),
    checkPassword: builder.mutation<{}, CheckPasswordObject>({
      query: (checkPasswordObject) => ({
        url: `${USER_URL}/users/check-password/${checkPasswordObject.id}`,
        method: 'POST',
        body: { password: checkPasswordObject.password },
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetQuestionsQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useCheckPasswordMutation,
  useDeleteUserMutation,
} = api;
