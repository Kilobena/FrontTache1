import React from 'react';
import { FaHome, FaSearch, FaBars, FaFutbol, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BottomBar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 w-full bg-[#242424] text-white flex justify-around py-3 sm:hidden z-50">
      {/* Bottom navigation bar */}
      <button
        className="flex flex-col items-center"
        //onClick={() => handleNavigation('/casino')}
      >
        <FaHeart size={24} />
        <span className="text-xs mt-1">Casino</span>
      </button>

      <button
        className="flex flex-col items-center"
        //onClick={() => handleNavigation('/sports')}
      >
        <FaFutbol size={24} />
        <span className="text-xs mt-1">Sports</span>
      </button>

      <button
        className="flex flex-col items-center"
        //onClick={() => handleNavigation('/home')}
      >
        <FaHome size={24} />
        <span className="text-xs mt-1">Home</span>
      </button>

      <button
        className="flex flex-col items-center"
       // onClick={() => handleNavigation('/search')}
      >
        <FaSearch size={24} />
        <span className="text-xs mt-1">Search</span>
      </button>

      <button
        className="flex flex-col items-center"
        //onClick={() => handleNavigation('/menu')}
      >
        <FaBars size={24} />
        <span className="text-xs mt-1">Menu</span>
      </button>
    </div>
  );
};

export default BottomBar;
