import MovieItem from '../movieCard/MovieItem';
import './WatchListContainer.scss';

function WatchListContainer({ data }) {
  const modifiedData = [...data].reverse();
  return (
    <div className='watchlist'>
      {modifiedData.map((item) => (
        <MovieItem key={item.id} movie={item}></MovieItem>
      ))}
    </div>
  );
}

export default WatchListContainer;
