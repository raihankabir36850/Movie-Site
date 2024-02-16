import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import './MovieCard.scss';

const toHoursAndMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes > 0 ? ` ${minutes}m` : ''}`;
};

const getYearFromDate = (dateString) => {
  // Split the date string by the dash (-) character
  const parts = dateString.split('-');
  // The year is the first part of the split array
  const year = parts[0];
  return year;
};

const MovieCard = ({ data }) => {
  const { id, backdrop_path, imdb_id, title, overview, release_date, runtime, vote_average, genres } = data;

  const { url } = useSelector((state: RootState) => state.home);
  return (
    <div className='movieCard'>
      <div className='movieCardWithPoster'>
        <img src={url.backdrop + backdrop_path} />
      </div>
      <div className='movieCardWithDetails'>
        <div className='movieDetails'>
          <h1 className='movieTitle'>{title}</h1>
          <div className='movieInfo'>
            <span className='status'>Status : Released</span>
            <span className='year'>Year :{getYearFromDate(release_date)}</span>
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
          <div className='movieOtherDetails'></div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
