import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const navItems = [
    { path: "/featured", label: "Featured", icon: "⭐" },
    { path: "/new", label: "New", icon: "🆕" },
    { path: "/slots", label: "Slots", icon: "🍌" },
    { path: "/crash", label: "Crash", icon: "🚀" },
    { path: "/providers", label: "Providers", icon: "⚙" },
    { path: "/livecasino", label: "Live Casino", icon: "👤" },
    { path: "/amatic", label: "Amatic", icon: "⭐" },
    { path: "/pragmatic", label: "Pragmatic", icon: "🍎" },
    { path: "/othergames", label: "Other Games", icon: "🎲" },
  ];

  return (
    <header className="bg-[#2E2E2E] text-white py-4 shadow-md">
      <div className="container mx-auto">
        {/* Logo and Lobby Button */}
        <div className="flex items-center gap-6 mb-4 px-4">
          <NavLink
            to="/game"
            className={({ isActive }) =>
              `text-lg font-bold flex items-center gap-2 px-4 py-2 rounded-lg ${
                isActive ? "text-yellow-400" : "text-gray-300 hover:text-yellow-400"
              }`
            }
          >
            <span role="img" aria-label="lobby-icon">🏠</span> Lobby
          </NavLink>
        </div>

        {/* Navigation Items */}
        <nav className=" flex overflow-x-auto whitespace-nowrap scrollbar-hide gap-4 px-4">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "text-yellow-400 bg-gray-800"
                    : "text-gray-300 hover:text-yellow-400 hover:bg-gray-700"
                }`
              }
            >
              <span
                role="img"
                aria-label={item.label}
                className="transition-transform duration-300 hover:scale-110"
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;