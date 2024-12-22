import React, { createContext, useContext, useState, useEffect } from "react";
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

  // Function to get a new access token using the refresh token
  const refreshToken = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken"); // Get refresh token from cookies
      if (!refreshToken) {
        throw new Error("No refresh token found");
      }
      const response = await auth.refreshAccessToken(refreshToken); // Make a request to refresh the access token
      if (response && response.token) {
        // Update the token and user data in cookies
        Cookies.set("token", response.token);
        setUser((prevUser) => ({
          ...prevUser,
          token: response.token,
        }));
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout(); // Optionally log the user out if refreshing fails
    }
  };

  // Function to handle login
  const login = (userData) => {
    try {
      Cookies.set("token", userData.token); // Set the token in cookies
      Cookies.set("refreshToken", userData.refreshToken); // Store the refresh token
      Cookies.set("user", JSON.stringify(userData)); // Set the user data in cookies
      setUser(userData);
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
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Check if the token has expired and refresh it periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const token = Cookies.get("token");
      console.log("Token:", token);

      if (token) {
        // Check token expiration here
        const isTokenExpired = auth.isTokenExpired(token); // Use a method from your Auth class to check token expiration
        if (isTokenExpired) {
          refreshToken(); // Refresh the token if it has expired
        }
      }
    }, 60000); // 60000 ms = 1 minute

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

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
