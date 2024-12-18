import React from 'react';
import {
  FaUserPlus,
  FaUsers,
  FaMoneyCheckAlt,
  FaHistory,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaGamepad,
  FaChartBar,
  FaTrophy,
  FaWallet,
} from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar, user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
    // Close the sidebar on mobile view after clicking a menu item
    if (window.innerWidth < 640) {
      toggleSidebar();
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Toggle icon for sidebar */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleSidebar}
          className="sm:hidden text-white text-2xl focus:outline-none mr-3"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-[#242424] text-white z-40 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } sm:translate-x-0 sm:static sm:w-64 w-full sm:h-auto overflow-y-auto`}
      >
        <div className="p-4">
          <ul className="space-y-6">
            {/* Transfer Section */}
            <li
              className={`flex items-center cursor-pointer py-2 px-4  rounded-lg  hover:bg-yellow-500 ${
                isActive('/transferaction') ? 'bg-[#f2c41a]' : ''
              }`}
              onClick={() => handleMenuClick('/transferaction')}
            >
              <FaMoneyCheckAlt className="mr-3 ml-3" />
              Transfer
            </li>

            <li
              className={`flex items-center cursor-pointer py-2 px-4  rounded-lg  hover:bg-yellow-500 ${
                isActive('/transferhistory') ? 'bg-yellow-500' : ''
              }`}
              onClick={() => handleMenuClick('/transferhistory')}
            >
              <FaHistory className="mr-3 ml-3" />
              Transfers History
            </li>

            <hr className="border-gray-700" />

            {/* Reports Section */}
            <li
              className={`flex items-center cursor-pointer py-2 px-4  rounded-lg  hover:bg-yellow-500 ${
                isActive('/transfers-report') ? 'bg-yellow-500' : ''
              }`}
              onClick={() => handleMenuClick('/tranfer_report')}
            >
              <FaChartBar className="mr-3 ml-3" />
              Transfers Report
            </li>

            <li
              className={`flex items-center cursor-pointer py-2 px-4  rounded-lg  hover:bg-yellow-500 ${
                isActive('/gaming-report') ? 'bg-yellow-500' : ''
              }`}
              onClick={() => handleMenuClick('/gaming-report')}
            >
              <FaGamepad className="mr-3 ml-3" />
              Gaming Report
            </li>

            <hr className="border-gray-700" />

            {/* Betting Section */}
            <li
              className={`flex items-center cursor-pointer py-2 px-4  rounded-lg  hover:bg-yellow-500 ${
                isActive('/sportsbook-bets') ? 'bg-yellow-500' : ''
              }`}
              onClick={() => handleMenuClick('/sportsbook-bets')}
            >
              <FaTrophy className="mr-3 ml-3" />
              Sportsbook Bets
            </li>

            <li
              className={`flex items-center cursor-pointer py-2 px-4  rounded-lg  hover:bg-yellow-500 ${
                isActive('/casino-bets') ? 'bg-yellow-500' : ''
              }`}
              onClick={() => handleMenuClick('/game')}
            >
              <FaWallet className="mr-3 ml-3" />
              Casino Bets
            </li>

            <hr className="border-gray-700" />

            {/* User Management Section */}
            <li
              className={`flex items-center cursor-pointer py-2 px-4  rounded-lg  hover:bg-yellow-500 ${
                isActive('/user-management') ? 'bg-yellow-500' : ''
              }`}
              onClick={() => handleMenuClick('/user-management')}
            >
              <FaUsers className="mr-3 ml-3" />
              Manage Users
            </li>

            <li
              className={`flex items-center cursor-pointer py-2 px-4  rounded-lg  hover:bg-yellow-500 ${
                isActive('/registre') ? 'bg-yellow-500' : ''
              }`}
              onClick={() => handleMenuClick('/registre')}
            >
              <FaUserPlus className="mr-3 ml-3" />
              Register User
            </li>

            <hr className="border-gray-700" />

            {/* Logout Section */}
            <li
              className="flex items-center cursor-pointer py-2 px-4  rounded-lg  hover:bg-gray-700"
              onClick={() => handleMenuClick('/logout')}
            >
              <FaSignOutAlt className="mr-3 ml-3" />
              Logout
            </li>
          </ul>

          {/* User Info */}
          <div className="mt-4 text-sm text-gray-500">
            <p>Last Login:</p>
            <p>{new Date(user?.lastLogin).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
