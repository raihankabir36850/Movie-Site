import Logo from '../logo/Logo';
import './NavBar.scss';
import TopNav from './TopNav';

const NavBar = () => {
  return (
    <nav className='navSection'>
      <Logo />
      <TopNav />
    </nav>
  );
};

export default NavBar;
