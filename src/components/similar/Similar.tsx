import { useSelector } from 'react-redux';
import Img from '../lazyLoadImage/Img';
import type { RootState } from '../../store/store';
import { Link } from 'react-router-dom';

import './Similar.scss';

const Similar = ({ data }) => {
  console.log('data:', data);
  const { url } = useSelector((state: RootState) => state.home);
  return (
    <div className='similarSection'>
      <h1 className='similarTitle'>Similar Movies</h1>
      <div className='similarWrapper'>
        <div className='listing'>
          {data.results.map((result) => {
            const { backdrop_path, title, id } = result;
            const imgUrl = backdrop_path ? url.backdrop + backdrop_path : '';
            return (
              <div className='item' key={result.id}>
                <Link to={`/movies/${id}`}>
                  <div className='moviePoster'>
                    <Img src={imgUrl} className={''} />
                  </div>
                  <div className='movieTitle'>
                    <span>{title}</span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Similar;
