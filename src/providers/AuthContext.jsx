import React, { createContext, useContext, useState } from "react";
import Auth from "../service/Auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
      const storedUser = sessionStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
  });

  const [authService] = useState(() => new Auth());

  const login = async (credentials) => {
      const response = await authService.loginUser(credentials);
      if (response.success) setUser(response.user);
  };

  const logout = async () => {
      await authService.logoutUser();
      setUser(null);
  };

  const getProfile = async () => {
      return await authService.getProfile();
  };

  const getUserByUsername = async (username) => {
      return await authService.getUserByUsername(username);
  };

  const deleteUserByUsername = async (username) => {
      return await authService.deleteUserByUsername(username);
  };

  const getUsersByCreaterId = async (createrId) => {
      return await authService.getUsersByCreaterId(createrId);
  };

  return (
      <AuthContext.Provider
          value={{
              user,
              login,
              logout,
              getProfile,
              getUserByUsername,
              deleteUserByUsername,
              getUsersByCreaterId,
          }}
      >
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
