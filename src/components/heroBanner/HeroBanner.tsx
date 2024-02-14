import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import useFetch from '../../hooks/useFetch';
import DateFormat from '../datePicker/Dateformat';
import Img from '../lazyLoadImage/Img';
import './HeroBanner.scss';

const HeroBanner = () => {
  const [background, setBackGround] = useState<string>('');
  const { loading, data, error } = useFetch('movie/upcoming');

  const { url } = useSelector((state: RootState) => state.home);

  useEffect(() => {
    console.log(data);
    if (!data || !data.results || !url.backdrop) return;
    const bg = url.backdrop + data.results[Math.floor(Math.random() * data.results.length)].backdrop_path;
    setBackGround(bg);
  }, [data, url.backdrop]);

  return (
    <div className='heroBanner'>
      {!loading && (
        <div className='backDropImage'>
          <Img src={background} classNmae='backDropImage' />
        </div>
      )}
      <div className='wrapper'>
        <div className='heroBannerContent'>
          <span className='title'>Hey Movie Lovers</span>
          <span className='subTitle'>Search your favoutite movies by selecting your certain dates </span>
          <div className='datePicker'>
            <DateFormat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
