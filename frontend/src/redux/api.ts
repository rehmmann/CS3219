import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuth } from "firebase/auth";

const QUESTION_URL = import.meta.env.VITE_QUESTION_URL;
const MATCH_URL = import.meta.env.VITE_MATCH_URL;

type QuestionCreateProps = {
  questionId: number;
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
  }),
});

export const {
  useGetQuestionsQuery,
  useCreateQuestionMutation,
  useFindMatchMutation,
  useCheckMatchMutation,
  useRemoveUserMutation,
} = api;
