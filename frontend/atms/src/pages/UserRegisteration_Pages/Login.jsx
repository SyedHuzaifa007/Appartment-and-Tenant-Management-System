import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "../../styling/UserRegisterationStyling/login.css";
import show from "../../../src/assets/show.png";
import hide from "../../../src/assets/hide.png";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password, navigate);
  };

  return (
  <div className="auth-page">
  <div className="auth-form-wrapper">
    <div className="auth-card">
    <div className="relative min-h-screen flex items-center justify-center bg-black/50">
      <div className="login-blur-bg" />
         <div className="absolute top-12 text-center z-10">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-md">Property Hub</h1>
        <p className="text-lg text-blue-100 mt-1 drop-shadow-sm">Apartment and Tenant Management System</p>
      </div>
      <div className="z-10 w-full max-w-md bg-white/60 backdrop-blur-md p-8 rounded-xl shadow-xl">
        <div className="flex justify-center mb-6">
          <button className="px-5 py-2 bg-blue-600 text-white rounded-l-lg">Login</button>
          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 bg-gray-100 text-gray-700 rounded-r-lg hover:bg-gray-200"
          >
            Register
          </button>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">Welcome back</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">Enter your credentials to access your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700"><b>Username</b></label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
                    <div className="relative">
            <label className="text-sm font-medium text-gray-700"><b>Password</b></label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:outline-none pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px]"
              tabIndex={-1}
            >
              <img
                src={showPassword ? show : hide}
                alt="Toggle password visibility"
                className="w-5 h-5 opacity-70 hover:opacity-100"
              />
            </button>
          </div>

          <button onClick={handleSubmit} type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg mt-4 hover:bg-blue-700">
            Login →
          </button>
        </form>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Login;
