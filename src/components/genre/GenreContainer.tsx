import GenreItem from './GenreItem';

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

const removeDuplicates = (array: any[]) => {
  const map = new Map();
  return array.reduce((result, item) => {
    if (!map.has(item.id)) {
      map.set(item.id, true);
      result.push(item);
    }
    return result;
  }, []);
};

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
