import React from "react";
import { FaBars, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import BalanceDropDown from "../User/BalanceDropDown";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const HeaderAdmin = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/home");
  };
  const userBalanceData = [
    {
      title: "Cash",
      image: "https://www.bet24.gg/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcash.9e24785d.svg&w=160&q=75",
      cash: 290,
    },
    {
      title: "Sportsbook Bonus",
      image: "https://www.bet24.gg/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbonus.6a39706b.svg&w=160&q=75",
      cash: 0,
    },
    {
      title: "Casino Bonus",
      image: "https://www.bet24.gg/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbonus.6a39706b.svg&w=160&q=75",
      cash: 0,
    },
    {
      title: "Casino Bonus",
      image: "https://www.bet24.gg/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftotal.14d0c515.svg&w=160&q=75",
      cash: 290,
    },
  ];

  return (
    <div className="bg-[#242424] text-white p-3 sm:p-4 shadow-lg flex flex-col w-full mr-4">
      {" "}
      {/* Ajout de 'mr-4' */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-between">
        {/* Title aligned to the left only on larger screens */}
        <h1 className="text-xl md:text-2xl font-semibold hidden lg:block">AGENT MENU</h1>

        {/* User information aligned to the right only on larger screens */}
        <div className="hidden lg:flex items-center space-x-3 ml-auto">
          {/* <FaUserCircle className="text-2xl md:text-3xl" />
                  <div className="flex flex-col items-center sm:items-start">
                      <span className="text-md md:text-lg font-semibold">{user?.username || 'Guest'}</span>
                      <span className="text-sm text-gray-400">${user?.balance || 0}</span>
                  </div>
                  <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                      {user?.role || 'User'}
                  </span> */}
          <BalanceDropDown userBalanceData={userBalanceData} balance={user?.balance || 0} />
          <button className="bg-yellow-500 hover:bg-yellow-400 uppercase py-2 px-4 text-sm transition duration-300 rounded-lg text-black font-light">
            {user?.role}
          </button>
          <Menu as="div" className="relative inline-block text-left">
            <div className="flex">
              <span className="absolute left-3 top-[11px]">
                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 0.000671387C3.58218 0.000671387 0 3.58215 0 8.00032C0 12.4185 3.58183 16 8 16C12.4185 16 16 12.4185 16 8.00032C16 3.58215 12.4185 0.000671387 8 0.000671387ZM8 2.39266C9.46183 2.39266 10.6464 3.57758 10.6464 5.03871C10.6464 6.50019 9.46183 7.68476 8 7.68476C6.53887 7.68476 5.3543 6.50019 5.3543 5.03871C5.3543 3.57758 6.53887 2.39266 8 2.39266ZM7.99824 13.9084C6.54028 13.9084 5.20495 13.3775 4.175 12.4986C3.9241 12.2846 3.77932 11.9708 3.77932 11.6415C3.77932 10.1597 4.97865 8.9737 6.46086 8.9737H9.53984C11.0224 8.9737 12.2172 10.1597 12.2172 11.6415C12.2172 11.9712 12.0731 12.2843 11.8218 12.4983C10.7922 13.3775 9.45656 13.9084 7.99824 13.9084Z"
                    fill="white"
                  ></path>
                </svg>
              </span>
              <MenuButton className="pl-9 relative inline-flex w-33 justify-center gap-x-1.5 rounded-md text-white px-3 py-2 text-sm font-semibold border border-gray-300 capitalize hover:border-yellow-500">
                {user?.username || "Guest"}
                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
              </MenuButton>
            </div>
            <MenuItems className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-black shadow-lg  focus:outline-none">
              <div className="py-1 ">
                <MenuItem>
                  <a href="#" className="border-b border-gray-900 block px-4 py-2 text-sm  text-white ">
                    {/* Display image and title */}
                    <div className="flex items-center gap-2 justify-between">
                      <ul>
                        <li className="flex items-center gap-2 hover:text-primary-yellow">
                          <img
                            src="https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Faccount_My%20account.svg&w=160&q=75"
                            alt="item icon"
                            className="w-6"
                          />
                          My Account
                        </li>
                      </ul>
                    </div>
                  </a>
                </MenuItem>
                <div
                  className="flex items-center justify-center space-x-1 bg-yellow-500 text-white mx-2 px-3 my-2 py-2 rounded-md hover:bg-yellow-600 transition cursor-pointer"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="mr-2 text-lg" />
                  <span className="text-md">Logout</span>
                </div>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>
      {/* Center user information on mobile */}
      <div className="text-center mt-4 sm:mt-2 lg:hidden">
        <h1 className="text-xl font-semibold">AGENT MENU</h1>
        <div className="flex items-center justify-center space-x-3 mt-2">
          <FaUserCircle className="text-2xl md:text-3xl" />
          <div className="flex flex-col items-center">
            <span className="text-md md:text-lg font-semibold">{user?.username || "Guest"}</span>
            <span className="text-sm text-gray-400">£{user?.balance || 0} د.ت</span>
          </div>
          <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">{user?.role || "User"}</span>
          <div
            className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 transition"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-2 text-lg" />
            <span className="text-md">Logout</span>
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-2">{new Date().toLocaleString("en-US", { timeZone: "Africa/Tunis" })}</p>
      </div>
    </div>
  );
};

export default HeaderAdmin;
