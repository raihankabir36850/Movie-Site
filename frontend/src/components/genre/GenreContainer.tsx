import GenreItem from './GenreItem';
import { removeDuplicates } from '../../utils/services';

interface GenreItemData {
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
}

interface GenreItemDataProps {
  data: GenreItemData[];
}

const GenreContainer = ({ data }: GenreItemDataProps) => {
  const modifiedData = removeDuplicates(data);
  return (
    <div className='watchlist'>
      {modifiedData.map((item: any) => (
        <GenreItem key={item.id + item.title} movie={item}></GenreItem>
      ))}
    </div>
  );
};

export default GenreContainer;
