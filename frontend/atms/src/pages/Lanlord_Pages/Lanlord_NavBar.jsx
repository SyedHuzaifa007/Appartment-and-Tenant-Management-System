import { NavLink } from 'react-router-dom';

const NavLandlord = () => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/home">Home</NavLink></li>
        <li><NavLink to="/properties">Properties</NavLink></li>
        <li><NavLink to="/staff">Staff</NavLink></li>
        <li><NavLink to="/finances">Finances</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li><NavLink to="/settings">Settings</NavLink></li>
      </ul>
    </nav>
  );
};

export default NavLandlord;
