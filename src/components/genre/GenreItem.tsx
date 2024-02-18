import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import Img from '../lazyLoadImage/Img';
import StarIcon from '../icon/StarIcon';

const GenreItem = ({ movie }) => {
  const { url } = useSelector((state: RootState) => state.home);
  const { id, title, poster_path, vote_average, release_date } = movie;
  const imgUrl = poster_path ? url.profile + poster_path : '';

  return (
    <article id={`post-${id}`} className='movies'>
      <div className='poster'>
        <Img src={imgUrl} className={''} />
        <div className='rating'>
          <StarIcon className='movieRating' />
          <span>{vote_average.toFixed(1)}</span>
        </div>
        <Link to={`/movies/${id}`} className='viewDetails'>
          View Details
        </Link>
      </div>
      <div className='data'>
        <h3>
          <Link to={`/movies/${id}`}>{title}</Link>
        </h3>
        <span className='year'>{release_date.split('-')[0]}</span>
      </div>
    </article>
  );
};

export default GenreItem;
