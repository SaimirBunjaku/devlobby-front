import React, { createContext, useEffect, useState } from "react";
import { AuthService } from "../services/AuthService"

const AuthContext = createContext({
  token: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  isAdmin: false,
});

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isLoggedIn, setIsLoggedIn] = useState(token);
  const [userData, setUserData] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); 

  useEffect(() => {
    setIsLoggedIn(token);
    if (token) {
      const parsedToken = JSON.parse(atob(token.split('.')[1])); 
      const userId = parsedToken._id; 
      
      AuthService.getUserById(userId)
        .then((user) => {
          setUserData(user);
          setIsAdmin(user.isAdmin); 
        })
        .catch((error) => console.error("Error fetching user data:", error))
        .finally(() => setIsLoading(false));
    } else {
      setUserData(null);
      setIsLoading(false);
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
    setIsLoggedIn(true);
    localStorage.setItem("token", newToken);
  };

  const adminLogin = async (newToken) => {
    try {
      const parsedToken = JSON.parse(atob(newToken.split('.')[1]));
      const userId = parsedToken._id;
      const user = await AuthService.getUserById(userId);
      
      if (user.isAdmin) {
        setIsAdmin(true); 
        login(newToken);
      } else {
        console.error("User is not an admin.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const refreshUserData = async () => {
    if (!token) return;
  
    try {
      const parsedToken = JSON.parse(atob(token.split(".")[1]));
      const updatedUser = await AuthService.getUserById(parsedToken._id);
      setUserData(updatedUser);
    } catch (error) {
      console.error("Error fetching updated user data:", error);
    }
  };
  

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
    setUserData(null);
    setIsAdmin(false); 
    localStorage.removeItem("token");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, login, adminLogin, logout, userData, isAdmin, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };