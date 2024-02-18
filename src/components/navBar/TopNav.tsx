import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

import './TopNav.scss';

const TopNav = () => {
  const { genres } = useSelector((state: RootState) => state.home);
  return (
    <div className='topnav'>
      <NavLink to='/movie' id='movies'>
        Movies
      </NavLink>
      {genres && genres.length > 0 && (
        <div className='dropdown'>
          <button className='dropbtn'>Genres</button>
          <div className='dropdown-content'>
            {genres.map((genre) => {
              return (
                <NavLink key={genre.id} to={`/movies/${genre.name.toLowerCase()}/${genre.id}`}>
                  {genre.name}
                </NavLink>
              );
            })}
          </div>
        </div>
      )}

      <NavLink to='/watchlist' id='watchlist'>
        Watchlist
      </NavLink>
    </div>
  );
};

export default TopNav;
