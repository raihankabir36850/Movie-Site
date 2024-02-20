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

const MAGIC_NUMBER = 5;

const selectFiveElements = (array) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, MAGIC_NUMBER);
  return selected;
};

export const ContentWrapper = () => {
  const { genres, date } = useSelector((state: RootState) => state.home);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); //false
  const [genreIndex, setGenreIndex] = useState(0); //0
  const [pageIndex, setPageIndex] = useState(1); //5
  const [totalPages, setTotalPages] = useState(null); //5

  const fetchGenreMovie = async (flag = false) => {
    setLoading(true);
    const primaryReleaseDateGte = date.startDate;
    const primaryReleaseDateLte = date.endDate;
    const url = `discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageIndex}&primary_release_date.gte=${primaryReleaseDateGte}&primary_release_date.lte=${primaryReleaseDateLte}&sort_by=popularity.desc`;
    const response = await fetchData(url);
    //console.log(response);
    if (response?.results?.length) {
      setData((data) => (flag ? [...response.results] : [...data, ...response.results]));
      setTotalPages(5 || response.total_pages);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (genres.length && genreIndex < genres.length && date.startDate && date.endDate) {
      //console.log('chnage');
      fetchGenreMovie();
    }
  }, [genreIndex, genres.length, pageIndex]);

  useEffect(() => {
    if (date.startDate && date.endDate) {
      //console.log('sure');
      fetchGenreMovie(true);
    }
  }, [date]);

  useEffect(() => {
    return () => {
      //console.log('clear');
    };
  }, []);

  const fetchNextData = () => {
    setPageIndex((page) => (totalPages && page < totalPages ? page + 1 : page));
  };

  return (
    <div className='contentWrapper'>
      <div className='moviesContainer'>
        <Title title='Explore Movies' />
        {loading && data.length === 0 ? (
          <Loader />
        ) : (
          <>
            {data && data.length ? (
              <div className='allMoviesSection'>
                <InfiniteScroll dataLength={data.length} next={fetchNextData} hasMore={true}>
                  <Container>
                    <GenreContainer data={data} />
                  </Container>
                </InfiniteScroll>
              </div>
            ) : (
              <Loader />
            )}
          </>
        )}
      </div>
      <div className='genresContainer'></div>
    </div>
  );
};

export default ContentWrapper;
