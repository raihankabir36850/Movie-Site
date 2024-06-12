import './castContainer.scss';
import CastItem from './CastItem';
import Title from '../title/Title';
import SliderWrapper from '../slider/SliderWrapper';

interface CastMember {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string | null; // Assuming profile_path could be null
}

interface CastContainerProps {
  data: CastMember[];
}

const CastContainer = ({ data }: CastContainerProps) => {
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
