import React from "react";
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

const Sidebar = ({ isSidebarOpen, toggleSidebar, user }) => {
  const location = useLocation();
  const navigate = useNavigate();

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
  const options = {
    timeZone: "Africa/Tunis",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const tunisTime = new Intl.DateTimeFormat("en-GB", options).format(new Date());
  const formattedTime = tunisTime.replace(",", " -");

  return (
    <>
      {/* Toggle icon for sidebar */}

      {/* Sidebar Menu */}
      <div
        className={`w-full overflow-y-hidden bg-[#242424] text-white z-40 transform transition-transform duration-300 static lg:w-64 lg:h-full lg:right-0 lg:mt-0 lg:overflow-y-auto ${
          isSidebarOpen ? "lg:translate-x-0 top-full" : "lg:translate-x-full h-0"
        } `}
      >
        <div className="pr-3">
          <div className="flex items-center agentMenuBorderBottom">
            <div className="hidden lg:flex px-3 py-2  flex-col space-y-2 agentToolPadding">
              <div className="text-lg font-bold mb-2 uppercase">Agent Menu</div>
              <div className="text-sm mb-4 opacity-70">{`${formattedTime} ${options.timeZone}`}</div>
            </div>
          </div>
          <hr className="border-gray-700 mb-4" />
          <ul className="flex flex-col space-y-3">
            {/* Transfer Section */}
            <li
              className={`flex items-center w-full p-2 bg-yellow-500 text-black rounded-md transition duration-300 group-hover:text-agentToolSelected font-semibold ${
                isActive("/transferaction") ? "bg-[#f2c41a]" : ""
              }`}
              onClick={() => handleMenuClick("/transferaction")}
            >
              <FaMoneyCheckAlt className="mr-3 ml-3" />
              Transfer
            </li>

            <li
              className={`flex items-center cursor-pointer p-2  rounded-lg flex items-center w-full   rounded-md transition duration-300 group-hover:text-agentToolSelected font-semibold hover:text-black  hover:bg-yellow-500 ${
                isActive("/transferhistory") ? "bg-yellow-500" : ""
              }`}
              onClick={() => handleMenuClick("/transferhistory")}
            >
              <FaHistory className="mr-3 ml-3" />
              Transfers History
            </li>

            <hr className="border-gray-700" />

            {/* Reports Section */}
            <li
              className={`flex items-center cursor-pointer p-2  rounded-lg flex items-center w-full   rounded-md transition duration-300 group-hover:text-agentToolSelected font-semibold hover:text-black  hover:bg-yellow-500 ${
                isActive("/transfers-report") ? "bg-yellow-500" : ""
              }`}
              onClick={() => handleMenuClick("/tranfer_report")}
            >
              <FaChartBar className="mr-3 ml-3" />
              Transfers Report
            </li>

            <li
              className={`flex items-center cursor-pointer p-2  rounded-lg flex items-center w-full   rounded-md transition duration-300 group-hover:text-agentToolSelected font-semibold hover:text-black  hover:bg-yellow-500 ${
                isActive("/gaming-report") ? "bg-yellow-500" : ""
              }`}
              onClick={() => handleMenuClick("/gaming-report")}
            >
              <FaGamepad className="mr-3 ml-3" />
              Gaming Report
            </li>

            {/* Betting Section */}
            <li
              className={`flex items-center cursor-pointer p-2  rounded-lg flex items-center w-full   rounded-md transition duration-300 group-hover:text-agentToolSelected font-semibold hover:text-black  hover:bg-yellow-500 ${
                isActive("/sportsbook-bets") ? "bg-yellow-500" : ""
              }`}
              onClick={() => handleMenuClick("/sportsbook-bets")}
            >
              <FaTrophy className="mr-3 ml-3" />
              Sportsbook Bets
            </li>

            <li
              className={`flex items-center cursor-pointer p-2  rounded-lg flex items-center w-full   rounded-md transition duration-300 group-hover:text-agentToolSelected font-semibold hover:text-black  hover:bg-yellow-500 ${
                isActive("/casino-bets") ? "bg-yellow-500" : ""
              }`}
              onClick={() => handleMenuClick("/game")}
            >
              <FaWallet className="mr-3 ml-3" />
              Casino Bets
            </li>

            <hr className="border-gray-700" />

            {/* User Management Section */}
            <li
              className={`flex items-center cursor-pointer p-2  rounded-lg flex items-center w-full   rounded-md transition duration-300 group-hover:text-agentToolSelected font-semibold hover:text-black  hover:bg-yellow-500 ${
                isActive("/user-management") ? "bg-yellow-500" : ""
              }`}
              onClick={() => handleMenuClick("/user-management")}
            >
              <FaUsers className="mr-3 ml-3" />
              Manage Users
            </li>

            <li
              className={`flex items-center cursor-pointer p-2  rounded-lg flex items-center w-full   rounded-md transition duration-300 group-hover:text-agentToolSelected font-semibold hover:text-black  hover:bg-yellow-500 ${
                isActive("/registre") ? "bg-yellow-500" : ""
              }`}
              onClick={() => handleMenuClick("/registre")}
            >
              <FaUserPlus className="mr-3 ml-3" />
              Register User
            </li>

            <hr className="border-gray-700" />

            {/* Logout Section */}
            <li
              className="flex items-center cursor-pointer p-2  rounded-lg flex items-center w-full   rounded-md transition duration-300 group-hover:text-agentToolSelected font-semibold hover:text-black  hover:bg-yellow-500"
              onClick={() => handleMenuClick("/logout")}
            >
              <FaSignOutAlt className="mr-3 ml-3" />
              Logout
            </li>
          </ul>

          {/* User Info */}
          <div className="mt-4 ml-4 text-sm text-gray-500">
            <p>Last Login:</p>
            <p>{new Date(user?.lastLogin).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
