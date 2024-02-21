import SliderWrapper from '../slider/SliderWrapper';
import SimilarItem from './SimilarItem';

import './Similar.scss';

const Similar = ({ data }) => {
  const modifiedData = data?.filter((item) => item.backdrop_path !== null);

  return (
    <div className='similarWrapper'>
      <SliderWrapper>
        {modifiedData.map((item) => (
          <SimilarItem key={item.id} res={item} />
        ))}
      </SliderWrapper>
    </div>
  );
};

export default Similar;
