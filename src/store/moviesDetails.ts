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

export const moviesDeatailsSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getGenreData: (state, action) => {
      // console.log('working', state, action);
      state.genres = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getGenreData } = moviesDeatailsSlice.actions;

export default moviesDeatailsSlice.reducer;
