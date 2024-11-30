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
        {/* Logo and Navigation */}
        <div className="flex flex-wrap items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <NavLink
              to="/game"
              className={({ isActive }) =>
                `text-lg font-bold flex items-center gap-2 ${
                  isActive ? "text-yellow-400" : "text-gray-300"
                }`
              }
            >
              <span role="img" aria-label="lobby-icon">🏠</span> Lobby
            </NavLink>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-wrap gap-4 justify-center">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-1 rounded ${
                    isActive ? "text-yellow-400 bg-gray-700" : "text-gray-300"
                  } hover:text-yellow-400 transition-all duration-300`
                }
              >
                <span role="img" aria-label={item.label}>{item.icon}</span> {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Search Box */}
          <div className="relative w-full lg:w-4/4 mt-5 lg:mt-10">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 rounded-full bg-white text-black placeholder-wh-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
