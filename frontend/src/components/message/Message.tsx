import { ReactNode } from 'react';
import './Message.scss';

interface MessageProps {
  title: string;
  children: ReactNode;
}

const Meassage = ({ title, children }: MessageProps) => {
  return (
    <div className='message'>
      <h3>{title}</h3>
      <h4>{children}</h4>
    </div>
  );
};

export default Meassage;
