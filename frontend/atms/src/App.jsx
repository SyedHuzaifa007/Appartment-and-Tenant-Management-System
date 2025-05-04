import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./styling/global-style.css"

import Login from "./pages/UserRegisteration_Pages/Login";
import Signup from "./pages/UserRegisteration_Pages/Signup";
import axios from "axios";

import LandlordLayout from "./pages/Lanlord_Pages/LanlordLayout";
import HomePage from "./pages/Lanlord_Pages/HomePage";
import PropertiesPage from "./pages/Lanlord_Pages/PropertiesPage";
import StaffPage from "./pages/Lanlord_Pages/StaffPage";
import FinancesPage from './pages/Lanlord_Pages/FinancesPage';
import ProfilePage from "./pages/Lanlord_Pages/ProfilePage";
import SettingsPage from "./pages/Lanlord_Pages/SettingsPage";
import TenantsPage from "./pages/Lanlord_Pages/TenantsPage";


import TenantLayout from "./pages/Tenant_Pages/TenantLayout";
import THomePage from './pages/Tenant_Pages/HomePage'
import TPayments from './pages/Tenant_Pages/TenantPaymentsPage'
import TMaintainance from './pages/Tenant_Pages/TenantsMaintainancePage'
import TProfile from './pages/Tenant_Pages/TenantsProfilePage'
import TSettings from './pages/Tenant_Pages/TenantsSettings'

import Maintenance_HomePage from "./pages/Maintenance_Pages/Maintenance_HomePage";
import Maintenance_RequestsPage from "./pages/Maintenance_Pages/Maintenance_RequestPage";
import Maintenance_ProfilePage from "./pages/Maintenance_Pages/Maintenance_ProfilePage";
import Maintenance_SettingsPage from "./pages/Maintenance_Pages/Maintenance_SettingsPage";
import Maintenance_Layout from "./pages/Maintenance_Pages/Maintenance_Layout";


function App() {

  const [theme, setTheme] = useState('light');
    useEffect(() => {
        const savedTheme = localStorage.getItem('app-theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);
    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('app-theme', theme);
    }, [theme]);
    const handleThemeToggle = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

  useEffect(() => {
    axios.get("http://localhost:5000/")
      .catch((err) => console.error(err));
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/landlord" element={<LandlordLayout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="properties" element={<PropertiesPage />} />
            <Route path="properties/:id" element={<TenantsPage />} />
            <Route path="staff" element={<StaffPage />} />
            <Route path="finances" element={<FinancesPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage theme={theme} handleThemeToggle={handleThemeToggle} />} />
          </Route>

          <Route path="/tenant" element={<TenantLayout />}>
            <Route path="home" element={<THomePage />} />
            <Route path="payments" element={<TPayments />} />
            <Route path="maintainance" element={<TMaintainance />} />
            <Route path="profile" element={<TProfile />} />
            <Route path="settings" element={<TSettings theme={theme} handleThemeToggle={handleThemeToggle} />} />
          </Route>

          <Route path="/maintenance" element={<Maintenance_Layout />}>
          <Route path="home" element={<Maintenance_HomePage />} />
          <Route path="requests" element={<Maintenance_RequestsPage />} />
          <Route path="profile" element={<Maintenance_ProfilePage />} />
          <Route path="settings" element={<Maintenance_SettingsPage theme={theme} handleThemeToggle={handleThemeToggle} />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
