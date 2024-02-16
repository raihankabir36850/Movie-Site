import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

const WishList = () => {
  const { watchList } = useSelector((state: RootState) => state.home);
  return (
    <>
      {watchList.length > 0 ? (
        <div className='watchlist'>
          {watchList.map((item) => {
            return <div className='watchItem'>{item.id}</div>;
          })}
        </div>
      ) : (
        <div>no item available now.</div>
      )}
    </>
  );
};

export default WishList;
