import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavTenant from '../Tenant_Pages/Tenant_NavBar';
import '../../styling/LandlordStyling/LandlordLayout.css';
import menuIcon from '../../assets/MenuIcon_Black.png';
import TenantHomePage from './HomePage';

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
      <header className="topbar relative flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <img
        src={menuIcon}
        alt="Toggle Sidebar"
        onClick={toggleSidebar}
        className="w-5 h-5 cursor-pointer"
      />
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium"
      >
      Log Out
      </button>
      </header>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TenantLayout;
