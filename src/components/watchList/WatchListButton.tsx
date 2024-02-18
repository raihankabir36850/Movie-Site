import './WatchListButton.scss';
import WatchListIcon from '../icon/WatchListIcon';

const WatchListButton = ({ handleAddWatchItem }) => {
  return (
    <div className='watchListContainer'>
      <button className='watchListButton' onClick={handleAddWatchItem}>
        <WatchListIcon />
        <span>Watchlist</span>
      </button>
    </div>
  );
};

export default WatchListButton;
