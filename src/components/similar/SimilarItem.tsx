import type { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import './SimilarItem.scss';
import StarIcon from '../icon/StarIcon';
import { getWatchListItem } from '../../store/moviesDetails';
import WatchListButton from '../watchList/WatchListButton';
import posterImage from '../../assets/no_poster.jpg';

interface MovieData {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieDataProps {
  res: MovieData;
}

const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  return formattedDate;
};

const SimilarItem = ({ res }: MovieDataProps) => {
  const dispatch = useDispatch();
  const { url, watchList } = useSelector((state: RootState) => state.home);
  const { poster_path, title, id, vote_average } = res;
  const imgUrl = poster_path ? url.poster + poster_path : posterImage;

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
      autoClose: 2000,
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
    <div className='item'>
      <Link to={`/movies/${id}`} className='movieLink'>
        <div className='moviePoster'>
          <img src={imgUrl} alt={title} />
        </div>
      </Link>
      {vote_average ? (
        <div className='movieRating'>
          <StarIcon className='' />
          <span>{vote_average.toFixed(1)}</span>
        </div>
      ) : (
        <div className='movieRating'>
          <StarIcon className='' />
          <span>{vote_average.toFixed(1)}</span>
        </div>
      )}

      <div className='movieTitle'>
        <span>{title}</span>
      </div>
      <WatchListButton handleAddWatchItem={() => handleAddWatchItem()} />
    </div>
  );
};

export default SimilarItem;
