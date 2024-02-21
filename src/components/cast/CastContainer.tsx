import './CastContainer.scss';
import CastItem from './CastItem';
import Title from '../title/Title';
import SliderWrapper from '../slider/SliderWrapper';

const CastContainer = ({ data }) => {
  return (
    <div className='castHeroSection'>
      {data.length > 0 && <Title title='Top Cast' />}
      {data.length >= 5 ? (
        <SliderWrapper>
          {data.map((item) => (
            <CastItem key={item.id} res={item} />
          ))}
        </SliderWrapper>
      ) : (
        <div className='castWrapper'>
          {data.map((item) => (
            <CastItem key={item.id} res={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CastContainer;
