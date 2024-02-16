import Img from '../lazyLoadImage/Img';
import type { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './SimilarItem.scss';

const SimilarItem = ({ result }) => {
  const { url } = useSelector((state: RootState) => state.home);
  const { backdrop_path, title, id } = result;
  const imgUrl = backdrop_path ? url.backdrop + backdrop_path : '';
  return (
    <div className='item'>
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
};

export default SimilarItem;
