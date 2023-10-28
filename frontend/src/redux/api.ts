import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuth } from "firebase/auth";

const QUESTION_URL = import.meta.env.VITE_QUESTION_URL;
const MATCH_URL = import.meta.env.VITE_MATCH_URL;

type QuestionCreateProps = {
  questionTitle: string;
  questionDescription: string;
  questionComplexity: string;
  questionCategories: string[];
};

type FindMatchProps = {
  id: string;
  email: string;
  topic: string;
  difficulty: string;
};

type CheckMatchProps = {
  id: string;
  email: string;
  topic: string;
  difficulty: string;
};

type RemoveUserProps = {
  id: string;
  email: string;
  topic: string;
  difficulty: string;
};
=======
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
  baseQuery: fetchBaseQuery({
    baseUrl: ``,
    prepareHeaders: async (headers) => {
      const auth = getAuth();
      await auth.currentUser?.getIdTokenResult().then((idTokenResult) => {
        headers.set("authorization", `Bearer ${idTokenResult.token}`);
      });
      return headers;
    },
  }),
  tagTypes: ["Question", "Match"],
  endpoints: (builder) => ({
    getQuestions: builder.query<{ questions: any[] }, void>({
      query: () => ({
        url: `${QUESTION_URL}`,
        method: "GET",
      }),
      providesTags: ["Question"],
    }),
    createQuestion: builder.mutation<{ question: any }, QuestionCreateProps>({
      query: (question) => ({
        url: `${QUESTION_URL}/new`,
        method: "POST",
        body: question,
      }),
      invalidatesTags: ["Question"],
    }),
    findMatch: builder.mutation<ResponseType, FindMatchProps>({
      query: (matchData) => ({
        url: `${MATCH_URL}/find-match`,
        method: "POST",
        body: matchData,
      }),
      invalidatesTags: ["Match"],
    }),
    checkMatch: builder.mutation<ResponseType, CheckMatchProps>({
      query: (matchData) => ({
        url: `${MATCH_URL}/check-match`,
        method: "POST",
        body: matchData,
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
      invalidatesTags: ["Match"],
    }),
    removeUser: builder.mutation<ResponseType, RemoveUserProps>({
      query: (userData) => ({
        url: `${MATCH_URL}/remove-user`,
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Match"],
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
  useGetQuestionsQuery,
  useCreateQuestionMutation,
  useFindMatchMutation,
  useCheckMatchMutation,
  useRemoveUserMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useCheckPasswordMutation,
  useDeleteUserMutation,
} = api;
