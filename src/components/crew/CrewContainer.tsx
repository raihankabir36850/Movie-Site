import Title from '../title/Title';
import CrewItem from './CrewItem';

const filterByType = (array, type, value) => {
  return array.filter((item) => item[type] === value);
};
const CrewContainer = ({ data }) => {
  const filteredByProduction = filterByType(data, 'known_for_department', 'Production');
  const filteredBySound = filterByType(data, 'known_for_department', 'Sound');
  const filteredByArt = filterByType(data, 'known_for_department', 'Art');
  const filteredByEditing = filterByType(data, 'known_for_department', 'Editing');
  const filteredByCamera = filterByType(data, 'known_for_department', 'Camera');
  const filteredByCostume = filterByType(data, 'known_for_department', 'Costume & Make-Up');

  return (
    <div>
      <>
        {(filteredByProduction.length || filteredBySound.length || filteredByArt.length || filteredByEditing.length || filteredByCamera.length || filteredByCostume.length) && <Title title='Crews' />}
        <div className='tabSection'>
          {filteredByProduction.length > 0 && <CrewItem type='Production' data={filteredByProduction} />}
          {filteredBySound.length > 0 && <CrewItem type='Sound' data={filteredBySound} />}
          {filteredByArt.length > 0 && <CrewItem type='Art' data={filteredByArt} />}
          {filteredByEditing.length > 0 && <CrewItem type='Editing' data={filteredByEditing} />}
          {filteredByCamera.length > 0 && <CrewItem type='Camrera' data={filteredByCamera} />}
          {filteredByCostume.length > 0 && <CrewItem type='Costume' data={filteredByCostume} />}
        </div>
      </>
    </div>
  );
};

export default CrewContainer;
