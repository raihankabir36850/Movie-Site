import MovieCard from '../../components/movieCard/MovieCard';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import CastContainer from '../../components/cast/CastContainer';
import CrewContainer from '../../components/crew/CrewContainer';
import Similar from '../../components/similar/Similar';
import Footer from '../../components/footer/Footer';
import Loader from '../../components/loader/Loader';
import Title from '../../components/title/Title';

import './Details.scss';

const Details = () => {
  const { id } = useParams();
  const { loading, data } = useFetch(`movie/${id}`);
  const { loading: similarLoading, data: similarData } = useFetch(`movie/${id}/similar?language=en-US&page=1`);

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
            {!similarLoading && !!similarData && similarData.results.length > 0 && (
              <div className='similarMoviesSection'>
                <Title title='Similar Movies' />
                <Similar data={similarData.results} />
              </div>
            )}

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
