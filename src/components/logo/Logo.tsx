import { Link } from 'react-router-dom';
import LogoImage from '../../assets/movie-logo.png';
import './Logo.scss';

const Logo = () => {
  return (
    <div className='logo'>
      <Link to='/' className='logoLink'>
        <img src={LogoImage} alt='Movies Portal' title='movies-portal' className='logoImage' />
        <span className='logoTitle'>Movies Portal</span>
      </Link>
    </div>
  );
};

export default Logo;
