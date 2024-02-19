import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { useDispatch } from 'react-redux';
import Img from '../lazyLoadImage/Img';
import StarIcon from '../icon/StarIcon';
import { getWatchListItem } from '../../store/moviesDetails';
import WatchListButton from '../watchList/WatchListButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
};

const GenreItem = ({ movie }) => {
  const dispatch = useDispatch();
  const { url, watchList } = useSelector((state: RootState) => state.home);
  const { id, title, poster_path, vote_average, release_date } = movie;
  const imgUrl = poster_path ? url.profile + poster_path : '';

  const handleAddWatchItem = () => {
    const data = {
      id: id,
      movieTitle: title,
      moviePoster: poster_path,
      voteAverage: vote_average,
      addedDate: formatDate(new Date()),
    };

    const checkItem = watchList.find((item) => item.id === id);

    if (checkItem) {
      toast.warn('Already added', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'colored',
      });

      return;
    }

    const modifiedWatchList = [...watchList, data];

    toast.success('Add to the watchlist', {
      position: 'top-center',
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: 'colored',
    });

    dispatch(getWatchListItem(modifiedWatchList));
  };

  return (
    <article id={`post-${id}`} className='movies'>
      <div className='poster'>
        <Img src={imgUrl} className={''} alt={title} />
        <div className='rating'>
          <StarIcon className='movieRating' />
          <span>{vote_average.toFixed(1)}</span>
        </div>
        <Link to={`/movies/${id}`} className='viewDetails'>
          View Details
        </Link>
        <WatchListButton handleAddWatchItem={() => handleAddWatchItem()} />
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
