import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import axios from "axios";

import LandlordLayout from "./pages/Lanlord_Pages/LanlordLayout";
import HomePage from "./pages/Lanlord_Pages/HomePage";

import TenantDashboard from "./pages/TenantDashboard";
import MaintenanceDashboard from "./pages/MaintenanceDashboard";

function App() {

  useEffect(() => {
    axios.get("http://localhost:5000/")
      .catch((err) => console.error(err));
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/landlord" element={<LandlordLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/properties" element={<HomePage />} />
            <Route path="/staff" element={<HomePage />} />
            <Route path="/finances" element={<HomePage />} />
            <Route path="/profile" element={<HomePage />} />
            <Route path="/settings" element={<HomePage />} />
          </Route>

          <Route path="/tenant-dashboard" element={<TenantDashboard />}></Route>
          <Route path="/maintenance-dashboard" element={<MaintenanceDashboard />}></Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
