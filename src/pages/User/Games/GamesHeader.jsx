import React from "react";
import { NavLink } from "react-router-dom";
import { GAMES_CATEGORY_NAV } from "../../../routes/routes_data";
import "../../../assets/styles/css/game-header.css";

const GamesHeader = ({ openSearchModal }) => {
  return (
    <>
      <header className="hidden lg:block casino-header bg-[#383838] text-white md:mb-4 md:py-2 md:px-4 shadow-md">
        <style jsx="true">{`
          .casino-header nav a.active img,
          .casino-header nav a:hover img {
            filter: brightness(0) saturate(100%) invert(83%) sepia(25%) saturate(2166%) hue-rotate(349deg) brightness(104%) contrast(90%);
          }
          .casino-header nav a.active svg,
          .casino-header nav a:hover svg {
            fill: yellow !important;
          }
        `}</style>
        <div className="flex items-center">
          {/* Navigation Items */}
          <nav className="hidden lg:flex items-center md:gap-5 md:px-4 whitespace-nowrap scrollbar-hide overflow-x-auto mr-auto">
            {GAMES_CATEGORY_NAV.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col min-w-[25%] md:min-w-max items-center justify-center gap-1 md:gap-2 px-2 py-2 md:px-2 md:py-2 md:rounded-lg text-xs md:text-sm font-semibold transition-all ${
                    isActive ? "bg-[#1c1c1c] text-primary-yellow active" : "text-gray-300 hover:text-yellow-400 hover:bg-[#1c1c1c]"
                  }`
                }
              >
                <span role="img" aria-label={item.label} className="icon transition-transform">
                  {item?.icon ? <img src={item?.icon} alt={item.label} className="w-6 h-6" /> : null}
                </span>
                <span className="text-center">{item.label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto pl-5 md:block hidden">
            <div className="relative w-52">
              <input
                onClick={() => openSearchModal(true)}
                type="button"
                value="Search"
                className="cursor-pointer w-full text-left bg-white text-gray-800 pl-8 pr-3 py-2 rounded-[8px] shadow focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
    </>
  );
};

export default GamesHeader;
