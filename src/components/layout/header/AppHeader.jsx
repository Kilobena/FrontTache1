import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../providers/AuthContext"; // Import the AuthContext hook

import BalanceDropDown from "./BalanceDropDown";
import UserActionsDropdown from "./UserActionsDropdown";
import UserActionsModal from "./UserActionsModal";
import { HiMiniBars3 } from "react-icons/hi2";
// import { IoCloseOutline } from "react-icons/io5";

const AppHeader = ({ excludeGameCategoryHeader, onLoginClick, onRegisterClick, isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("home");
  const { user, logout } = useAuth(); // Access user and logout from AuthContext
  const [isUserActionsModalOpen, setIsUserActionsModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const isUserRole = user?.role === "User";

  const [isMobile, setIsMobile] = useState(window?.innerWidth <= 991);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
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

  const menuItems = [
    { path: "/home", label: "HOME", id: "home" },
    { path: "/sports-betting", label: "SPORTS BETTING", id: "sports" },
    { path: "/live-betting", label: "LIVE BETTING", id: "live" },
    { path: "/casino", label: "CASINO", id: "casino" },
    { path: "/livecasino", label: "LIVE CASINO", id: "livecasino" },
    { path: "/virtuals", label: "VIRTUALS", id: "virtuals" },
  ];
  return (
    <>
      <header className="bg-[#1d1d1d] text-white shadow-lg">
        <div className="flex items-center justify-between py-2 px-3">
          {/* Left Section */}
          <Link to={"/home"} className="flex items-center space-x-4" onClick={() => setActiveItem("home")}>
            <span className="flex mr-5 lg:max-w-56 max-w-36">
              <img src="https://assets.bet24.gg/sites/bet24/Bet24-New logo.png" alt="Bet24" title="Bet24" />
            </span>
          </Link>

          {/* Center Section (Desktop) */}
          {/* {isUserRole || !user ? ( */}
          <nav className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`text-base lg:text-[15px] text-nowrap ${
                  activeItem === item.id ? "text-primary-yellow" : "text-white hover:text-yellow-400"
                }`}
                onClick={() => setActiveItem(item.id)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {/* ) : null} */}

          {/* Right Section */}
          <div className="flex items-center space-x-3 pl-4">
            {user ? (
              <>
                {!isMobile ? (
                  <div className="flex gap-3">
                    <BalanceDropDown user={user} />
                    {user && !isUserRole ? (
                      <Link
                        to="/agent/transfer"
                        className="bg-yellow-500 hover:bg-yellow-400 uppercase py-2 px-4 text-sm transition duration-300 rounded-lg text-black font-light"
                      >
                        {user && user?.role ? user?.role : "Guest"}
                      </Link>
                    ) : null}
                    <UserActionsDropdown user={user} logout={logout} />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <span
                        className="flex text-nowrap justify-center gap-x-1.5 rounded-md text-white px-2 py-1 text-[12px] font-light border border-[#636363] hover:border-primary-yellow"
                        onClick={() => setIsUserActionsModalOpen(true)}
                      >
                        {user && user?.balance ? user?.balance.toFixed(2) : "0.00"}
                        <span className="-mt-[2px]">د.ت</span>{" "}
                      </span>
                      {!isUserRole && (
                        <Link
                          to="/agent/transfer"
                          className="px-2 py-1 bg-yellow-500 text-[12px] hover:bg-yellow-400 uppercase  text-sm transition duration-300 rounded-lg text-black font-light"
                        >
                          {user && user?.role ? user?.role : "Guest"}
                        </Link>
                      )}
                      <span onClick={() => setIsUserActionsModalOpen(true)}>
                        <svg className="w-[23px] h-[23px]" width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8 0.000671387C3.58218 0.000671387 0 3.58215 0 8.00032C0 12.4185 3.58183 16 8 16C12.4185 16 16 12.4185 16 8.00032C16 3.58215 12.4185 0.000671387 8 0.000671387ZM8 2.39266C9.46183 2.39266 10.6464 3.57758 10.6464 5.03871C10.6464 6.50019 9.46183 7.68476 8 7.68476C6.53887 7.68476 5.3543 6.50019 5.3543 5.03871C5.3543 3.57758 6.53887 2.39266 8 2.39266ZM7.99824 13.9084C6.54028 13.9084 5.20495 13.3775 4.175 12.4986C3.9241 12.2846 3.77932 11.9708 3.77932 11.6415C3.77932 10.1597 4.97865 8.9737 6.46086 8.9737H9.53984C11.0224 8.9737 12.2172 10.1597 12.2172 11.6415C12.2172 11.9712 12.0731 12.2843 11.8218 12.4983C10.7922 13.3775 9.45656 13.9084 7.99824 13.9084Z"
                            fill="white"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    {isUserActionsModalOpen ? (
                      <UserActionsModal user={user} logout={logout} setIsUserActionsModalOpen={() => setIsUserActionsModalOpen(false)} />
                    ) : null}
                  </>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    isMobile ? navigate("/login") : onLoginClick();
                  }}
                  className="lg:px-4 lg:py-2 px-3 lg:text-sm text-[10px] py-1 rounded-lg border border-gray-500 hover:border-primary-yellow transition-all"
                >
                  LOGIN
                </button>
                <button
                  onClick={onRegisterClick}
                  className="bg-primary-yellow text-black lg:px-4 lg:py-2 px-3 py-1 rounded-lg lg:text-sm text-[10px] hover:bg-yellow-400"
                >
                  REGISTER
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      {/*  && */}
      {isMobile && user && !isUserRole && !excludeGameCategoryHeader && (
        <div className="p-5">
          <div className="flex justify-between">
            <div className="flex flex-col justify-start float-start gap-1">
              <p className="text-lg font-semibold">AGENT MENU</p>
              <p className="text-sm flex-row space-x-1 rtl:space-x-reverse opacity-70">{`${formattedDate} - ${formattedTime} Africa/Tunis`}</p>
            </div>

            <button onClick={() => toggleSidebar(!isSidebarOpen)} className="text-white focus:outline-none mr-3">
              {isSidebarOpen ? (
                // <IoCloseOutline size={40} />
                <HiMiniBars3 size={40} />
              ) : (
                <HiMiniBars3 size={40} />
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AppHeader;