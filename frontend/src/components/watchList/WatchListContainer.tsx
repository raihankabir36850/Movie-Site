import MovieItem from '../movieCard/MovieItem';
import './WatchListContainer.scss';

interface MovieData {
  addedDate: string;
  id: number;
  moviePoster: string;
  movieTitle: string;
  voteAverage: number;
}

interface MovieDataProps {
  data: MovieData[];
}

function WatchListContainer({ data }: MovieDataProps) {
  const modifiedData = [...data].reverse();
  return (
    <div className='watchlist'>
      {modifiedData.map((item) => (
        <MovieItem key={item.id} movie={item} />
      ))}
    </div>
  );
}

export default WatchListContainer;
