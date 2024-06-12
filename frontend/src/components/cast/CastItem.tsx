import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import Img from '../lazyLoadImage/Img';
import Avater from '../../assets/avater.jpg';
import './CastItem.scss';

interface CastMember {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string | null; // Assuming profile_path could be null
}

interface CastItemProps {
  res: CastMember;
}

const CastItem = ({ res }: CastItemProps) => {
  const { url } = useSelector((state: RootState) => state.home);
  const imgUrl = res.profile_path ? url.profile + res.profile_path : Avater;

  return (
    <div key={res.id} className='listItem'>
      <div className='profileImg'>
        <Img src={imgUrl} className='' alt={res.name} />
      </div>
      <div className='name'>{res.name}</div>
      <div className='character'>{res.character}</div>
    </div>
  );
};

export default CastItem;
