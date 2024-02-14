import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@reduxjs/toolkit/query';
import { getMoviesDate } from '../../store/moviesDetails';

export const ContentWrapper = () => {
  //const [content, setContent] = useState(false);
  const { date, movieDate } = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    if (date.startDate || date.endDate) {
      //setContent(true);
      console.log('will get the data');
      dispatch(getMoviesDate(true));
    }
  }, [date.startDate, date.endDate, dispatch]);

  return (
    <div>
      {movieDate ? (
        <div>
          <h1>{date.startDate}</h1>
          <h1>{date.endDate}</h1>
          <h1>show</h1>
        </div>
      ) : (
        <h1>hidden</h1>
      )}
    </div>
  );
};

export default ContentWrapper;
