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
import InfiniteScroll from 'react-infinite-scroll-component';

const Genre = () => {
  const { genres } = useSelector((state: RootState) => state.home);
  const { id } = useParams();
  const [genreData, setGenreData] = useState([]);
  const [text, setText] = useState('');
  const [page, setPage] = useState(1);
  const { loading, data } = useFetch(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${id.toString()}`);

  useEffect(() => {
    // Clear genreData when component unmounts or when genre changes
    return () => {
      setGenreData([]);
      setText('');
      setPage(1);
    };
  }, [id]);

  useEffect(() => {
    if (genres.length > 0 && data && data.results) {
      const isChecked = genres.find((item) => item.id == id);
      if (isChecked) {
        setText(isChecked.name);
        setGenreData((prevData) => [...prevData, ...data.results]);
      }
    }
  }, [data, genres]);

  const fetchData = () => {
    setPage((prevPage) => (prevPage + 1 <= 5 ? prevPage + 1 : prevPage));
  };

  return (
    <>
      {loading && genreData.length === 0 ? (
        <Loader />
      ) : (
        <>
          {!!genreData && genreData.length > 0 ? (
            <>
              <div className='watchListSection'>
                <div className='watchListContainer'>
                  <div className='watListDetails'>
                    <HeaderTitle text={text} />
                  </div>
                  <div className='watListMovies'>
                    <InfiniteScroll dataLength={genreData.length} next={fetchData} hasMore={true}>
                      <Container>
                        <GenreContainer data={genreData} />
                      </Container>
                    </InfiniteScroll>
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
