import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";  
import AuthContext from "../context/AuthContext";
import "../styles/login.css"; 

const Login = () => {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(name, password, navigate);  
  };

  return (
    <div className="login-container">
    <div className="login-box">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="input-field"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="input-field"
        />
        <button 
          type="submit" 
          className="login-button"
        >
          Login
        </button>
      </form>
    </div>
  </div>
  );
};

export default Login;
