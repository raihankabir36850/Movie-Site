import MovieCard from '../../components/movieCard/MovieCard';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import CastContainer from '../../components/cast/CastContainer';
import CrewContainer from '../../components/crew/CrewContainer';
import Similar from '../../components/similar/Similar';
import './Details.scss';

const Details = () => {
  const { id } = useParams();
  const { loading, data, error } = useFetch(`movie/${id}`);

  return (
    <>
      <div className='movieDetailsSection'>
        {!loading && !!data ? (
          <div className='movieDetailsContainer'>
            <MovieCard data={data} cast={[]} crew={[]} />
          </div>
        ) : (
          <h1>loading</h1>
        )}
      </div>

      <div className='movieCastContainer'>
        <CastContainer id={id} />

        {/* <CrewContainer data={[]} /> */}
      </div>
      <div className='similarMoviesSection'>
        <Similar />
      </div>
    </>
  );
};

export default Details;
