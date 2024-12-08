import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";

const Navigation = ({ user, onLoginClick, onRegisterClick, onLogout }) => {
  const [activeItem, setActiveItem] = useState('home');

  const menuItems = [
    { path: '/home', label: 'HOME', id: 'home' },
    { path: '/sports-betting', label: 'SPORTS BETTING', id: 'sports' },
    { path: '/live-betting', label: 'LIVE BETTING', id: 'live' },
    { path: '/casino', label: 'CASINO', id: 'casino' },
    { path: '/livecasino', label: 'LIVE CASINO', id: 'livecasino' },
    { path: '/virtuals', label: 'VIRTUALS', id: 'virtuals' },
  ];

  return (
    <header className="bg-[#0F0F0F]text-white shadow-lg">
      <div className="flex items-center justify-between py-3 px-4">
        {/* Left Section */}
        <Link to="/home" className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <h1 className="text-xl font-bold text-yellow-500">CASHBET</h1>
        </Link>

        {/* Center Section */}
        <nav className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`text-base ${
                activeItem === item.id ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
              }`}
              onClick={() => setActiveItem(item.id)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <>
              <span className="text-sm">€{user.balance.toFixed(2)}</span>
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
      </div>
    </header>
  );
};

Navigation.propTypes = {
  user: PropTypes.object,
  onLoginClick: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navigation;