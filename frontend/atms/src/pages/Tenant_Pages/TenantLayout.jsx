import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavTenant from '../Tenant_Pages/Tenant_NavBar';
import '../../styling/LandlordStyling/LandlordLayout.css';
import menuIcon from '../../assets/MenuIcon_Black.png';

const TenantLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout=()=>{
    navigate('/login')
  }

  return (
    <div className="layout-container">
      <NavTenant collapsed={isCollapsed} />

      <div className={`content-wrapper ${isCollapsed ? 'expanded' : ''}`}>
        <header className="topbar">
          <img src={menuIcon} alt="Show/Hide" className="menuIcon" onClick={toggleSidebar} />
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </header>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TenantLayout;
