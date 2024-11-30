import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import logo from "../assets/logo.webp";

const Navigation = ({ user, onLoginClick, onRegisterClick, onLogout }) => (
  <header className="bg-[#1D1D1D] text-white shadow-lg">
    <div className="flex items-center justify-between py-4 px-6">
      {/* Left Section */}
      <Link to="/home" className="flex items-center space-x-4">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
        <h1 className="text-2xl font-bold text-[#F2C41A] hover:text-yellow-400 transition">
          CASHBET
        </h1>
      </Link>

      {/* Center Section */}
      <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
        <Link
          to="/home"
          className="hover:text-[#F2C41A] transition"
        >
          HOME
        </Link>
        <Link
          to="/sports-betting"
          className="hover:text-[#F2C41A] transition"
        >
          SPORTS BETTING
        </Link>
        <Link
          to="/home"
          className="hover:text-[#F2C41A] transition"
        >
          LIVE BETTING
        </Link>
        <Link
          to="/game"
          className="hover:text-[#F2C41A] transition"
        >
          CASINO
        </Link>
        <Link
          to="/livecasino"
          className="hover:text-[#F2C41A] transition"
        >
          LIVE CASINO
        </Link>
        <Link
          to="/virtuals"
          className="hover:text-[#F2C41A] transition"
        >
          VIRTUALS
        </Link>
      </nav>

      {/* Right Section */}
      <div className="hidden md:flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-gray-300 font-medium">{`Hello, ${user.username}`}</span>
            <button
              onClick={onLogout}
              className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-400 transition"
            >
              LOGOUT
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onLoginClick}
              className="bg-[#1E1E1E] px-4 py-2 rounded border border-gray-500 text-white hover:bg-gray-700 transition"
            >
              LOGIN
            </button>
            <button
              onClick={onRegisterClick}
              className="bg-[#F2C41A] px-4 py-2 rounded text-black font-bold hover:bg-yellow-400 transition"
            >
              REGISTER
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <button className="md:hidden">
        <FaBars size={24} className="text-white" />
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
