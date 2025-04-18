import { NavLink } from 'react-router-dom';

const NavLandlord = () => {
  return (
    <nav>
      <NavLink to="/landlord/home">Home</NavLink>
      <NavLink to="/landlord/properties">Properties</NavLink>
      <NavLink to="/landlord/staff">Staff</NavLink>
      <NavLink to="/landlord/finances">Finances</NavLink>
      <NavLink to="/landlord/profile">Profile</NavLink>
      <NavLink to="/landlord/settings">Settings</NavLink>
    </nav>
  );
};

export default NavLandlord;
