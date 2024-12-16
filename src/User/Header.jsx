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
    <header className="casino-header bg-[#383838] text-white py-2 px-4 md:py-2 shadow-md">
      <style jsx>{`
        .casino-header nav a.active img {
          filter: brightness(0) saturate(100%) invert(83%) sepia(25%) saturate(2166%) hue-rotate(349deg) brightness(104%) contrast(90%);
        }
        .casino-header nav a:hover img {
          filter: brightness(0) saturate(100%) invert(83%) sepia(25%) saturate(2166%) hue-rotate(349deg) brightness(104%) contrast(90%);
        }
      `}</style>
      <div className="flex items-center">
        {/* Navigation Items */}
        <nav className="flex items-center gap-4 px-2 overflow-x-auto md:gap-6 md:px-4 md:justify-center whitespace-nowrap scrollbar-hide">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 md:gap-2 px-2 py-1 md:px-2 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300 ${
                  isActive ? "bg-[#1c1c1c] text-yellow-400 active" : "text-gray-300 hover:text-yellow-400 hover:bg-[#1c1c1c]"
                }`
              }
            >
              <span role="img" aria-label={item.label} className="icon transition-transform duration-300 hover:scale-110">
                {item.icon.includes("http") ? <img src={item.icon} alt={item.label} className="w-4 h-4 md:w-6 md:h-6" /> : item.icon}
              </span>
              <span className="text-center">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="flex justify-center ml-auto">
          <div className="relative w-52">
            <input
              type="text"
              placeholder="Search"
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white text-gray-800 pl-8 pr-3 py-2 rounded-[8px] shadow focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#000" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
