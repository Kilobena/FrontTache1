import React from "react";
import { NavLink } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
  const navItems = [
    { path: "/game", label: "Lobby", icon: "🏠" },
    {
      path: "/featured",
      label: "Featured",
      icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_featured.svg&w=160&q=75",
    },
    {
      path: "/new",
      label: "New",
      icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_new%20(1).svg&w=160&q=75",
    },
    {
      path: "/slots",
      label: "Slots",
      icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_slots.svg&w=160&q=75",
    },
    {
      path: "/crash",
      label: "Crash",
      icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fcasino_Crash.svg&w=160&q=75",
    },
    {
      path: "/livecasino",
      label: "Live Casino",
      icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fcasino_Live%20Casino.svg&w=160&q=75",
    },
    {
      path: "/amatic",
      label: "Amatic",
      icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fcasino_Live%20Casino.svg&w=160&q=75",
    },
    {
      path: "/pragmatic",
      label: "Pragmatic",
      icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_pragmatic.svg&w=160&q=75",
    },
    {
      path: "/othergames",
      label: "Other Games",
      icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fcasino_Keno.svg&w=160&q=75",
    },
  ];

  return (
    <header className="bg-[#383838] text-white py-2 md:py-2 shadow-md">
      <div className="container mx-auto">
        {/* Navigation Items */}
        <nav className="flex items-center gap-4 px-2 overflow-x-auto md:gap-6 md:px-4 md:justify-center whitespace-nowrap scrollbar-hide">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 md:gap-2 px-2 py-1 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "text-white bg-gray-900"
                    : "text-gray-300 hover:text-yellow-400 hover:bg-gray-700"
                }`
              }
            >
              <span
                role="img"
                aria-label={item.label}
                className="transition-transform duration-300 hover:scale-110"
              >
                {item.icon.includes("http") ? (
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="w-4 h-4 md:w-6 md:h-6"
                  />
                ) : (
                  item.icon
                )}
              </span>
              <span className="text-center">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
