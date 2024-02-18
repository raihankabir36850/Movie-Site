import GenreItem from './GenreItem';

const removeDuplicates = (array) => {
  const map = new Map();
  return array.reduce((result, item) => {
    if (!map.has(item.id)) {
      map.set(item.id, true);
      result.push(item);
    }
    return result;
  }, []);
};

const GenreContainer = ({ data }) => {
  const modifiedData = removeDuplicates(data);
  return (
    <div className='watchlist'>
      {modifiedData.map((item) => (
        <GenreItem key={item.id + item.title} movie={item}></GenreItem>
      ))}
    </div>
  );
};

export default GenreContainer;
