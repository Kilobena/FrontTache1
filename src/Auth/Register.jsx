import React, { useState } from "react";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 bg-gray-700 text-white p-4 rounded">
          Register User
        </h1>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <div className="flex items-center border border-gray-300 rounded p-2">
              <span className="material-icons">account_circle</span>
              <input
                className="ml-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                type="text"
                placeholder="Username"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded p-2">
              <span className="material-icons">lock</span>
              <input
                className="ml-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <button
                type="button"
                className="ml-2 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-icons">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Role
            </label>
            <div className="relative">
              <select className="block appearance-none w-full bg-white border border-gray-300 rounded p-2 text-gray-700 leading-tight focus:outline-none">
                <option>Select Role</option>
                <option>User</option>
                <option>Admin</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
              type="button"
            >
              REGISTER USER
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none"
              type="reset"
            >
              RESET
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
