import './CrewItem.scss';

interface CrewMember {
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
  profile_path: string | null;
}

interface CrewItemProps {
  type: string;
  data: CrewMember[];
}

const CrewItem = ({ type, data }: CrewItemProps) => {
  return (
    <div className='tab'>
      <input type='checkbox' name={`accordion-${type}`} id={`${type}`} defaultChecked={false} />
      <label htmlFor={`${type}`} className='tabLabel'>
        {type}
      </label>
      <div className='tabContent'>
        <p>
          {data.map((element, index) => (
            <span key={`${element.id}-${index}`}>
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
