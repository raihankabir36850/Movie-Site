import './CrewItem.scss';

const CrewItem = ({ type, data }) => {
  console.log(data);
  return (
    <div className='tab'>
      <input type='checkbox' name={`accordion-${type}`} id={`${type}`} defaultChecked={false} />
      <label htmlFor={`${type}`} className='tabLabel'>
        {type}
      </label>
      <div className='tabContent'>
        <p>
          {data.map((element, index) => (
            <span key={element.id}>
              {element.original_name}
              {index !== data.length - 1 && ', '}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default CrewItem;
