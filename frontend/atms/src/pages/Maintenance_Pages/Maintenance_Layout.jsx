import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavLandlord from '../Maintenance_Pages/Maintenance_NavBar';
import NavMaintenance from '../Maintenance_Pages/Maintenance_NavBar';
import '../../styling/LandlordStyling/LandlordLayout.css';
import menuIcon from '../../assets/MenuIcon_Black.png';

const Maintenance_Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout=()=>{
    navigate('/login')
  }

  return (
<div className="layout-container min-h-screen flex">
      <NavMaintenance collapsed={isCollapsed} />
      <div className={`content-wrapper flex-1 flex flex-col ${isCollapsed ? 'expanded' : ''}`}>
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

        <main className="main-content flex-grow px-6 py-4">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="w-full bg-gray-800 text-gray-200">
          <div className="max-w-screen-xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Property Hub</h2>
              <p className="text-gray-400">
                Apartment and Tenant Management System
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Pages</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="home" className="hover:underline">Dashboard</a></li>
                <li><a href="requests" className="hover:underline">Requests</a></li>
                <li><a href="profile" className="hover:underline">Profile</a></li>
                <li><a href="settings" className="hover:underline">Settings</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
              <p className="text-gray-400 text-sm">852-B Milaad St, Block B Faisal Town, Lahore, Pakistan</p>
              <p className="text-gray-400 text-sm">atms@gmail.com</p>
              <p className="text-gray-400 text-sm">+1 234 567 890</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.59-2.46.69a4.3 4.3 0 001.89-2.38c-.82.48-1.74.83-2.71 1.01a4.28 4.28 0 00-7.3 3.9A12.14 12.14 0 013 5.15a4.28 4.28 0 001.32 5.71 4.24 4.24 0 01-1.94-.54v.05c0 2.1 1.5 3.85 3.5 4.24a4.27 4.27 0 01-1.93.07c.54 1.69 2.1 2.92 3.95 2.96a8.6 8.6 0 01-5.32 1.84c-.34 0-.67-.02-1-.06a12.13 12.13 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2l-.01-.56A8.7 8.7 0 0024 4.59a8.57 8.57 0 01-2.54.7z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500 py-4 border-t border-gray-700">
            © {new Date().getFullYear()} Property Hub. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Maintenance_Layout;
