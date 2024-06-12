import { ReactNode } from 'react';
import './HeaderDes.scss';

interface ContainerProps {
  children: ReactNode;
}

const HeaderDes = ({ children }: ContainerProps) => {
  return <div className='descCategory'>{children}</div>;
};

export default HeaderDes;
