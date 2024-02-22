import Title from '../title/Title';
import CrewItem from './CrewItem';
import './CrewContainer.scss';

interface CrewContainerData {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: string;
  profile_path: string | null;
}

interface CrewContainerProps {
  data: CrewContainerData[];
}

const filterByType = (array: any[], type: string, value: string) => {
  return array.filter((item) => item[type] === value);
};
const CrewContainer = ({ data }: CrewContainerProps) => {
  const filteredByProduction = filterByType(data, 'known_for_department', 'Production');
  const filteredBySound = filterByType(data, 'known_for_department', 'Sound');
  const filteredByArt = filterByType(data, 'known_for_department', 'Art');
  const filteredByEditing = filterByType(data, 'known_for_department', 'Editing');
  const filteredByCamera = filterByType(data, 'known_for_department', 'Camera');
  const filteredByCostume = filterByType(data, 'known_for_department', 'Costume & Make-Up');

  return (
    <div className='crewContainer'>
      {(filteredByProduction.length > 0 || filteredBySound.length > 0 || filteredByArt.length > 0 || filteredByEditing.length > 0 || filteredByCamera.length > 0 || filteredByCostume.length > 0) && (
        <Title title='Crews' />
      )}
      <div className='tabSection'>
        {filteredByProduction.length > 0 && <CrewItem type='Production' data={filteredByProduction} />}
        {filteredBySound.length > 0 && <CrewItem type='Sound' data={filteredBySound} />}
        {filteredByArt.length > 0 && <CrewItem type='Art' data={filteredByArt} />}
        {filteredByEditing.length > 0 && <CrewItem type='Editing' data={filteredByEditing} />}
        {filteredByCamera.length > 0 && <CrewItem type='Camrera' data={filteredByCamera} />}
        {filteredByCostume.length > 0 && <CrewItem type='Costume' data={filteredByCostume} />}
      </div>
    </div>
  );
};

export default CrewContainer;
