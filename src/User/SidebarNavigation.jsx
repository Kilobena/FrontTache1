import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext"; // Import the AuthContext hook
import logo from "../assets/logo.webp";
import { FaBars, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import BalanceDropDown from "./BalanceDropDown";
import Modal from "../Component/UI/Modal";
import MyAccount from "./MyAccount";
import UserActionsDropdown from "./UserActionsDropdown";
import UserActionsModal from "./UserActionsModal";

const Navigation = ({ onLoginClick, onRegisterClick }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("home");
  const { user, logout } = useAuth(); // Access user and logout from AuthContext
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserActionsModalOpen, setIsUserActionsModalOpen] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);
  const handleUserActions = (title) => {
    if (title === "My Acount") {
      setIsModalOpen(true);
    }
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { path: "/home", label: "HOME", id: "home" },
    { path: "/sports-betting", label: "SPORTS BETTING", id: "sports" },
    { path: "/live-betting", label: "LIVE BETTING", id: "live" },
    { path: "/game", label: "CASINO", id: "casino" },
    { path: "/livecasino", label: "LIVE CASINO", id: "livecasino" },
    { path: "/virtuals", label: "VIRTUALS", id: "virtuals" },
  ];

  return (
    <header className="bg-[#2E2E2E]text-white shadow-lg">
      <div className="flex items-center justify-between py-3 px-4">
        {/* Left Section */}
        <Link
          to="/home"
          className="flex items-center space-x-4"
          onClick={() => setActiveItem("home")}
        >
          <a class="flex mr-5 max-w-52" href="/">
            <img
              src="https://assets.bet24.gg/sites/bet24/Bet24-New logo.png"
              alt="Bet24"
              title="Bet24"
            />
          </a>
        </Link>

        {/* Center Section (Desktop) */}
        <nav className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`text-base md:text-sm text-nowrap ${
                activeItem === item.id
                  ? "text-primary-yellow"
                  : "text-white hover:text-yellow-400"
              }`}
              onClick={() => setActiveItem(item.id)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3 pl-4">
          {user ? (
            <>
              {!isMobile ? (
                <>
                  <BalanceDropDown user={user} />
                  <UserActionsDropdown
                    user={user}
                    logout={logout}
                    onClickActions={handleUserActions}
                  />
                </>
              ) : (
                <>
                  <div
                    className="flex items-center gap-3"
                    onClick={() => setIsUserActionsModalOpen(true)}
                  >
                    <span className="text-nowrap justify-center gap-x-1.5 rounded-md text-white px-2 py-1 text-[12px] font-light border border-gray-300 hover:border-primary-yellow">
                      {user.balance.toFixed(2)} د.ت
                    </span>
                    <span>
                      <svg
                        className="md:w-4 w-6 md:h-4 h-6"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 0.000671387C3.58218 0.000671387 0 3.58215 0 8.00032C0 12.4185 3.58183 16 8 16C12.4185 16 16 12.4185 16 8.00032C16 3.58215 12.4185 0.000671387 8 0.000671387ZM8 2.39266C9.46183 2.39266 10.6464 3.57758 10.6464 5.03871C10.6464 6.50019 9.46183 7.68476 8 7.68476C6.53887 7.68476 5.3543 6.50019 5.3543 5.03871C5.3543 3.57758 6.53887 2.39266 8 2.39266ZM7.99824 13.9084C6.54028 13.9084 5.20495 13.3775 4.175 12.4986C3.9241 12.2846 3.77932 11.9708 3.77932 11.6415C3.77932 10.1597 4.97865 8.9737 6.46086 8.9737H9.53984C11.0224 8.9737 12.2172 10.1597 12.2172 11.6415C12.2172 11.9712 12.0731 12.2843 11.8218 12.4983C10.7922 13.3775 9.45656 13.9084 7.99824 13.9084Z"
                          fill="white"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  {isUserActionsModalOpen ? (
                    <UserActionsModal
                      user={user}
                      setIsUserActionsModalOpen={() =>
                        setIsUserActionsModalOpen(false)
                      }
                    />
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
                className="lg:px-4 lg:py-2 px-3 lg:text-sm text-[10px] py-1 rounded-md border border-gray-500 hover:border-primary-yellow transition-all"
              >
                LOGIN
              </button>
              <button
                onClick={onRegisterClick}
                className="bg-primary-yellow text-black lg:px-4 lg:py-2 px-3 py-1 rounded-md lg:text-sm text-[10px] hover:bg-yellow-400"
              >
                REGISTER
              </button>
            </>
          )}
          {isModalOpen && (
            <Modal
              className="h-[calc(100vh-40px)] w-full max-w-[60rem] overflow-y-auto "
              title={<h2 className="font-bold text-2xl"></h2>}
              onClose={handleCloseModal}
            >
              <MyAccount />
            </Modal>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
