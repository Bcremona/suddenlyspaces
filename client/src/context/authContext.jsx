import { useState, useEffect } from "react";
import { AuthContext } from "../hooks/auth-context";


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); 
  };

  const oneHour = 60 * 60 * 1000;
  
  setTimeout(() => {
    logout();
    console.log("Session expired, please log in again.");
  }, oneHour);
  

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};