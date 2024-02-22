import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { Link } from 'react-router-dom';
import Img from '../lazyLoadImage/Img';
import StarIcon from '../icon/StarIcon';
import './MovieItem.scss';

interface MovieData {
  id: number;
  movieTitle: string;
  moviePoster: string;
  voteAverage: number;
  addedDate: string;
}

interface MovieDataProps {
  movie: MovieData;
}

const MovieItem = ({ movie }: MovieDataProps) => {
  const { url } = useSelector((state: RootState) => state.home);
  const { id, movieTitle, moviePoster, voteAverage, addedDate } = movie;
  const imgUrl = moviePoster ? url.poster + moviePoster : '';

  return (
    <article id={`post-${id}`} className='movies'>
      <div className='poster'>
        <Img src={imgUrl} className={''} alt={movieTitle} />
        <div className='rating'>
          <StarIcon className='movieRating' />
          <span>{voteAverage.toFixed(1)}</span>
        </div>
        <Link to={`/movies/${id}`} className='viewDetails'>
          View Details
        </Link>
      </div>
      <div className='data'>
        <h3>
          <Link to={`/movies/${id}`}>{movieTitle}</Link>
        </h3>
        <span className='year'>{addedDate.split(', ')[1]}</span>
      </div>
    </article>
  );
};

export default MovieItem;
