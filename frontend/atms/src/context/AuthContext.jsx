import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      axios.get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
    }
  }, [token]);

  const register = async (name, email, password, role, navigate) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const text = await response.text(); 
      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        throw new Error(data.message || "Signup failed!");
      }

      setUser(data.user);
      alert("Signup successful!");
      navigate("/login"); 
    } catch (error) {
      console.error("Signup error:", error.message);
      alert(error.message);
    }
  };

  const login = async (name, password, navigate) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { name, password });

      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      if (res.data.user.role === "landlord") {
        navigate("/landlord");
      } else if (res.data.user.role === "tenant") {
        navigate("/tenant-dashboard");
      } else if (res.data.user.role === "maintenance") {
        navigate("/maintenance-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const logout = (navigate) => {
    setToken(null);
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login"); 
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
