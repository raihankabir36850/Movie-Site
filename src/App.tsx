import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchData } from './utils/api';
import { getApiConfiguration, getGenreData, getWatchListItem } from './store/moviesDetails';
import Details from './pages/details/Details';
import WatchList from './pages/watchList/WatchList';
import PageNotFound from './pages/404/PageNotFound';
import NavBar from './components/navBar/NavBar';
import Genre from './pages/genre/Genre';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  useEffect(() => {
    const watListItems = () => {
      const items = JSON.parse(localStorage.getItem('watchList'))?.length > 0 ? JSON.parse(localStorage.getItem('watchList')) : [];
      dispatch(getWatchListItem(items));
    };

    watListItems();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Navigate to='/movie' />} />
        <Route path='/movie' element={<Home />} />
        <Route path='/movies/:id' element={<Details />} />
        <Route path='/movies/:genreType/:id' element={<Genre />} />
        <Route path='/watchlist' element={<WatchList />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <ToastContainer
        className='notification'
        position='top-center'
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </BrowserRouter>
  );
};

export default App;
