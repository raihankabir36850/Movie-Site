import Logo from '../logo/Logo';
import './NavBar.scss';
import TopNav from './TopNav';

const NavBar = () => {
  return (
    <nav className='navSection'>
      <Logo />
      <label className='hamburgerMenu'>
        <input type='checkbox' />
      </label>
      <TopNav />
    </nav>
  );
};

export default NavBar;
