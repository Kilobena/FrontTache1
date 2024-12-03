import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import logo from "../assets/logo.webp";

const Navigation = ({ user, onLoginClick, onRegisterClick, onLogout }) => (
  <header className="bg-gray-800 text-white shadow-lg">
    <div className="flex items-center justify-between py-2 px-4">
      {/* Left Section */}
      <Link to="/home" className="flex items-center space-x-4">
        <img src={logo} alt="Logo" className="h-8 w-auto" />
        <h1 className="text-xl font-bold text-yellow-500">CASHBET</h1>
      </Link>

      {/* Center Section */}
      <nav className="hidden md:flex items-center space-x-6">
        <Link to="/home" className="hover:text-yellow-400">
          Home
        </Link>
        <Link to="/sports-betting" className="hover:text-yellow-400">
          Sports Betting
        </Link>
        <Link to="/casino" className="hover:text-yellow-400">
          Casino
        </Link>
        <Link to="/livecasino" className="hover:text-yellow-400">
          Live Casino
        </Link>
        <Link to="/virtuals" className="hover:text-yellow-400">
          Virtuals
        </Link>
      </nav>

      {/* Right Section */}
      <div className="hidden md:flex items-center space-x-3">
        {user ? (
          <>
            <span className="text-sm">{`Hello, ${user.username}`}</span>
            <button
              onClick={onLogout}
              className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-400"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onLoginClick}
              className="px-3 py-1 rounded text-sm border border-gray-500 hover:bg-gray-700"
            >
              Login
            </button>
            <button
              onClick={onRegisterClick}
              className="bg-yellow-500 px-3 py-1 rounded font-bold text-sm hover:bg-yellow-400"
            >
              Register
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <button className="md:hidden">
        <FaBars size={20} className="text-white" />
      </button>
    </div>
  </header>
);

Navigation.propTypes = {
  user: PropTypes.object,
  onLoginClick: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navigation;
