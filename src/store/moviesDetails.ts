import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface MoviesState {
  isLoading: boolean;
  genres: Array<{
    id: number;
    title: string;
  }>;
}

const initialState: MoviesState = {
  isLoading: false,
  genres: [],
};

export const counterSlice = createSlice({
  name: 'moviesDetails',
  initialState,
  reducers: {
    getGenreData: (state, action) => {
      console.log('working', state, action);
    },
  },
});

// Action creators are generated for each case reducer function
export const { getGenreData } = counterSlice.actions;

export default counterSlice.reducer;
