import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchData } from './utils/api';
import { getApiConfiguration } from './store/moviesDetails';

import Home from './pages/home/Home';

const App = () => {
  //const { isLoading, url } = useSelector((state: RootState) => state.home);
  // console.log(isLoading);
  const dispatch = useDispatch();
  // fetch the genres data

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
