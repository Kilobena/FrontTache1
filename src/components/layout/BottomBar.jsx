import React, { useState } from "react";
import { FaBars, FaDice, FaStar, FaRocket, FaTable, FaVideo } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthContext";
import Login from "../../pages/Auth/LoginPage"; // Import the Login component
import { GAMES_CATEGORY_NAV, SPORTS_NAV } from "../../routes/APP_ROUTES";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { isImageUrl } from "../../helpers/functions";

const BottomBar = ({ openSearchModal }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCasinoMenu, setIsCasinoMenu] = useState(true);
  const [isSportsMenu, setIsSportsMenu] = useState(false);

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

  const APPBAR_NAV = [
    {
      label: "Casino",
      path: "/casino",
      image: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fmobile_bottom_Casino.svg&w=160&q=75",
    },
    {
      label: "Sports",
      path: "/sports",
      image: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fmobile_bottom_Sports.svg&w=160&q=75",
    },
    {
      label: "Home",
      path: "/home",
      image: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fmobile_bottom_Home.svg&w=160&q=75",
    },
  ];
  return (
    <>
      <style jsx="true">{`
        nav a.active img,
        nav a:hover img {
          filter: brightness(0) saturate(100%) invert(83%) sepia(25%) saturate(2166%) hue-rotate(349deg) brightness(104%) contrast(90%);
        }
        nav a.active svg,
        nav a:hover svg {
          fill: yellow !important;
        }
      `}</style>
      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full z-50">
        <div className="py-1 bg-[#1e1e1e] text-white flex justify-around items-center ">
          {APPBAR_NAV.filter((fi) => fi.label !== "Lobby").map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 font-light ${
                  isActive ? " text-primary-yellow active" : "text-white hover:text-yellow-400 hover:bg-[#1c1c1c]"
                }`
              }
              onClick={() => handleNavigation(item.path)}
            >
              <img className="h-6" src={item.image} />
              <span className="text-xs">{item.label}</span>
            </NavLink>
          ))}
          <NavLink
            to="search"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 font-light ${
                isActive ? " text-primary-yellow active" : "text-white hover:text-yellow-400 hover:bg-[#1c1c1c]"
              }`
            }
            onClick={() => openSearchModal(true)}
          >
            <img
              className="h-6"
              src="https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fmobile_bottom_Search.svg&w=160&q=75"
            />
            <span className="text-xs">Search</span>
          </NavLink>
          <button
            className="flex flex-col items-center gap-1 py-2 font-light text-white hover:text-yellow-400 hover:bg-[#1c1c1c]"
            onClick={() => setIsMenuOpen(true)}
          >
            <FaBars size={20} />
            <span className="text-xs">Menu</span>
          </button>
        </div>
      </nav>

      {/* Slide-Out Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-full bg-[#1e1e1e] text-white transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 shadow-lg`}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center px-2 py-3 border-b border-gray-700">
          <div className="w-36">
            <Link className="flex h-headerLogoMobileHeight ltr:mr-1.5 rtl:ml-1.5" top="/home">
              <img src="https://assets.bet24.gg/sites/bet24/Bet24-New logo.png" alt="Bet24" title="Bet24" className="h-headerLogoMobileHeight" />
            </Link>
          </div>
          <button className="text-white text-2xl pr-2" onClick={() => setIsMenuOpen(false)}>
            <img alt="Close" src="https://www.bet24.gg/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FcloseModal.17393ee7.svg&w=160&q=75" />
          </button>
        </div>

        {/* Login/Register Section */}
        {!user ? (
          <div className="px-2 py-4 border-b border-gray-700 flex gap-4">
            <button
              className="flex-1 bg-transparent border border-gray-500 text-white px-4 h-[36px] uppercase text-[14px] rounded-lg hover:bg-yellow-400 hover:text-black"
              onClick={() => handleNavigation("/login")}
            >
              Login
            </button>
            <button
              className="bg-yellow-400 text-black px-4 h-[36px] uppercase text-[14px] rounded-lg hover:bg-yellow-500 flex-1 "
              onClick={() => handleNavigation("/register")}
            >
              Register
            </button>
          </div>
        ) : null}

        {/* Menu Items */}
        <div className="py-4">
          {/* Casino Section */}
          <div className="px-2">
            <span
              className={`rounded-lg py-2 px-3 flex items-center justify-between text-sm uppercase text-white ${isCasinoMenu ? "bg-[#494949]" : ""}`}
              onClick={() => setIsCasinoMenu(!isCasinoMenu)}
            >
              Casino <ChevronDownIcon aria-hidden="true" className={`size-6 text-white ${isCasinoMenu ? "rotate-180 " : ""}`} />
            </span>
            {isCasinoMenu ? (
              <nav>
                {GAMES_CATEGORY_NAV.filter((fi) => fi.label !== "Lobby").map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={({ isActive }) =>
                      `flex items-center gap-2 py-2 px-3 font-light ${
                        isActive ? " text-primary-yellow active" : "text-white hover:text-yellow-400 hover:bg-[#1c1c1c]"
                      }`
                    }
                  >
                    <span role="img" aria-label={item.label} className="icon transition-transform">
                      {isImageUrl(item.icon) ? <img src={item?.icon} alt={item.label} className="w-6 h-5" /> : null}
                    </span>
                    <span className="text-center">{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            ) : null}
          </div>

          {/* Sports Section */}
          <div className="px-2 mb-4">
            <span
              className={`rounded-lg py-2 px-3 flex items-center justify-between text-sm uppercase text-white ${isSportsMenu ? "bg-[#494949]" : ""}`}
              onClick={() => setIsSportsMenu(!isSportsMenu)}
            >
              Sports <ChevronDownIcon aria-hidden="true" className={`size-6 text-white ${isSportsMenu ? "rotate-180 " : ""}`} />
            </span>
            {isSportsMenu ? (
              <nav>
                {SPORTS_NAV.filter((fi) => fi.label !== "Lobby").map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={({ isActive }) =>
                      `flex items-center gap-2 py-2 px-3 font-light ${
                        isActive ? " text-primary-yellow active" : "text-white hover:text-yellow-400 hover:bg-[#1c1c1c]"
                      }`
                    }
                  >
                    <span className="text-center">{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            ) : null}
          </div>
          <div className="px-2">
            <NavLink
              to="/promotions"
              onClick={() => handleNavigation("/promotions")}
              className={({ isActive }) =>
                `flex items-center gap-2 py-2 px-3 font-light text-sm ${
                  isActive ? " text-primary-yellow active" : "text-white hover:text-yellow-400 hover:bg-[#1c1c1c]"
                }`
              }
            >
              PROMOTIONS
            </NavLink>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] text-white rounded-lg p-6 w-11/12 max-w-md">
            <Login onLoginSuccess={handleLoginSuccess} />
            <button className="mt-4 w-full text-sm text-gray-400 hover:underline" onClick={() => setIsLoginModalOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Backdrop when Menu is Open */}
      {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)}></div>}
    </>
  );
};

export default BottomBar;
