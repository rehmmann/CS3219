import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuth } from 'firebase/auth';

const QUESTION_URL = import.meta.env.VITE_QUESTION_URL;


type QuestionCreateProps = {
  questionId: number;
  questionTitle: string;
  questionDescription: string;
  questionComplexity: string;
  questionCategories: string[];
}
export const api = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: ``,
    prepareHeaders: async (headers) => {
      const auth = getAuth();
      await auth.currentUser?.getIdTokenResult().then((idTokenResult) => {
        headers.set('authorization', `Bearer ${idTokenResult.token}`);
      })
      return headers;
    },
  }),
  tagTypes: ['Question'],
  endpoints: (builder) => ({
    getQuestions: builder.query<{ questions: any[] }, void>({
      query: () => ({
        url: `${QUESTION_URL}`,
        method: 'GET',
      }),
      providesTags: ['Question'],
    }),
    createQuestion: builder.mutation<{ question: any }, QuestionCreateProps>({
      query: (question) => ({
        url: `${QUESTION_URL}/new`,
        method: 'POST',
        body: question,

      }),
      invalidatesTags: ['Question'],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useCreateQuestionMutation,
} = api;
