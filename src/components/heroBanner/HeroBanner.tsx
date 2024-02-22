import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import useFetch from '../../hooks/useFetch';
import DateFormat from '../datePicker/Dateformat';
import Img from '../lazyLoadImage/Img';
import './HeroBanner.scss';

interface HeroBannerData {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

const HeroBanner = () => {
  const [background, setBackGround] = useState<string>('');
  const { loading, data } = useFetch<HeroBannerData>('movie/upcoming');

  const { url } = useSelector((state: RootState) => state.home);

  useEffect(() => {
    if (!data || !data.results || !url.backdrop) return;
    const bg = url.backdrop + data.results[Math.floor(Math.random() * data.results.length)].backdrop_path;
    setBackGround(bg);
  }, [data, url.backdrop]);

  return (
    <div className='heroBanner'>
      {!loading && (
        <div className='backDropImage'>
          <Img src={background} className='backDropImage' alt='hero-banner' />
        </div>
      )}
      <div className='wrapper'>
        <div className='heroBannerContent'>
          <span className='title'>Hey Movie Lovers</span>
          <span className='subTitle'>Search your favoutite movies by selecting your certain dates </span>
          <div className='datePicker'>
            <DateFormat
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              onChange={function (_date: Date | null): void {
                throw new Error('Function not implemented.');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
