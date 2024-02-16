import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { useDispatch } from 'react-redux';
import { getWatchListItem } from '../../store/moviesDetails';
import './MovieCard.scss';

const toHoursAndMinutes = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes > 0 ? ` ${minutes}m` : ''}`;
};

const getYearFromDate = (dateString: string) => {
  const parts = dateString.split('-');
  const year = parts[0];
  return year;
};

const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
};

const MovieCard = ({ data, cast, crew }) => {
  const { url, watchList } = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch();
  const { id, backdrop_path, imdb_id, title, overview, release_date, runtime, vote_average, genres, tagline } = data;
  const director = crew.filter((item) => item.job === 'Director');
  const writers = crew.filter((item) => item.job === 'Screenplay' || item.job === 'Story' || item.job === 'Writer');

  const handleAddWatchItem = () => {
    const data = {
      id: id,
      addedDate: formatDate(new Date()),
    };

    const check = watchList.find((item) => item.id === id);

    if (check) return;

    const modifiedWatchList = [...watchList, data];
    dispatch(getWatchListItem(modifiedWatchList));
  };

  const handleremoveWatchItem = () => {
    const modifiedList = watchList.filter((item) => item.id !== id);
    dispatch(getWatchListItem(modifiedList));
  };

  return (
    <div className='movieCard'>
      <div className='movieCardWithPoster'>
        <img src={url.backdrop + backdrop_path} />
      </div>
      <div className='movieCardWithDetails'>
        <div className='movieDetails'>
          <h1 className='movieTitle'>
            {title} ({getYearFromDate(release_date)})
          </h1>
          {tagline && <p className='movieTagLine'>{tagline}</p>}
          <div className='movieInfo'>
            <span className='status'>Status : Released</span>
            <span className='releaseDate'>Release Date : {formatDate(release_date)}</span>
            <span className='duration'>Runtime : {toHoursAndMinutes(runtime)}</span>
          </div>
          <div className='movieGenre'>
            {genres.map((element, index) => (
              <span key={element.id}>
                {element.name}
                {index !== genres.length - 1 && ', '}
              </span>
            ))}
          </div>
          <div className='moviePlot'>{overview}</div>
          <div className='movieOtherDetails'>
            <span>Rating: {vote_average.toFixed(1)}</span>
          </div>
          {director?.length && (
            <div className='directors'>
              <span>Director: </span>
              <span>
                {director.map((item, index) => (
                  <span key={item.credit_id}>
                    {item.name}
                    {index !== director.length - 1 && ', '}
                  </span>
                ))}
              </span>
            </div>
          )}

          {writers?.length > 0 && (
            <div className='directors'>
              <span>Writer: </span>
              <span>
                {writers.map((item, index) => (
                  <span key={item.credit_id}>
                    {item.name}
                    {index !== writers.length - 1 && ', '}
                  </span>
                ))}
              </span>
            </div>
          )}

          <div className='imdbLink'>
            <a href={`https://www.imdb.com/title/${imdb_id}`} target='blank'>
              IMDB LINK
            </a>
          </div>
          <button type='button' onClick={() => handleAddWatchItem()}>
            Add to watchlist
          </button>
          <button type='button' onClick={() => handleremoveWatchItem()}>
            remove to watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;