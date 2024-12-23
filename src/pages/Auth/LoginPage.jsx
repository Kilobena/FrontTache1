import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../../service/Auth";
import { useAuth } from "../../providers/AuthContext";
import { FaEye, FaEyeSlash, FaLock, FaUserCircle } from "react-icons/fa";
import { Helmet } from "react-helmet"; // Import Helmet

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwords, setPasswords] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, updateUser } = useAuth();
  const navigate = useNavigate();
  const authApi = new Auth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authApi.loginUser({ username, password });
      if (response.success) {
        updateUser(response.user);

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
        setErrorMessage(response.message || "Failed to login. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage(error.response?.data.message || "An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-4">
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>
      <h2 className="font-light text-2xl text-center my-5 md:hidden">LOGIN</h2>
      <form onSubmit={handleSubmit} className="px-4">
        <div className="relative">
          <label className="block text-[#ababab] text-md font-medium mb-1">Email or Username</label>
          <div className="relative">
            {/* Icon */}
            <span className="absolute inset-y-0 left-0 pt-3 pl-4">
              <FaUserCircle className="text-primary-dark" size={20} />
            </span>
            {/* Input Field */}
            <input
              type="text"
              className="bg-no-repeat bg-left appearance-none rounded-lg p-3 pl-12 text-sm text-black w-full mb-4 border-0"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="off"
              style={{ fontSize: "16px" }}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="relative">
          <label className="block text-[#ababab] text-md font-medium mb-1">Password</label>
          <div className="relative">
            {/* Input Field */}

            <span className="absolute inset-y-0 left-0 pt-3 pl-4">
              <FaLock className="text-primary-dark" size={20} />
            </span>
            {/* Toggle Icon */}
            <input
              type={showPassword ? "text" : "password"}
              className="bg-no-repeat bg-left appearance-none  rounded-lg p-3 pl-12 text-sm text-black w-full mb-4 border-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
            />
            <span onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0  pt-3 right-3">
              {!showPassword ? <FaEye className="text-primary-dark" size={24} /> : <FaEyeSlash className="text-primary-dark" size={24} />}
            </span>
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary-yellow w-full font-medium px-3 py-2 mb-5 rounded-lg uppercase leading-3 text-sm transition duration-300 bg-fillButton h-10 mt-3 text-primary-dark disabled:opacity-50 disbaled:hover:bg-fillButton hover:bg-[#f5d048]"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <div className="flex flex-col items-center justify-center px-8">
          <span className="flex flex-row items-center justify-center">
            <button
              type="button"
              className="flex gap-4 -ml-3 items-center text-primary-yellow py-1.5 bg-no-repeat rtl:bg-right cursor-pointer font-medium"
            >
              <img className="icon-yellow" src="https://www.bet24.gg/_next/static/media/forgotPass.808e3466.svg" />
              Forgot Password ?
            </button>
          </span>
          <hr className="my-5 w-3/4 border-t-primary-yellow" />
          <h2 className="my-3 text-sm font-bold">Don't have an account already ?</h2>
        </div>
      </form>

      {/* Additional Links */}
      <div className="px-4">
        <button className="w-full font-medium p-4 uppercase text-sm text-center mb-6 bg-primary-dark duration-300  border-primary-yellow text-white hover:bg-[#494949] leading-3 rounded-lg cursor-pointer">
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
