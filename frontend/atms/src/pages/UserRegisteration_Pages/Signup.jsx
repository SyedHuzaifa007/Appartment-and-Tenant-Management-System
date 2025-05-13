import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "../../styling/UserRegisterationStyling/login.css";
import show from "../../../src/assets/show.png";
import hide from "../../../src/assets/hide.png";
import { ToastContainer } from "react-toastify";

const Signup = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Landlord");
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(name, email, password, role, navigate);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black/50">
      <ToastContainer />
      <div className="login-blur-bg" />
      <div className="absolute top-12 text-center z-10">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-md">Property Hub</h1>
        <p className="text-lg text-blue-100 mt-1 drop-shadow-sm">Apartment and Tenant Management System</p>
      </div>
      <div className="z-10 w-full max-w-md bg-white/60 backdrop-blur-md p-8 rounded-xl shadow-xl mt-30">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 bg-gray-100 text-gray-700 rounded-l-lg hover:bg-gray-200"
          >
            Login
          </button>
          <button className="px-5 py-2 bg-blue-600 text-white rounded-r-lg">Register</button>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">Create an account</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">Sign up to manage your property</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700"><b>Username</b></label>
            <input
              type="username"
              value={name}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700"><b>Email</b></label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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


          <div className="text-sm font-medium text-gray-700"><b>I am a:</b></div>
          <div className="flex gap-4">
            {["Landlord", "Tenant", "Maintenance"].map((r) => (
              <label key={r} className="flex items-center gap-1">
                <input
                  type="radio"
                  value={r}
                  checked={role === r}
                  onChange={() => setRole(r)}
                  className="accent-blue-600"
                />
                {r}
              </label>
            ))}
          </div>
          <button onClick={handleSubmit} type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg mt-4 hover:bg-blue-700">
            Register →
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
