import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import io from "socket.io-client";

const AuthContext = createContext();

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

  const socket = React.useRef(null);

  useEffect(() => {
    // Initialize Socket.IO connection
    socket.current = io("https://catch-me.bet"); // Replace with your backend URL

    // Listen for balance updates
    socket.current.on("balanceUpdated", (data) => {
      if (data.userId === user?._id) {
        console.log("Real-time balance update received:", data);
        updateUser({ balance: data.newBalance });
      }
    });

    // Cleanup socket connection
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [user]);

  const login = (userData) => {
    try {
      Cookies.set("token", userData.token);
      Cookies.set("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Error storing user data during login:", error);
    }
  };

  const updateUser = (updatedUserData) => {
    try {
      setUser((prevUser) => {
        const newUser = { ...prevUser, ...updatedUserData };
        Cookies.set("user", JSON.stringify(newUser));
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
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
