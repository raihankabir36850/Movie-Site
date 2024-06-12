import MovieCard from '../../components/movieCard/MovieCard';
import { useEffect, useState } from 'react';
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
  success: boolean;
  status_code: number;
  status_message: string;
}

interface CastMember {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

interface CrewMember {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: string;
  profile_path: string | null;
}

interface CastDataProps {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

interface SimilarData {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

const Details = () => {
  const { id } = useParams<{ id: string; genreType: string }>();
  const [showError, setShowError] = useState(false);
  const { loading, data } = useFetch<MovieData>(`movie/${id}`);
  const { loading: castLoading, data: castData } = useFetch<CastDataProps>(`movie/${id}/credits`);
  const { loading: similarLoading, data: similarData } = useFetch<SimilarData>(`movie/${id}/similar?language=en-US&page=1`);

  useEffect(() => {
    setShowError(false);
  }, [id]);

  useEffect(() => {
    if (data && (!data?.success || {})) {
      setShowError(true);
    }
  }, [data]);

  //mistakenly type wrong movie id-----> redirect to 404 page
  const movieId = parseInt(id as string, 10);
  if (isNaN(movieId) || movieId.toString() !== id) {
    return <Message title='Warning! An error was detected'>Publications at this address of the website are not found or you do not have permissions to view the information at this address.</Message>;
  }

  return (
    <>
      <div className='movieDetailsSection'>
        {!loading && !!data && data.id ? (
          <>
            <div className='movieDetailsContainer'>{castData && <MovieCard data={data} castData={castData} />}</div>
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
