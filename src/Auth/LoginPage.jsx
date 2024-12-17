import React, { useState } from "react";
import Auth from "../service/Auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import { RiLockPasswordFill } from "react-icons/ri";

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


    <div className="w-full max-w-lg mx-auto p-5 bg-[#242424] rounded-2xl shadow-lg">
      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <div className="relative">
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Email or Username
          </label>
          <div className="relative">
            {/* Icon */}
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-6 2.69-6 6m6-6c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6m-6 6h.01"
                />
              </svg>
            </span>
            {/* Input Field */}
            <input
              type="text"
              className="usernameField bg-no-repeat bg-left appearance-none border-2 border-gray rounded-lg pl-10 p-3 text-sm text-black w-full mb-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-3">
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            className="usernameField bg-no-repeat bg-left appearance-none border-2 border-gray rounded-lg p-3 text-sm text-black w-full mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required

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
        <div className=" flex flex-col items-center justify-center px-1">
          <span className="flex py-5 flex-row gap-5 items-center justify-center">
            <RiLockPasswordFill color="rgb(234 179 8" />
            <button type="button" className="modalLoginForgotPass inline text-yellow-500 py-1.5 bg-no-repeat bg-left ltr:pl-9 rtl:pr-9 rtl:bg-right text-sm cursor-pointer font-semibold">Forgot Password ?</button>
          </span>
          <hr className="mb-7 w-3/4 text-yellow-500" />
          <h2 className="mb-2 text-sm font-semibold">Don't have an account already ?</h2>
        </div>
      </form>

      {/* Additional Links */}
      <div className=" cursor-pointer w-full bg-black text-center p-2 mb-3 rounded-lg dark:hover:bg-white hover:bg-[#494949] dark:hover:text-modalBgDark hover:text-outlineButtonLight">


        <button className=" cursor-pointer">
          Register
        </button>

      </div>
    </div>

  );
};

export default Login;
