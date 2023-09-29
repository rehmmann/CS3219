
import { createSlice, PayloadAction} from '@reduxjs/toolkit';

type SliceState = { state: 'loading' } | { state: 'finished'; data: boolean}

const initialState: SliceState = { 
  state: 'finished',
  data: false,
}

const matchSlice = createSlice({
    name: 'match',
    initialState,
    reducers: {
      initMatch: {
        reducer(state, action: PayloadAction<boolean>) {
          state.data = (action.payload)
        },
        prepare(isMatching: boolean) {
          return { payload: isMatching }
        },
      }
    },
  })

  export const { initMatch } = matchSlice.actions;
  export default matchSlice.reducer;