import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface MoviesState {
  isLoading: boolean;
  date: {
    startDate: string;
    endDate: string;
  };
  url: {
    backdrop: string;
    poster: string;
    profile: string;
  };
  genres: Array<{
    id: number;
    title: string;
  }>;
  movieDate: boolean;
}

const initialState: MoviesState = {
  isLoading: false,
  date: {
    startDate: '',
    endDate: '',
  },
  genres: [],
  url: {
    backdrop: '',
    poster: '',
    profile: '',
  },
  movieDate: false,
};

export const moviesDeatailsSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
    getDate: (state, action) => {
      state.date = action.payload;
    },
    getGenreData: (state, action) => {
      state.genres = action.payload;
    },
    getMoviesDate: (state, action) => {
      state.movieDate = action.payload;
    },
  },
});

export const { getApiConfiguration, getGenreData, getDate, getMoviesDate } = moviesDeatailsSlice.actions;

export default moviesDeatailsSlice.reducer;
