import Img from '../lazyLoadImage/Img';
import type { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './SimilarItem.scss';
import StarIcon from '../icon/StarIcon';
import { getWatchListItem } from '../../store/moviesDetails';
import WatchListButton from '../watchList/WatchListButton';

const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
};

const SimilarItem = ({ res }) => {
  console.log(res, 'res');
  const dispatch = useDispatch();
  const { url, watchList } = useSelector((state: RootState) => state.home);
  const { poster_path, title, id, vote_average } = res;
  const imgUrl = poster_path ? url.backdrop + poster_path : '';

  const handleAddWatchItem = () => {
    const data = {
      id: id,
      movieTitle: title,
      moviePoster: poster_path,
      voteAverage: vote_average,
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
          <img src={imgUrl} alt={title} />
        </div>
      </Link>
      {vote_average ? (
        <div className='movieRating'>
          <StarIcon />
          <span>{vote_average.toFixed(1)}</span>
        </div>
      ) : (
        <div className='movieRating'>
          <StarIcon />
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
