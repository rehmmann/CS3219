
import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Question } from '../../utils/types';

type SliceState = { state: 'loading' } | { state: 'finished'; data: Question[] }

const initialState: SliceState = { 
  state: 'finished',
  data: [
    {
      id: "1",
    title: "Q1",
    description: "TEST DESC",
    category: "CAT1",
    complexity: "EASY",
    createdAt: "time1",
    updatedAt: "time2",
    createdBy: "USER1"
    }
  ]
}

const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
      addQuestion: {
        reducer(state, action: PayloadAction<Question>) {
          state.data.push(action.payload)
        },
        prepare(question: Question) {
          return { payload: question }
        },
      }
      // receivedAll: {
      //   reducer(
      //     state,
      //     action: PayloadAction<Page[], string, { currentPage: number }>
      //   ) {
      //     state.all = action.payload
      //     state.meta = action.meta
      //   },
      //   prepare(payload: Page[], currentPage: number) {
      //     return { payload, meta: { currentPage } }
      //   },
      // },
    },
  })

  export const { addQuestion } = questionSlice.actions;
  export default questionSlice.reducer;