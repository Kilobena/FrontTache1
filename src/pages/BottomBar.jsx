import React, { useState } from "react";
import {
  FaHome,
  FaSearch,
  FaBars,
  FaFutbol,
  FaHeart,
  FaAngleDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext"; // Import useAuth hook

const BottomBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { user, login, logout } = useAuth(); // Use authentication hook

  const handleNavigation = (path) => {
    navigate(path);
  };

 

  return (
    <div>
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-[#1e1e1e] text-white flex justify-around items-center py-3 z-50">
        <button
          className="flex flex-col items-center"
          onClick={() => handleNavigation("/game")}
        >
          <FaHeart size={20} />
          <span className="text-xs">Casino</span>
        </button>

        <button
          className="flex flex-col items-center"
          onClick={() => handleNavigation("/sports")}
        >
          <FaFutbol size={20} />
          <span className="text-xs">Sports</span>
        </button>

        <button
          className="flex flex-col items-center"
          onClick={() => handleNavigation("/home")}
        >
          <FaHome size={20} />
          <span className="text-xs">Home</span>
        </button>

        <button
          className="flex flex-col items-center"
          onClick={() => handleNavigation("/search")}
        >
          <FaSearch size={20} />
          <span className="text-xs">Search</span>
        </button>

        <button
          className="flex flex-col items-center"
          onClick={() => setIsMenuOpen(true)}
        >
          <FaBars size={20} />
          <span className="text-xs">Menu</span>
        </button>
      </div>

      {/* Slide-Out Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 bg-[#1e1e1e] text-white transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <img
              src="https://via.placeholder.com/50"
              alt="Logo"
              className="w-10 h-10"
            />
            <h2 className="text-lg font-bold">BET24</h2>
          </div>
          <button
            className="text-white text-2xl"
            onClick={() => setIsMenuOpen(false)}
          >
            &times;
          </button>
        </div>

        {/* Login/Register Section */}
        {!user ? (
          <div className="px-4 py-4 border-b border-gray-700 flex gap-4">
            <button
              className="bg-transparent border border-yellow-400 text-yellow-400 px-4 py-2 rounded hover:bg-yellow-400 hover:text-black"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Login
            </button>
            <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500">
              Register
            </button>
          </div>
        ) : (
          <div className="px-4 py-4 border-b border-gray-700 flex justify-between items-center">
            <div>
              <p className="text-sm">Hello, {user.username}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}

        {/* Menu Items */}
        <ul className="mt-4 px-4 space-y-4">
          <li>
            <button
              className="block text-left w-full px-4 py-2 rounded hover:bg-yellow-400 hover:text-black"
              onClick={() => handleNavigation("/casino")}
            >
              Casino
            </button>
          </li>
          {/* Add additional menu items */}
        </ul>
      </div>

      {/* Backdrop when Menu is Open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-[#1e1e1e] text-white p-6 rounded-lg w-3/4 max-w-md">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-[#2e2e2e] border border-gray-700 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring focus:ring-yellow-400"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-[#2e2e2e] border border-gray-700 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring focus:ring-yellow-400"
            />
            <div className="flex gap-4">
              <button
                className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                onClick={() => setIsLoginModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomBar;
