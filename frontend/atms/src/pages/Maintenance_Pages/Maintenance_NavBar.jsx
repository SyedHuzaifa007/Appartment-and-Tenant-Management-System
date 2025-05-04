import { NavLink } from 'react-router-dom';
import '../../styling/LandlordStyling/Landlord_Navbar.css';

import homeIcon from '../../assets/HomeIcon_Grey.png';
import staffIcon from '../../assets/StaffIcon_Grey.png';
import profileIcon from '../../assets/ProfileIcon_Grey.png';
import settingsIcon from '../../assets/SettingsIcon_Grey.png';

const Maintenance_NavBar = ({ collapsed }) => {
  return (
    <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
       <div className={`mb-5 mt-0 flex items-center justify-center gap-3 ${collapsed ? 'hidden' : 'flex'}`}>
      {/* <img src={newHome} alt="Home" className="w-8 h-8" /> */}
      <h1 className="text-2xl font-bold text-white font-sans tracking-wide">Property Hub</h1>
      </div>
      
      <NavLink to="/maintenance/home">
        <img src={homeIcon} className="icon" />
        {!collapsed && <span>Home</span>}
      </NavLink>

      {/* <NavLink to="/maintenance/payments">
        <img src={financesIcon} className="icon" />
        {!collapsed && <span>Payments</span>}
      </NavLink> */}

      <NavLink to="/maintenance/requests">
        <img src={staffIcon} className="icon" />
        {!collapsed && <span>Requests</span>}
      </NavLink>

      <NavLink to="/maintenance/profile">
        <img src={profileIcon} className="icon" />
        {!collapsed && <span>Profile</span>}
      </NavLink>

      <NavLink to="/maintenance/settings">
        <img src={settingsIcon} className="icon" />
        {!collapsed && <span>Settings</span>}
      </NavLink>
    </nav>
  );
};

export default Maintenance_NavBar;
