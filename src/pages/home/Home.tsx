import HeroBanner from '../../components/heroBanner/HeroBanner';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';

const Home = () => {
  //console.log('this is the point where');
  return (
    <div className='homePage-section'>
      <HeroBanner />
      <ContentWrapper />
    </div>
  );
};

export default Home;
