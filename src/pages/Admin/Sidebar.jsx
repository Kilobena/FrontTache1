import React, { useEffect, useState } from "react";
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
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, logout, toggleSidebar, user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  const handleMenuClick = (path) => {
    navigate(path);
    // Close the sidebar on mobile view after clicking a menu item
    if (window.innerWidth > 991) {
      toggleSidebar(true);
    } else {
      toggleSidebar(false);
    }
  };

  const isActive = (path) => location.pathname === path;
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, []);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Tunis",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(currentTime);

  const formattedTime = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Tunis",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(currentTime);

  return (
    <>
      {/* Toggle icon for sidebar */}

      {/* Sidebar Menu */}
      <div
        className={`w-full overflow-y-hidden bg-[#242424] text-white z-40 transform transition-transform duration-300 static lg:w-[16.5rem] lg:h-full lg:right-0 lg:mt-0 lg:overflow-y-auto ${
          isSidebarOpen ? "lg:translate-x-0 top-full" : "lg:translate-x-full h-0"
        } `}
      >
        <div className="p-3">
          <div className="flex items-center agentMenuBorderBottom">
            <div className="hidden lg:flex px-2 py-2  flex-col space-y-2 agentToolPadding">
              <div className="text-lg font-bold uppercase">Agent Menu</div>
              <div className="text-sm mb-4 opacity-70">{`${formattedDate} - ${formattedTime} Africa/Tunis`}</div>
            </div>
          </div>
          <hr className="border-gray-700 mb-4" />
          <ul className="flex flex-col space-y-3 mb-3">
            {/* Transfer Section */}
            <li
              className={`flex items-center w-full p-2  rounded-md transition duration-300 group-hover:text-agentToolSelected font-semibold ${
                isActive("/agent/transfer") ? "bg-[#f2c41a] text-black" : "text-white"
              }`}
              onClick={() => handleMenuClick("/agent/transfer")}
            >
              <FaMoneyCheckAlt className="mr-3 ml-3" />
              Transfer
            </li>

            <li
              className={` cursor-pointer p-2    flex items-center w-full   rounded-lg transition duration-300 group-hover:text-agentToolSelected font-semibold hover:text-black  hover:bg-yellow-500 ${
                isActive("/agent/transfer-history") ? "bg-[#f2c41a] text-black" : "text-white"
              }`}
              onClick={() => handleMenuClick("/agent/transfer-history")}
            >
              <FaHistory className="mr-3 ml-3" />
              Transfers History
            </li>

            <hr className="border-gray-700" />

            {/* Reports Section */}
            <li
              className={` cursor-pointer p-2  rounded-lg flex items-center w-full    transition duration-300 group-hover:text-agentToolSelected font-semibold hover:text-black  hover:bg-yellow-500 ${
                isActive("/agent/transfer-report") ? "bg-[#f2c41a] text-black" : "text-white"
              }`}
              onClick={() => handleMenuClick("/agent/transfer-report")}
            >
              <FaChartBar className="mr-3 ml-3" />
              Transfers Report
            </li>

            <li
              className={`cursor-pointer p-2  rounded-lg flex items-center w-full transition duration-300 group-hover:text-agentToolSelected font-semibold hover:text-black  hover:bg-yellow-500 ${
                isActive("/agent/gaming-report") ? "bg-[#f2c41a] text-black" : "text-white"
              }`}
              onClick={() => handleMenuClick("/agent/gaming-report")}
            >
              <FaGamepad className="mr-3 ml-3" />
              Gaming Report
            </li>

            {/* Betting Section */}
            <li
              className={`cursor-pointer p-2  rounded-lg flex items-center w-full transition duration-300 group-hover:text-agentToolSelected font-semibold hover:text-black  hover:bg-yellow-500 ${
                isActive("/sportsbook-bets") ? "bg-[#f2c41a] text-black" : "text-white"
              }`}
              onClick={() => handleMenuClick("/sportsbook-bets")}
            >
              <FaTrophy className="mr-3 ml-3" />
              Sportsbook Bets
            </li>

            <li
              className={`cursor-pointer p-2  rounded-lg flex items-center w-full transition duration-300 group-hover:text-agentToolSelected font-semibold hover:text-black  hover:bg-yellow-500 ${
                isActive("/agent/casino-bets") ? "bg-[#f2c41a] text-black" : "text-white"
              }`}
              onClick={() => handleMenuClick("/agent/casino-bets")}
            >
              <FaWallet className="mr-3 ml-3" />
              Casino Bets
            </li>

            <hr className="border-gray-700" />

            {/* User Management Section */}
            <li
              className={`cursor-pointer p-2  rounded-lg flex items-center w-full transition duration-300 group-hover:text-agentToolSelected font-semibold hover:text-black  hover:bg-yellow-500 ${
                isActive("/agent/user-management") ? "bg-[#f2c41a] text-black" : "text-white"
              }`}
              onClick={() => handleMenuClick("/agent/user-management")}
            >
              <FaUsers className="mr-3 ml-3" />
              Manage Users
            </li>

            <li
              className={`cursor-pointer p-2  rounded-lg flex items-center w-full transition duration-300 group-hover:text-agentToolSelected font-semibold hover:text-black  hover:bg-yellow-500 ${
                isActive("/agent/register-user") ? "bg-[#f2c41a] text-black" : "text-white"
              }`}
              onClick={() => handleMenuClick("/agent/register-user")}
            >
              <FaUserPlus className="mr-3 ml-3" />
              Register User
            </li>

            <hr className="border-gray-700" />

            {/* Logout Section */}
            <li
              className="cursor-pointer p-2  rounded-lg flex items-center w-full transition duration-300 group-hover:text-agentToolSelected font-semibold hover:text-black  hover:bg-yellow-500"
              onClick={logout}
            >
              <FaSignOutAlt className="mr-3 ml-3" />
              Logout
            </li>
          </ul>
          <hr className="border-gray-700" />

          {/* User Info */}
          <div className="p-4 text-xs flex flex-col space-y-1 opacity-70 mb-5">
            <p className="text-sm">Last Login:</p>
            <p className="mt-5 text-sm">{new Date(user?.userdate).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
