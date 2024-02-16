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
        {filteredByProduction.length > 0 && <h1>filteredByProduction: {filteredByProduction.length}</h1>}
        {filteredBySound.length > 0 && <h1>filteredBySound: {filteredBySound.length}</h1>}
        {filteredByArt.length > 0 && <h1>filteredByArt: {filteredByArt.length}</h1>}
        {filteredByEditing.length > 0 && <h1>filteredByEditing: {filteredByEditing.length}</h1>}
        {filteredByCamera.length > 0 && <h1>filteredByCamera: {filteredByCamera.length}</h1>}
        {filteredByCostume.length > 0 && <h1>filteredByCostume: {filteredByCostume.length}</h1>}
      </>
    </div>
  );
};

export default CrewContainer;
