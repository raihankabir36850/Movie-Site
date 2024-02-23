import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { useDispatch } from 'react-redux';
import { getWatchListItem } from '../../store/moviesDetails';
import WatchListButton from '../watchList/WatchListButton';
import ImdbLogo from '../logo/ImdbLogo';
import posterImage from '../../assets/no_poster.jpg';
import { toast } from 'react-toastify';
import { formatWithtDate, getYearFromDate, toHoursAndMinutes } from '../../utils/dateFormat';
import 'react-toastify/dist/ReactToastify.css';
import './MovieCard.scss';

interface CastData {
  id: number;
  cast: any[];
  crew: any[];
}
interface MovieData {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  imdb_id: string;
  runtime: number;
  tagline: string;
  genres: Array<{ id: number; name: string }>;
}

interface MovieDataProps {
  data: MovieData;
  castData: CastData;
}

const MovieCard = ({ data, castData }: MovieDataProps) => {
  const { url, watchList } = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch();
  const { id, poster_path, imdb_id, title, overview, release_date, runtime, vote_average, genres, tagline } = data;
  const imgUrl = poster_path ? url.poster + poster_path : posterImage;

  const director = castData?.crew.filter((item) => item.job === 'Director');
  const writers = castData?.crew.filter((item) => item.job === 'Screenplay' || item.job === 'Story' || item.job === 'Writer');

  const handleAddWatchItem = () => {
    const data = {
      id: id,
      movieTitle: title,
      moviePoster: poster_path,
      voteAverage: vote_average,
      addedDate: formatWithtDate(new Date()),
    };

    const check = watchList.find((item) => item.id === id);

    if (check) {
      toast.warn('Already added', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'colored',
      });

      return;
    }
    const modifiedWatchList = [...watchList, data];
    toast.success('Add to the watchlist', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: 'colored',
    });
    dispatch(getWatchListItem(modifiedWatchList));
  };

  return (
    <div className='movieCard'>
      <div className='movieCardWithPoster'>
        <img src={imgUrl} />
      </div>
      <div className='movieCardWithDetails'>
        <div className='movieDetails'>
          <h1 className='movieTitle'>
            {title} {release_date && <span>({getYearFromDate(release_date)})</span>}
          </h1>
          {tagline && <p className='movieTagLine'>{tagline}</p>}
          <div className='movieInfo'>
            <div className='status'>
              <span>Status</span>
              <span>Released</span>
            </div>
            <div className='releaseDate'>
              <span>Release Date</span>
              <span>{release_date ? formatWithtDate(release_date) : 'N/A'}</span>
            </div>
            <div className='duration'>
              <span>Runtime</span>
              <span>{runtime ? toHoursAndMinutes(runtime) : 'N/A'}</span>
            </div>
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

          {director?.length > 0 && (
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

          <div className='movieLinks'>
            <div className='imdbLink'>
              <ImdbLogo url={`https://www.imdb.com/title/${imdb_id}`} />
            </div>
            <WatchListButton handleAddWatchItem={() => handleAddWatchItem()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
