import NavBar from '../../components/navBar/NavBar';
import HeroBanner from '../../components/heroBanner/HeroBanner';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';

const Home = () => {
  return (
    <div className='homePage-section'>
      <NavBar />
      <HeroBanner />
      <ContentWrapper />
    </div>
  );
};

export default Home;
