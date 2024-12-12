import React, { useState } from "react";
import {
  FaHome,
  FaSearch,
  FaBars,
  FaHeart,
  FaFutbol,
  FaAngleDown,
  FaDice,
  FaStar,
  FaRocket,
  FaTable,
  FaVideo,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import Login from "../Auth/LoginPage"; // Import the Login component

const BottomBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { user, login, logout } = useAuth();

  const handleNavigation = (path) => {
    setIsMenuOpen(false); // Close menu when navigating
    navigate(path);
  };

  const handleLoginSuccess = (userData) => {
    login(userData); // Update the login context
    setIsLoginModalOpen(false); // Close modal after login
  };

  const handleLogout = () => {
    logout();
    navigate("/home");
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
        } transition-transform duration-300 ease-in-out z-50 shadow-lg`}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold">Menu</h2>
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
              <p className="text-sm">€{user.balance.toFixed(2)}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}

        {/* Menu Items */}
        <div className="py-4">
          {/* Casino Section */}
          <div className="px-4 pb-4 border-b border-gray-700">
            <h3 className="text-sm font-bold uppercase text-gray-400 mb-2">
              Casino
            </h3>
            <ul className="space-y-3">
              <li
                className="flex items-center gap-2 cursor-pointer hover:bg-yellow-400 hover:text-black px-3 py-2 rounded"
                onClick={() => handleNavigation("/featured")}
              >
                <FaStar />
                <span>Featured</span>
              </li>
              <li
                className="flex items-center gap-2 cursor-pointer hover:bg-yellow-400 hover:text-black px-3 py-2 rounded"
                onClick={() => handleNavigation("/new")}
              >
                <FaRocket />
                <span>New</span>
              </li>
              <li
                className="flex items-center gap-2 cursor-pointer hover:bg-yellow-400 hover:text-black px-3 py-2 rounded"
                onClick={() => handleNavigation("/slots")}
              >
                <FaDice />
                <span>Slots</span>
              </li>
              <li
                className="flex items-center gap-2 cursor-pointer hover:bg-yellow-400 hover:text-black px-3 py-2 rounded"
                onClick={() => handleNavigation("/livecasino")}
              >
                <FaVideo />
                <span>Live Casino</span>
              </li>
              <li
                className="flex items-center gap-2 cursor-pointer hover:bg-yellow-400 hover:text-black px-3 py-2 rounded"
                onClick={() => handleNavigation("/providers")}
              >
                <FaTable />
                <span>Providers</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] text-white rounded-lg p-6 w-11/12 max-w-md">
            <Login onLoginSuccess={handleLoginSuccess} />
            <button
              className="mt-4 w-full text-sm text-gray-400 hover:underline"
              onClick={() => setIsLoginModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Backdrop when Menu is Open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default BottomBar;
