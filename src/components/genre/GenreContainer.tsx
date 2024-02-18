import GenreItem from './GenreItem';

const GenreContainer = ({ data }) => {
  return (
    <div className='watchlist'>
      {data.map((item) => (
        <GenreItem key={item.id} movie={item}></GenreItem>
      ))}
    </div>
  );
};

export default GenreContainer;
