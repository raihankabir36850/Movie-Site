import SliderWrapper from '../slider/SliderWrapper';
import SimilarItem from './SimilarItem';
import './Similar.scss';

interface SimilarProps {
  data: {
    adult: boolean;
    backdrop_path: string;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];
}

const Similar = ({ data }: SimilarProps) => {
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
