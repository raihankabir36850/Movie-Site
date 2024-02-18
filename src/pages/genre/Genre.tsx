import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { RootState } from '../../store/store';
import useFetch from '../../hooks/useFetch';
import HeaderTitle from '../../components/title/HeaderTitle';
import Container from '../../components/container/Container';
import Footer from '../../components/footer/Footer';
import GenreContainer from '../../components/genre/GenreContainer';
import Loader from '../../components/loader/Loader';

const Genre = () => {
  const { genres } = useSelector((state: RootState) => state.home);
  const { id } = useParams();
  const [genreData, setGenreData] = useState([]);
  const [text, setText] = useState('');
  const [page, setPage] = useState(1);
  const { loading, data } = useFetch(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${id.toString()}`);

  useEffect(() => {
    const getGenreMoviesData = () => {
      if (genres.length > 0 && data && data.results) {
        const isChecked = genres.find((item) => item.id == id);
        if (isChecked) {
          setText(isChecked.name);
          setGenreData((res) => [...res, data?.results].flat());
        }
      }
    };

    getGenreMoviesData();
  }, [genres, id, data]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        setPage((page) => (page + 1 <= 5 ? page + 1 : page));
      }
    });
  });

  console.log('genre', genreData);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!!data && data?.results?.length > 0 ? (
            <>
              <div className='watchListSection'>
                <div className='watchListContainer'>
                  <div className='watListDetails'>
                    <HeaderTitle text={text} />
                  </div>
                  <div className='watListMovies'>
                    <Container>
                      <GenreContainer data={data?.results} />
                    </Container>
                  </div>
                </div>
              </div>
              <Footer />
            </>
          ) : (
            <p>No data available</p>
          )}
        </>
      )}
    </>
  );
};

export default Genre;
