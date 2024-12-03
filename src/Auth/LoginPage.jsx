import React, { useState } from "react";
import Auth from "../service/Auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, updateUser } = useAuth();
  const navigate = useNavigate();
  const authApi = new Auth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authApi.loginUser({ username, password });

      if (response.success) {
        updateUser({
          token: response.token,
          user: response.user,
        });

        if (onLoginSuccess) {
          onLoginSuccess(response.user);
        }

        setErrorMessage("");
        if (response.user.role === "User") {
          navigate("/user");
        } else {
          navigate("/transferaction");
        }
      } else {
        setErrorMessage(
          response.message || "Failed to login. Please try again."
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage(
        error.response?.data.message ||
          "An error occurred during login. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8 bg-[#242424] rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-yellow-500">
        Welcome Back!
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Email or Username
          </label>
          <input
            type="text"
            className="bg-gray-800 text-white p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your username"
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            className="bg-gray-800 text-white p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg w-full"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Additional Links */}
      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          Don't have an account?{" "}
          <span className="text-yellow-500 font-bold cursor-pointer hover:underline">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
