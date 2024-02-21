import MovieCard from '../../components/movieCard/MovieCard';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import CastContainer from '../../components/cast/CastContainer';
import CrewContainer from '../../components/crew/CrewContainer';
import Similar from '../../components/similar/Similar';
import Footer from '../../components/footer/Footer';
import Loader from '../../components/loader/Loader';
import Title from '../../components/title/Title';
import Message from '../../components/message/Message';

import './Details.scss';
import { useEffect, useState } from 'react';

const Details = () => {
  const { id } = useParams();
  const [showError, setShowError] = useState(false);
  const { loading, data } = useFetch(`movie/${id}`);
  const { loading: castLoading, data: castData } = useFetch(`movie/${id}/credits`);
  const { loading: similarLoading, data: similarData } = useFetch(`movie/${id}/similar?language=en-US&page=1`);

  useEffect(() => {
    setShowError(false);
  }, [id]);

  useEffect(() => {
    if (data && !data?.success) {
      setShowError(true);
    }
  }, [data]);

  //mistakenly type wrong movie id-----> redirect to 404 page
  const movieId = parseInt(id, 10);
  if (isNaN(movieId) || movieId.toString() !== id) {
    return <Message title='Warning! An error was detected'>Publications at this address of the website are not found or you do not have permissions to view the information at this address.</Message>;
  }

  return (
    <>
      <div className='movieDetailsSection'>
        {!loading && !!data && data.id ? (
          <>
            <div className='movieDetailsContainer'>
              <MovieCard data={data} castData={castData} />
            </div>
            <div className='movieCastContainer'>
              {!castLoading && !!castData && castData.cast.length > 0 && <CastContainer data={castData.cast} />}
              {!castLoading && !!castData && castData.cast.length > 0 && <CrewContainer data={castData.crew} />}
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
          <>
            {showError ? (
              <Message title='Warning! An error was detected'>
                Publications at this address of the website are not found or you do not have permissions to view the information at this address.
              </Message>
            ) : (
              <Loader />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Details;
