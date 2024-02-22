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
import './Genre.scss';

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
}

interface GenreData {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

const Genre = () => {
  const { genres } = useSelector((state: RootState) => state.home);
  const { id, genreType } = useParams<{ id: string; genreType: string }>(); // Correct type for useParams
  const [genreData, setGenreData] = useState<MovieData[]>([]); // Correct type for genreData
  const [text, setText] = useState<string>(''); // Correct type for text
  const [page, setPage] = useState<number>(1); // Correct type for page
  const [totalPages, setTotalPages] = useState<number | null>(null); // Correct type for totalPages
  const { loading, data, error } = useFetch<GenreData>(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${id}`);
  // const { genres } = useSelector((state: RootState) => state.home);
  // const { id, genreType } = useParams();
  // const [genreData, setGenreData] = useState<MovieData[]>([]);
  // const [text, setText] = useState('');
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState<number | null>(null);
  // const { loading, data, error } = useFetch<GenreData>(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${id.toString()}`);

  useEffect(() => {
    setGenreData([]);
    setText('');
    setPage(1);
  }, [id, genreType]);

  useEffect(() => {
    if (genres.length > 0 && data && data.results) {
      const isChecked = genres.find((item) => item.id.toString() === id);
      const isCheckedGenre = genres.find((item) => item.name.toLowerCase() == genreType);
      if (isChecked && isCheckedGenre) {
        setText(isChecked.name);
        // eslint-disable-next-line no-unsafe-optional-chaining
        setGenreData((prevData) => [...prevData, ...data?.results]);
        if (!totalPages) {
          setTotalPages(5 || data?.total_pages);
        }
      } else {
        setText('Error');
      }
    }
  }, [genres, data]);

  const fetchData = () => {
    setPage((prevPage) => (totalPages && prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  return (
    <>
      {loading && genreData.length === 0 ? (
        <Loader />
      ) : error ? (
        <Message title='Warning! An error was detected'>Publications at this address of the website are not found or you do not have permissions to view the information at this address.</Message>
      ) : (
        <>
          {!!genreData && genreData.length > 0 && (
            <div className='watchListSection'>
              <div className='watchListContainer'>
                <div className='watListDetails'>
                  <HeaderTitle text={text} />
                </div>
                <div className='watListMovies'>
                  <InfiniteScroll dataLength={genreData.length} next={fetchData} hasMore={true} loader={page <= 5 ? <p className='customLoading'>Loading...</p> : null}>
                    <Container>
                      <GenreContainer data={genreData} />
                    </Container>
                  </InfiniteScroll>
                </div>
              </div>
            </div>
          )}
          {text === 'Error' && (
            <Message title='Warning! An error was detected'>Publications at this address of the website are not found or you do not have permissions to view the information at this address.</Message>
          )}
          <Footer />
        </>
      )}
    </>
  );
};

export default Genre;
