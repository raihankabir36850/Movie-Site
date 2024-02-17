import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import Img from '../lazyLoadImage/Img';
import Avater from '../../assets/avater.jpg';
import './CastItem.scss';

const CastItem = ({ res }) => {
  const { url } = useSelector((state: RootState) => state.home);
  const imgUrl = res.profile_path ? url.profile + res.profile_path : Avater;

  return (
    <div key={res.id} className='listItem'>
      <div className='profileImg'>
        <Img src={imgUrl} className='' />
      </div>
      <div className='name'>{res.name}</div>
      <div className='character'>{res.character}</div>
    </div>
  );
};

export default CastItem;
