import Img from '../lazyLoadImage/Img';
import type { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './SimilarItem.scss';
import StarIcon from '../icon/StarIcon';
import WatchListIcon from '../icon/WatchListIcon';
import { getWatchListItem } from '../../store/moviesDetails';

const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
};

const SimilarItem = ({ res }) => {
  const dispatch = useDispatch();
  const { url, watchList } = useSelector((state: RootState) => state.home);
  const { backdrop_path, title, id, vote_average } = res;
  const imgUrl = backdrop_path ? url.backdrop + backdrop_path : '';

  const handleAddWatchItem = () => {
    const data = {
      id: id,
      addedDate: formatDate(new Date()),
    };

    const checkItem = watchList.find((item) => item.id === id);

    if (checkItem) return;

    const modifiedWatchList = [...watchList, data];
    dispatch(getWatchListItem(modifiedWatchList));
  };

  return (
    <div className='item'>
      <Link to={`/movies/${id}`} className='movieLink'>
        <div className='moviePoster'>
          <Img src={imgUrl} className={''} />
        </div>
      </Link>
      {vote_average && (
        <div className='movieRating'>
          <StarIcon />
          <span>{vote_average.toFixed(1)}</span>
        </div>
      )}

      <div className='movieTitle'>
        <span>{title}</span>
      </div>
      <div className='watchListContainer'>
        <button className='watchListButton' onClick={() => handleAddWatchItem()}>
          <WatchListIcon />
          <span>Watchlist</span>
        </button>
      </div>
    </div>
  );
};

export default SimilarItem;
