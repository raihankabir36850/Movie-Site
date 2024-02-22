import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import type { RootState } from '../../store/store';
import HeaderTitle from '../../components/title/HeaderTitle';
import HeaderDes from '../../components/title/HeaderDes';
import Container from '../../components/container/Container';
import WatchListContainer from '../../components/watchList/WatchListContainer';
import Footer from '../../components/footer/Footer';
import './WatchList.scss';

const WatchList = () => {
  const watchListString = localStorage.getItem('watchList');
  const watchListItems = watchListString ? JSON.parse(watchListString) : [];
  const [data, setData] = useState(watchListItems.length > 1 ? watchListItems : []);
  const { watchList } = useSelector((state: RootState) => state.home);

  useEffect(() => {
    setData(watchList);
  }, [watchList, watchList.length]);

  return (
    <>
      {data && data.length > 0 ? (
        <>
          <div className='watchListSection'>
            <div className='watchListContainer'>
              <div className='watListDetails'>
                <HeaderTitle text='WatchList' />
                <HeaderDes>Your Gateway to Cinematic Adventures - Explore, Organize, and Never Miss a Must-See Film Again!</HeaderDes>
              </div>
              <div className='watListMovies'>
                <Container>
                  <WatchListContainer data={data} />
                </Container>
              </div>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <h1>no item is available.</h1>
      )}
    </>
  );
};

export default WatchList;
