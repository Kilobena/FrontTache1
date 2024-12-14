import React, { createContext, useContext, useState, useEffect } from "react";
import Auth from "../service/Auth";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user:", error);
      return null;
    }
  });

  const auth = new Auth();

  const login = (userData) => {
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Error storing user data during login:", error);
    }
  };

  const updateUser = (updatedUserData) => {
    try {
      setUser((prevUser) => {
        const newUser = { ...prevUser, ...updatedUserData };
        localStorage.setItem("user", JSON.stringify(newUser));
        return newUser;
      });
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Periodically update user balance
  useEffect(() => {
    const updateBalance = async () => {
      if (!user?.username) return;

      try {
        const response = await auth.getBalance(user.username);
        if (response.success) {
          updateUser({ balance: response.balance });
        } else {
          console.error("Failed to update balance:", response.message);
        }
      } catch (error) {
        console.error("Error fetching user balance:", error);
      }
    };

    // Poll every 10 seconds
    const interval = setInterval(updateBalance, 10000);

    return () => clearInterval(interval);
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
