import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Signup from "./components/Signup";
import axios from "axios";
import LandlordDashboard from "./components/LandlordDashboard";
import TenantDashboard from "./components/TenantDashboard";
import MaintenanceDashboard from "./components/MaintenanceDashboard";

function App() {

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
          <Route path="/landlord-dashboard" element={<LandlordDashboard/>}></Route>
          <Route path="/tenant-dashboard" element={<TenantDashboard/>}></Route>
          <Route path="/maintenance-dashboard" element={<MaintenanceDashboard/>}></Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
