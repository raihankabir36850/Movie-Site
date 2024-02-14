import { useEffect } from 'react';
import type { RootState } from './store/store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMoviesGenresData } from './utils/api';
import { getGenreData } from './store/moviesDetails';

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

  console.log('genres', genres);
  return <div>data</div>;
};

export default App;
