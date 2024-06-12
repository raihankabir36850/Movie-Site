import './HeaderTitle.scss';

interface HeaderTitleProps {
  text: string;
}

const HeaderTitle = ({ text }: HeaderTitleProps) => {
  return <h1 className='headingArchive'>{text}</h1>;
};

export default HeaderTitle;
