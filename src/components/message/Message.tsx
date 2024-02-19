import './Message.scss';

const Meassage = ({ title, children }) => {
  return (
    <div className='message'>
      <h3>{title}</h3>
      <h4>{children}</h4>
    </div>
  );
};

export default Meassage;
