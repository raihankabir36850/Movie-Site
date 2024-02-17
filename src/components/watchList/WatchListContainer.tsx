import MovieItem from '../movieCard/MovieItem';
import './WatchListContainer.scss';

function WatchListContainer({ data }) {
  return (
    <div className='watchlist'>
      {data.map((item) => (
        <MovieItem key={item.id} movie={item}></MovieItem>
      ))}
    </div>
  );
}

export default WatchListContainer;
