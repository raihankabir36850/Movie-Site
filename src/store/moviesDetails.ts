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
  watchList: Array<{
    movieId: number;
    addedDate: string;
  }>;
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
  watchList: JSON.parse(localStorage.getItem('watchList')).length > 1 ? JSON.parse(localStorage.getItem('watchList')) : [],
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
    getWatchListItem: (state, action) => {
      localStorage.setItem('watchList', JSON.stringify(action.payload));
      state.watchList = action.payload;
    },
  },
});

export const { getApiConfiguration, getGenreData, getDate, getMoviesDate, getWatchListItem } = moviesDeatailsSlice.actions;

export default moviesDeatailsSlice.reducer;
