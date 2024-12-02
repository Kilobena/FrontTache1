import React, { useState } from "react";
import {
  FaHome,
  FaSearch,
  FaBars,
  FaFutbol,
  FaHeart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BottomBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
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
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
          <h2 className="text-lg font-bold">Menu</h2>
          <button
            className="text-white text-2xl"
            onClick={() => setIsMenuOpen(false)}
          >
            &times;
          </button>
        </div>
        <ul className="mt-4 space-y-4 px-4">
          <li>
            <button
              className="block text-left w-full px-4 py-2 rounded hover:bg-yellow-400 hover:text-black"
              onClick={() => {
                handleNavigation("/featured");
                setIsMenuOpen(false);
              }}
            >
              Featured
            </button>
          </li>
          <li>
            <button
              className="block text-left w-full px-4 py-2 rounded hover:bg-yellow-400 hover:text-black"
              onClick={() => {
                handleNavigation("/new");
                setIsMenuOpen(false);
              }}
            >
              New
            </button>
          </li>
          <li>
            <button
              className="block text-left w-full px-4 py-2 rounded hover:bg-yellow-400 hover:text-black"
              onClick={() => {
                handleNavigation("/slots");
                setIsMenuOpen(false);
              }}
            >
              Slots
            </button>
          </li>
          <li>
            <button
              className="block text-left w-full px-4 py-2 rounded hover:bg-yellow-400 hover:text-black"
              onClick={() => {
                handleNavigation("/crash");
                setIsMenuOpen(false);
              }}
            >
              Crash
            </button>
          </li>
          <li>
            <button
              className="block text-left w-full px-4 py-2 rounded hover:bg-yellow-400 hover:text-black"
              onClick={() => {
                handleNavigation("/live-casino");
                setIsMenuOpen(false);
              }}
            >
              Live Casino
            </button>
          </li>
          <li>
            <button
              className="block text-left w-full px-4 py-2 rounded hover:bg-yellow-400 hover:text-black"
              onClick={() => {
                handleNavigation("/promotions");
                setIsMenuOpen(false);
              }}
            >
              Promotions
            </button>
          </li>
        </ul>
      </div>

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
