import MovieCard from '../../components/movieCard/MovieCard';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import CastContainer from '../../components/cast/CastContainer';
import CrewContainer from '../../components/crew/CrewContainer';
import Similar from '../../components/similar/Similar';

const Details = () => {
  const { id } = useParams();
  const { loading, data, error } = useFetch(`movie/${id}`);
  const { loading: creditLoading, data: creditData, error: creditError } = useFetch(`movie/${id}/credits`);
  const { loading: similarLoading, data: similarData, error: similarError } = useFetch(`movie/${id}/similar?language=en-US&page=1`);

  return (
    <>
      <div className='movieDetailsSection'>
        {!loading && !!data && !!creditData ? (
          <div className='movieDetailsContainer'>
            <MovieCard data={data} cast={creditData.cast} crew={creditData.crew} />
          </div>
        ) : (
          <h1>loading</h1>
        )}
      </div>
      {creditData && creditData.cast && (
        <div className='movieCastContainer'>
          <CastContainer data={creditData.cast} />
          <CrewContainer data={creditData.crew} />
        </div>
      )}

      {!similarLoading && !!similarData && <Similar data={similarData} />}
    </>
  );
};

export default Details;
