import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import HeaderTitle from '../../components/title/HeaderTitle';
import HeaderDes from '../../components/title/HeaderDes';
import Container from '../../components/container/Container';
import WatchListContainer from '../../components/watchList/WatchListContainer';
import { useEffect, useState } from 'react';
import './WatchList.scss';

const WatchList = () => {
  const [data, sestData] = useState([]);
  const { watchList } = useSelector((state: RootState) => state.home);

  useEffect(() => {
    sestData(watchList);
  }, [watchList, watchList.length]);

  return (
    <>
      {data && data.length > 0 ? (
        <div className='watchListSection'>
          <div className='watchListContainer'>
            <div className='watListDetails'>
              <HeaderTitle text='WatchList' />
              <HeaderDes>
                Watch action in hindi online – does not mean simply to watch a game cat and mouse the good hero with bad. Fighters – not just constant firing. The deep philosophy, subtle humour and
                lyrical scenes is not alien to this genre. Especially, if cult directors – James Cameron, Steven Spielberg, Luc Besson, etc. undertake creation of pictures. Planning to watch in the
                evening movies, pay attention to cast. There are so talented actors that one their presence can turn a picture into the real legend. If you like to watch movies online, then, has to
                be, are familiar with the main roles of actors. These are the rebels and fighters keeping the internal independence even in the most difficult situations. Heroes surprise with the
                courage and readiness at any time to support the words with business.
              </HeaderDes>
            </div>
            <div className='watListMovies'>
              <Container>
                <WatchListContainer data={data} />
              </Container>
            </div>
          </div>
        </div>
      ) : (
        <h1>no item is available.</h1>
      )}
    </>
  );
};

export default WatchList;
