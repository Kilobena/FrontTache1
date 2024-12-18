import React, { useState } from "react";
import Auth from "../service/Auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
    <div className="w-full max-w-lg mx-auto p-5 bg-[#242424] rounded-2xl shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <label className="block text-[#ababab] text-md font-medium mb-1">Email or Username</label>
          <div className="relative">
            {/* Icon */}
            <span className="absolute inset-y-0 left-0 pt-3 pl-3">
              <i class="fa fa-user-circle-o text-black fa-lg" aria-hidden="true"></i>
            </span>
            {/* Input Field */}
            <input
              type="text"
              className="bg-no-repeat bg-left appearance-none rounded-lg p-3 pl-10 text-sm text-black w-full mb-4 border-0"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="relative">
          <label className="block text-[#ababab] text-md font-medium mb-1">Password</label>
          <div className="relative">
            {/* Input Field */}

            <span className="absolute inset-y-0 left-0 pt-3 pl-4">
              <i class="fa fa-lock text-black fa-lg" aria-hidden="true"></i>
            </span>
            {/* Toggle Icon */}
            <input
              type={showPassword ? "text" : "password"}
              className="bg-no-repeat bg-left appearance-none  rounded-lg p-3 pl-10 text-sm text-black w-full mb-4 border-0"
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
          className="bg-primary-yellow w-full font-medium px-3 py-2 rounded-lg uppercase leading-3 text-sm  transition duration-300 bg-fillButton h-10 mt-3 text-primary-dark disabled:opacity-50 disbaled:hover:bg-fillButton hover:bg-[#f5d048]"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <div className=" flex flex-col items-center justify-center px-1">
          <span className="flex py-5 flex-row gap-5 items-center justify-center">
            <RiLockPasswordFill color="rgb(234 179 8" />
            <button
              type="button"
              className="modalLoginForgotPass inline text-yellow-500 py-1.5 bg-no-repeat bg-left ltr:pl-9 rtl:pr-9 rtl:bg-right text-sm cursor-pointer font-semibold"
            >
              Forgot Password ?
            </button>
          </span>
          <hr className="mb-7 w-3/4 border-t-primary-yellow" />
          <h2 className="mb-2 text-sm font-semibold">Don't have an account already ?</h2>
        </div>
      </form>

      {/* Additional Links */}
      <div className=" cursor-pointer w-full bg-black text-center p-2 mb-3 rounded-lg dark:hover:bg-white hover:bg-[#494949] dark:hover:text-modalBgDark hover:text-outlineButtonLight">
        <button className=" cursor-pointer">Register</button>
      </div>
    </div>
  );
};

export default Login;
