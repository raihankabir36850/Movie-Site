import './ContentWrapper.scss';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@reduxjs/toolkit/query';
import { getMoviesDate } from '../../store/moviesDetails';
import { fetchData } from '../../utils/api';
import Title from '../title/Title';
import InfiniteScroll from 'react-infinite-scroll-component';
import Container from '../container/Container';
import GenreContainer from '../genre/GenreContainer';
import Loader from '../loader/Loader';
import Similar from '../similar/Similar';

const MAGIC_NUMBER = 5;

const selectFiveElements = (array, propertyName) => {
  if (!array.length) return array;
  const filtered = array.filter((item) => item[propertyName] !== null && item[propertyName] !== undefined);
  const shuffled = filtered.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, MAGIC_NUMBER);
  return selected;
};

export const ContentWrapper = () => {
  const { genres, date } = useSelector((state: RootState) => state.home);
  const [moviedata, setMovieData] = useState([]);
  const [genredata, setGenreData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genreLoading, setGenreLoading] = useState(true);
  const [genreIndex, setGenreIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const fetchMovies = async (flag = false) => {
    setLoading(true);
    const primaryReleaseDateGte = date.startDate;
    const primaryReleaseDateLte = date.endDate;
    const url = `discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageIndex}&primary_release_date.gte=${primaryReleaseDateGte}&primary_release_date.lte=${primaryReleaseDateLte}&sort_by=popularity.desc`;
    const response = await fetchData(url);
    if (response?.results?.length) {
      setMovieData((data) => (flag ? [...response.results] : [...data, ...response.results]));
      setTotalPages(5 || response.total_pages);
    }
    setLoading(false);
  };

  const fetchGenreMovie = async () => {
    setGenreLoading(true);
    const primaryReleaseDateGte = date.startDate;
    const primaryReleaseDateLte = date.endDate;
    const genreId = genres[genreIndex].id;
    const url = `discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=${primaryReleaseDateGte}&primary_release_date.lte=${primaryReleaseDateLte}&sort_by=popularity.desc&with_genres=${genreId}`;
    const response = await fetchData(url);
    if (response?.results) {
      setGenreData((prevData) => [...prevData, { id: genres[genreIndex].id, name: genres[genreIndex].name, data: selectFiveElements(response.results, 'backdrop_path') }]);
    }
    setGenreLoading(false);
  };

  // initially render the current dates of movie data
  useEffect(() => {
    if (genres.length && date.startDate && date.endDate) {
      fetchMovies();
    }
  }, [genres.length, pageIndex]);

  useEffect(() => {
    if (date.startDate && date.endDate) {
      setGenreIndex(0);
      setPageIndex(1);
      setGenreData([]);
      fetchMovies(true);
    }
  }, [date]);

  useEffect(() => {
    if (pageIndex === totalPages) {
      fetchGenreMovie();
    }
  }, [pageIndex, genreIndex]);

  const fetchNextData = () => {
    setPageIndex((page) => (totalPages && page < totalPages ? page + 1 : page));
  };

  const fetchNextGenreData = () => {
    setGenreIndex((index) => (index < genres.length - 1 ? index + 1 : index));
  };

  return (
    <div className='contentWrapper'>
      <div className='moviesContainer'>
        <Title title='Explore Movies' />
        {loading && moviedata.length === 0 ? (
          <Loader />
        ) : (
          <>
            {moviedata && moviedata.length ? (
              <div className='allMoviesSection'>
                <InfiniteScroll dataLength={moviedata.length} next={fetchNextData} hasMore={true}>
                  <Container>
                    <GenreContainer data={moviedata} />
                  </Container>
                </InfiniteScroll>
              </div>
            ) : (
              <Loader />
            )}
          </>
        )}
      </div>
      <div className='genresContainer'>
        <>
          {genredata && genredata.length > 0 && (
            <div className='allMoviesSection'>
              <InfiniteScroll dataLength={genredata.length} next={fetchNextGenreData} hasMore={true}>
                <div className='similarMoviesSection'>
                  {genredata.map((data) => {
                    return (
                      <div className='section' key={data.id}>
                        {data.data.length ? (
                          <div className='genre'>
                            <Title title={data.name} />
                            <Similar data={data.data} />
                          </div>
                        ) : (
                          <p>no data available</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </InfiniteScroll>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default ContentWrapper;
