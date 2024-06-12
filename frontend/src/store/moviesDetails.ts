import { createSlice } from '@reduxjs/toolkit';

const watchListString = localStorage.getItem('watchList');
const watchList = watchListString ? JSON.parse(watchListString) : [];

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
    name: any;
    id: number;
    title: string;
  }>;
  movieDate: boolean;
  watchList: Array<{
    id: number;
    movieId: number;
    movieTitle: string;
    moviePoster: string;
    voteAverage: number;
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
  watchList: watchList,
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
