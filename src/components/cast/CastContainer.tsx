import './CastContainer.scss';
import CastItem from './CastItem';
import useFetch from '../../hooks/useFetch';
import Title from '../title/Title';

const CastContainer = ({ id }) => {
  const { loading, data, error } = useFetch(`movie/${id}/credits`);
  return (
    <div className='castHeroSection'>
      {!loading && !!data && <Title title='Top Cast' />}
      <div className='castWrapper'>{!loading && !!data && data.cast.map((item) => <CastItem key={item.id} res={item} />)}</div>
    </div>
  );
};

export default CastContainer;
