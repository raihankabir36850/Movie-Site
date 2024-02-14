import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { RootState } from './store/store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMoviesGenresData } from './utils/api';
import { getGenreData } from './store/moviesDetails';

import Home from './pages/home/Home';
import Details from './pages/details/Details';
import Movies from './pages/movies/Movies';

const App = () => {
  const { isLoading, genres } = useSelector((state: RootState) => state.home);
  console.log(isLoading);
  const dispatch = useDispatch();
  // fetch the genres data

  useEffect(() => {
    const fetchGenresData = async () => {
      const data = await fetchMoviesGenresData('/genre/movie/list');
      dispatch(getGenreData(data));
    };

    fetchGenresData();
  }, [dispatch]);

  // console.log('genres', genres);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/movie' />} />
        <Route path='/movie' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
