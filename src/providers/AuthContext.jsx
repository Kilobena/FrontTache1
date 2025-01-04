import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import Auth from "../service/Auth";
import Cookies from "js-cookie"; // Importing js-cookie for handling cookies

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = Cookies.get("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user:", error);
      return null;
    }
  });

  const auth = new Auth();
  const logoutTimer = useRef(null); // Ref to store the logout timer

  // Function to handle login
  const login = (userData) => {
    try {
      Cookies.set("token", userData.token); // Set the token in cookies
      Cookies.set("user", JSON.stringify(userData)); // Set the user data in cookies
      setUser(userData);
      startLogoutTimer(); // Start the logout timer on login
    } catch (error) {
      console.error("Error storing user data during login:", error);
    }
  };

  // Function to update user data
  const updateUser = (updatedUserData) => {
    try {
      setUser((prevUser) => {
        const newUser = { ...prevUser, ...updatedUserData };
        Cookies.set("token", newUser.token); // Update token in cookies
        Cookies.set("user", JSON.stringify(newUser)); // Update user data in cookies
        return newUser;
      });
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // Function to logout
  const logout = () => {
    try {
      Cookies.remove("user"); // Remove user from cookies
      Cookies.remove("token"); // Remove token from cookies
      Cookies.remove("refreshToken"); // Remove refresh token from cookies
      setUser(null);
      clearLogoutTimer(); // Clear the logout timer on logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Start the logout timer
  const startLogoutTimer = () => {
    clearLogoutTimer(); // Clear any existing timer
    logoutTimer.current = setInterval(() => {
      console.log("Automatically logging out user...");
      logout(); // Log out the user after 30 minutes
    }, 30 * 60 * 1000); // 30 minutes
  };

  // Clear the logout timer
  const clearLogoutTimer = () => {
    if (logoutTimer.current) {
      clearInterval(logoutTimer.current);
      logoutTimer.current = null;
    }
  };

  // Start the logout timer when the component mounts if the user is already logged in
  useEffect(() => {
    if (user) {
      startLogoutTimer();
    }

    // Cleanup the timer when the component unmounts
    return () => {
      clearLogoutTimer();
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook for Auth
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
