import { NavLink } from 'react-router-dom';
import '../../styling/LandlordStyling/Landlord_Navbar.css';

import homeIcon from '../../assets/HomeIcon_Grey.png';
// import newHome from '../../assets/home.png';
import propertyIcon from '../../assets/PropertyIcon_Grey.png';
import staffIcon from '../../assets/StaffIcon_Grey.png';
import financesIcon from '../../assets/FinancesIcon_Grey.png';
import profileIcon from '../../assets/ProfileIcon_Grey.png';
import settingsIcon from '../../assets/SettingsIcon_Grey.png';

const NavLandlord = ({ collapsed }) => {
  return (
    <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className={`mb-5 mt-0 flex items-center justify-center gap-3 ${collapsed ? 'hidden' : 'flex'}`}>
      {/* <img src={newHome} alt="Home" className="w-8 h-8" /> */}
      <h1 className="text-2xl font-bold text-white font-sans tracking-wide">Property Hub</h1>
      </div>

      <NavLink to="/landlord/home">
        <img src={homeIcon} className="icon" />
        {!collapsed && <span>Home</span>}
      </NavLink>

      <NavLink to="/landlord/properties">
        <img src={propertyIcon} className="icon" />
        {!collapsed && <span>Properties</span>}
      </NavLink>

      <NavLink to="/landlord/staff">
        <img src={staffIcon} className="icon" />
        {!collapsed && <span>Maintenance</span>}
      </NavLink>

      <NavLink to="/landlord/finances">
        <img src={financesIcon} className="icon" />
        {!collapsed && <span>Finances</span>}
      </NavLink>

      <NavLink to="/landlord/profile">
        <img src={profileIcon} className="icon" />
        {!collapsed && <span>Profile</span>}
      </NavLink>

      <NavLink to="/landlord/settings">
        <img src={settingsIcon} className="icon" />
        {!collapsed && <span>Settings</span>}
      </NavLink>
    </nav>
  );
};

export default NavLandlord;
