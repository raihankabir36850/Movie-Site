import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@reduxjs/toolkit/query';
import { getMoviesDate } from '../../store/moviesDetails';
import { fetchData } from '../../utils/api';

const MAGIC_NUMBER = 5;

const selectFiveElements = (array) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, MAGIC_NUMBER);
  return selected;
};

export const ContentWrapper = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genreIndex, setGenreIndex] = useState(-1);

  const { genres, date } = useSelector((state: RootState) => state.home);

  const fetchGenreMovie = async (index: number) => {
    const genreId = genres[index].id;
    const primaryReleaseDateGte = date.startDate;
    const primaryReleaseDateLte = date.endDate;
    const url = `discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=${primaryReleaseDateGte}&primary_release_date.lte=${primaryReleaseDateLte}&sort_by=popularity.desc&with_genres=${genreId}`;
    const response = await fetchData(url);

    const dataArray = selectFiveElements(response.results);
    //setData(prev : never[]=> [...prev, { id: genreId, name: genres[index].name}});
  };

  useEffect(() => {
    if (genres.length) {
      setGenreIndex((prev) => prev + 1);
    }
  }, [genres.length]);

  useEffect(() => {
    if (genreIndex >= 0 && genreIndex < genres.length) {
      fetchGenreMovie(genreIndex);
    }
  }, [genreIndex, genres.length]);

  return <div>content</div>;
};

export default ContentWrapper;
