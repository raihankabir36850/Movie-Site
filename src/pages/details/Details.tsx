import MovieCard from '../../components/movieCard/MovieCard';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import CastContainer from '../../components/cast/CastContainer';
import CrewContainer from '../../components/crew/CrewContainer';
import Similar from '../../components/similar/Similar';
import Footer from '../../components/footer/Footer';
import Loader from '../../components/loader/Loader';

import './Details.scss';

const Details = () => {
  const { id } = useParams();
  const { loading, data, error } = useFetch(`movie/${id}`);

  return (
    <>
      <div className='movieDetailsSection'>
        {!loading && !!data ? (
          <>
            <div className='movieDetailsContainer'>
              <MovieCard data={data} cast={[]} crew={[]} />
            </div>
            <div className='movieCastContainer'>
              <CastContainer id={id} />

              {/* <CrewContainer data={[]} /> */}
            </div>
            <div className='similarMoviesSection'>
              <Similar />
            </div>
            <Footer />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Details;
