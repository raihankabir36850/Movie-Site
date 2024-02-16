import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import Img from '../lazyLoadImage/Img';
import './castContainer.scss';

const CastContainer = ({ data }) => {
  const { url } = useSelector((state: RootState) => state.home);

  return (
    <div className='castWrapper'>
      <h1 className='castTitle'>Top Cast</h1>
      <div className='listItems'>
        {data.map((item) => {
          const imgUrl = item.profile_path ? url.profile + item.profile_path : '';
          if (!item.profile_path) return;
          if (item.profile_path) {
            return (
              <div key={item.id} className='listItem'>
                <div className='profileImg'>
                  <Img src={imgUrl} className='' />
                </div>
                <div className='name'>{item.name}</div>
                <div className='character'>{item.character}</div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default CastContainer;
