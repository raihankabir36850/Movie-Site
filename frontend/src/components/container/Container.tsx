import { ReactNode } from 'react';
import './Content.scss';
interface ContainerProps {
  children: ReactNode;
}
const Container = ({ children }: ContainerProps) => {
  return <div className='containerWrapper'>{children}</div>;
};

export default Container;
