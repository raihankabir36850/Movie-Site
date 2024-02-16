import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchData } from './utils/api';
import { getApiConfiguration, getGenreData } from './store/moviesDetails';
import Details from './pages/details/Details';
import PageNotFound from './pages/404/PageNotFound';

import Home from './pages/home/Home';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchApiGenres = async () => {
      const data = await fetchData('/genre/movie/list?language=en');
      dispatch(getGenreData(data.genres));
    };

    fetchApiGenres();
  }, [dispatch]);

  useEffect(() => {
    const fetchApiConfiguration = async () => {
      const data = await fetchData('/configuration');
      const url = {
        backdrop: data.images.secure_base_url + 'original',
        poster: data.images.secure_base_url + 'original',
        profile: data.images.secure_base_url + 'original',
      };
      dispatch(getApiConfiguration(url));
    };

    fetchApiConfiguration();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/movie' />} />
        <Route path='/movie' element={<Home />} />
        <Route path='/movies/:id' element={<Details />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
