import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      axios.get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      });
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
    navigate("/login");
    toast.success("Signup successful!", {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
      theme: "colored",
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    toast.error(error.message, {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
      theme: "colored",
    });
  }
};


  const login = async (name, password, navigate) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { name, password });

      setToken(res.data.token);
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("userID",res.data.user.id);
      console.log("User ID: ", sessionStorage.getItem("userID"));
      console.log("Token: ", sessionStorage.getItem("token"));

      setUser(res.data.user);
      if (res.data.user.role === "landlord" || res.data.user.role === "Landlord") {
        sessionStorage.setItem("showLoginToast", "true");
        console.log(sessionStorage.getItem("showLoginToast"))
        navigate("/landlord/home");
      } else if (res.data.user.role === "tenant" || res.data.user.role === "Tenant") {
        sessionStorage.setItem("showLoginToast", "true");
        navigate("/tenant/home");
      } else if (res.data.user.role === "maintenance" || res.data.user.role === "Maintenance") {
        sessionStorage.setItem("showLoginToast", "true");
        navigate("/maintenance/home");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      toast.error("Login failed. Check credentials.", {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "colored",
      });
    }
  };

  const logout = (navigate) => {
    setToken(null);
    localStorage.removeItem("token");
    sessionStorage.removeItem("userID");
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