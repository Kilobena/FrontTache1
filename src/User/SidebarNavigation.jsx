import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthContext"; // Import the AuthContext hook
import logo from "../assets/logo.webp";
import BetDropDown from "./BetDropDown";
import { FaBars, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/20/solid'


const Navigation = ({ onLoginClick, onRegisterClick }) => {
  const [activeItem, setActiveItem] = useState("home");
  const { user, logout } = useAuth(); // Access user and logout from AuthContext

  const menuItems = [
    { path: "/home", label: "HOME", id: "home" },
    { path: "/sports-betting", label: "SPORTS BETTING", id: "sports" },
    { path: "/live-betting", label: "LIVE BETTING", id: "live" },
    { path: "/casino", label: "CASINO", id: "casino" },
    { path: "/livecasino", label: "LIVE CASINO", id: "livecasino" },
    { path: "/virtuals", label: "VIRTUALS", id: "virtuals" },
  ];
  const agentDropDownData = [
    {
      title: 'Cash',
      image: <i class="fa-solid fa-money-bill"></i>,
      cash: "1000"

    },
    {
      title: 'Sportsbook Bonus',
      image: <i class="fa-solid fa-money-bill"></i>,
      cash: "1000"
    },
    {
      title: 'Casino Bonus',
      image: <i class="fa-solid fa-money-bill"></i>,
      cash: "1000"
    },
    {
      title: 'Casino Bonus',
      image: <i class="fa-solid fa-money-bill"></i>,
      cash: "1000"
    },
  ];
  const logoutSection = [
    {
      title: 'My Acount',
      image: <i class="fa-solid fa-money-bill"></i>,


    },
    {
      title: 'Casino Bets',
      image: <i class="fa-solid fa-money-bill"></i>,

    },
    {
      title: 'Sports Bets',
      image: <i class="fa-solid fa-money-bill"></i>,

    },
    {
      title: 'Transaction History',
      image: <i class="fa-solid fa-money-bill"></i>,

    },
    {
      title: 'Verify Account',
      image: <i class="fa-solid fa-money-bill"></i>,

    },
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
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <h1 className="text-xl font-bold text-yellow-500">CASHBET</h1>
        </Link>

        {/* Center Section (Desktop) */}
        <nav className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`text-base ${activeItem === item.id
                ? "text-yellow-400"
                : "text-white hover:text-yellow-400"
                }`}
              onClick={() => setActiveItem(item.id)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <BetDropDown agentDropDownData={agentDropDownData} balance={user.balance?.toFixed(2) || "0.00"} />
              <Menu as="div" className="relative inline-block text-left">
                <div>
                <span className="pl-3 pt-1.5 absolute"><i class="fa-solid fa-money-bill"></i></span>
                  <MenuButton
                    className="pl-9 relative inline-flex w-28 justify-center gap-x-1.5 rounded-md text-white px-3 py-2 text-sm font-semibold text-gray-900 border border-gray-300 hover:text-yellow-500 hover:border-yellow-500"
                  >
                    {user?.role || 'User'}
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                  </MenuButton>
                </div>
                <MenuItems
                  className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-black shadow-lg  focus:outline-none"
                >
                  <div className="py-1 ">

                    <Menu.Item>
                      {() => (
                        <>
                          {logoutSection.map((e, index) => (
                            <a
                              key={index} // Make sure to add a key for each element when rendering a list
                              href="#"
                              className="border-b border-gray-900 block px-4 py-2 text-sm text-gray-900 text-gray-700 text-white"
                            >
                              <div className="flex items-center gap-2 justify-between">
                                <ul className="flex gap-3 hover:text-yellow-500 group">
                                  <li>{e?.image}</li>
                                  <li>{e?.title}</li>
                                </ul>
                              </div>
                            </a>
                          ))}
                        </>
                      )}
                    </Menu.Item>
                    
                    <div
                                    className="flex items-center justify-center space-x-1 bg-yellow-500 text-white mx-2 px-3 my-2 py-2 rounded-md hover:bg-yellow-600 transition cursor-pointer"
                                    onClick={logout}
                                >
                                    <FaSignOutAlt className="mr-2 text-lg" />
                                    <span className="text-md">Logout</span>
                                </div>
                  </div>
                </MenuItems>


              </Menu>



            </>
          ) : (
            <>
              <button
                onClick={onLoginClick}
                className="px-4 py-2 rounded-md text-sm border border-gray-500 hover:bg-gray-700"
              >
                Login
              </button>
              <button
                onClick={onRegisterClick}
                className="bg-yellow-500 px-4 py-2 rounded-md font-bold text-sm hover:bg-yellow-400"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
