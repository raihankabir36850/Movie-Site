import MovieCard from '../../components/movieCard/MovieCard';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const Details = () => {
  const { id } = useParams();
  const { loading, data, error } = useFetch(`movie/${id}`);
  console.log(data);

  return (
    <div className='movieDetailsSection'>
      {!loading && !!data ? (
        <div className='movieDetailsContainer'>
          <MovieCard data={data} />
        </div>
      ) : (
        <h1>loading</h1>
      )}
    </div>
  );
};

export default Details;
