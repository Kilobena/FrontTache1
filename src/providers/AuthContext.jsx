import React, { createContext, useContext, useState, useEffect } from "react";
import Auth from "../service/Auth";
import Cookies from "js-cookie";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = Cookies.get("user"); // Retrieve the user data from cookie
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user:", error);
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return Cookies.get("token") || null;
  });

  const auth = new Auth();

  const login = (userData) => {
    try {
      // Store token in HTTP-only cookie (secure and not accessible from JavaScript)
      Cookies.set("token", userData.token, { secure: true, sameSite: "Strict", expires: 1 });
      Cookies.set("user", JSON.stringify(userData), { secure: true, sameSite: "Strict" });
      setUser(userData);
      setToken(userData.token);
    } catch (error) {
      console.error("Error storing user data during login:", error);
    }
  };

  const updateUser = (updatedUserData) => {
    try {
      setUser((prevUser) => {
        const newUser = { ...prevUser, ...updatedUserData };
        Cookies.set("token", newUser.token, { secure: true, sameSite: "Strict" });
        Cookies.set("user", JSON.stringify(newUser), { secure: true, sameSite: "Strict" });
        return newUser;
      });
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const logout = () => {
    try {
      Cookies.remove("user");
      Cookies.remove("token");
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Function to refresh the token
  const refreshToken = async () => {
    try {
      const response = await auth.refreshAccessToken();  // Implement this method in your Auth service
      const newToken = response.token;

      Cookies.set("token", newToken, { secure: true, sameSite: "Strict", expires: 1 });
      setToken(newToken);
      return newToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout(); // Log out user if refresh fails
    }
  };

  useEffect(() => {
    if (!token) return;

    // Token expiration logic can go here
    const interval = setInterval(() => {
      // Assuming token expiration time is 1 hour
      const expiryTime = new Date(Cookies.get("token_expiry"));
      if (expiryTime < new Date()) {
        refreshToken();
      }
    }, 3600000); // Check every hour

    return () => clearInterval(interval);
  }, [token]);

  return (
      <AuthContext.Provider value={{ user, login, logout, updateUser, refreshToken }}>
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
