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
import Message from '../../components/message/Message';

const Genre = () => {
  const { genres } = useSelector((state: RootState) => state.home);
  const { id, genreType } = useParams();
  const [genreData, setGenreData] = useState([]);
  const [text, setText] = useState(null);
  const [page, setPage] = useState(1);
  //const [movieId, setMovieId] = useState(null);
  const { loading, data, error } = useFetch(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${id.toString()}`);

  useEffect(() => {
    return () => {
      setGenreData([]);
      setText(null);
      setPage(1);
      //setMovieId(null);
    };
  }, [id]);

  useEffect(() => {
    if (genres.length > 0 && data && data.results) {
      const isChecked = genres.find((item) => item.id == id);
      const isCheckedGenre = genres.find((item) => item.name.toLowerCase() == genreType);
      if (isChecked && isCheckedGenre) {
        setText(isChecked.name);
        //setMovieId(isChecked.id);
        setGenreData((prevData) => [...prevData, ...data.results]);
      } else {
        setText('Error');
      }
    }
  }, [genres, data, id, genreType]);

  const fetchData = () => {
    setPage((prevPage) => (prevPage + 1 <= 5 ? prevPage + 1 : prevPage));
  };

  return (
    <>
      {loading && genreData.length === 0 ? (
        <Loader />
      ) : error ? (
        <Message title='Warning! An error was detected'>Publications at this address of the website are not found or you do not have permissions to view the information at this address.</Message>
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
          ) : text === 'Error' ? (
            <Message title='Warning! An error was detected'>Publications at this address of the website are not found or you do not have permissions to view the information at this address.</Message>
          ) : null}
        </>
      )}
    </>
  );
};

export default Genre;
