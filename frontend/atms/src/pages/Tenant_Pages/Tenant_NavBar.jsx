import { NavLink } from 'react-router-dom';
import '../../styling/LandlordStyling/Landlord_Navbar.css';

import homeIcon from '../../assets/HomeIcon_Grey.png';
import staffIcon from '../../assets/StaffIcon_Grey.png';
import financesIcon from '../../assets/FinancesIcon_Grey.png';
import profileIcon from '../../assets/ProfileIcon_Grey.png';
import settingsIcon from '../../assets/SettingsIcon_Grey.png';

const NavTenant = ({ collapsed }) => {
  return (
    <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <NavLink to="/tenant/home">
        <img src={homeIcon} className="icon" />
        {!collapsed && <span>Home</span>}
      </NavLink>

      <NavLink to="/tenant/payments">
        <img src={financesIcon} className="icon" />
        {!collapsed && <span>Payments</span>}
      </NavLink>

      <NavLink to="/tenant/maintainance">
        <img src={staffIcon} className="icon" />
        {!collapsed && <span>Maintainance</span>}
      </NavLink>

      <NavLink to="/tenant/profile">
        <img src={profileIcon} className="icon" />
        {!collapsed && <span>Profile</span>}
      </NavLink>

      <NavLink to="/tenant/settings">
        <img src={settingsIcon} className="icon" />
        {!collapsed && <span>Settings</span>}
      </NavLink>
    </nav>
  );
};

export default NavTenant;
