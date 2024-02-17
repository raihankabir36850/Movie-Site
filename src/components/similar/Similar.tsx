import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import Title from '../title/Title';
import SliderWrapper from '../slider/SliderWrapper';
import SimilarItem from './SimilarItem';

import './Similar.scss';

const Similar = () => {
  const { id } = useParams();
  const { loading, data, error } = useFetch(`movie/${id}/similar?language=en-US&page=1`);

  const modifiedData = data?.results?.filter((item) => item.backdrop_path !== null);
  console.log('modofied', modifiedData);

  return (
    <div className='similarWrapper'>
      {!loading && !!modifiedData && <Title title='Similar Movies' />}
      {!loading && !!modifiedData && (
        <SliderWrapper>
          {modifiedData.map((item) => (
            <SimilarItem key={item.id} res={item} />
          ))}
        </SliderWrapper>
      )}
    </div>
  );
};

export default Similar;
