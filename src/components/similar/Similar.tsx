import SliderWrapper from '../slider/SliderWrapper';
import SimilarItem from './SimilarItem';
import './Similar.scss';

const Similar = ({ data }) => {
  return (
    <div className='similarWrapper'>
      <SliderWrapper>
        {data.map((item) => (
          <SimilarItem key={item.id} res={item} />
        ))}
      </SliderWrapper>
    </div>
  );
};

export default Similar;
