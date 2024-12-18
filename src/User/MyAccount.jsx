import React, { useState } from "react";
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
  FaUserCircle,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const MyAccount = () => {
  const isActive = (path) => location.pathname === path;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="bg-gray-900 flex flex-grow">
        {/* Sidebar */}
        <div className="w-64 bg-[#1c1c1c]  ">
          {/* My Account Header */}

          {/* Navigation List */}
          <ul className="py-5">
            <li className="ml-4 py-2 mr-2 mt-2 rounded-lg bg-yellow-500 text-black font-semibold flex items-center gap-2">
              <i className="ml-4 fa fa-dice text-white-500 hover:text-black text-xl"></i>
              <span className="font-semibold dark:group-hover:text-profileModalSelectedItemColorDark text-left rtl:text-right group-hover:text-profileModalSelectedItemColorLight ">
                My Account
              </span>
            </li>
            <li className="mt-0.5 py-2 ml-3 mr-2 rounded-lg text-white hover:text-black hover:bg-yellow-500 cursor-pointer flex items-center gap-2">
              <i className="ml-4 fa fa-dice text-white-500 hover:text-black text-xl"></i>
              <span className="font-semibold dark:group-hover:text-profileModalSelectedItemColorDark text-left rtl:text-right group-hover:text-profileModalSelectedItemColorLight ">
                Casino Bets
              </span>
            </li>
            <li className="mt-0.5 px-2 py-2 ml-3 mr-2 rounded-lg text-white hover:text-black hover:bg-yellow-500 cursor-pointer flex items-center gap-2">
              <i className="ml-4 fa fa-futbol text-white-500 hover:text-black text-xl"></i>
              <span className="font-semibold dark:group-hover:text-profileModalSelectedItemColorDark text-left rtl:text-right group-hover:text-profileModalSelectedItemColorLight ">
                {" "}
                Sports Bets
              </span>
            </li>
            <li className="mt-0.5 px-2 py-2 ml-3 mr-2 rounded-lg text-white hover:text-black hover:bg-yellow-500 hover:text-black cursor-pointer flex items-center gap-2">
              <i className=" ml-4 fa fa-history text-white-500 hover:text-black text-xl"></i>
              <span className="font-semibold dark:group-hover:text-profileModalSelectedItemColorDark text-left rtl:text-right group-hover:text-profileModalSelectedItemColorLight ">
                Transactions History
              </span>
            </li>
            <li className="mt-0.5 px-2 py-2 ml-3 mr-2 rounded-lg text-white hover:text-black hover:bg-yellow-500 cursor-pointer flex items-center gap-2">
              <i className=" ml-4 fa fa-check-circle text-white-500 hover:text-black text-xl"></i>
              <span className="font-semibold dark:group-hover:text-profileModalSelectedItemColorDark text-left rtl:text-right group-hover:text-profileModalSelectedItemColorLight ">
                {" "}
                Verify Account
              </span>
            </li>
            <hr className="border-t border-[#FEFEFE1A] my-2 mx-4" />
            <li className=" mt-0.5px-2 py-2 ml-3 mr-2 rounded-lg text-white hover:text-black mt-auto hover:bg-yellow-500 cursor-pointer flex items-center gap-2">
              <i className="ml-6 fa fa-sign-out text-white-500 hover:text-black text-xl"></i>
              <span className="font-semibold dark:group-hover:text-profileModalSelectedItemColorDark text-left rtl:text-right group-hover:text-profileModalSelectedItemColorLight ">
                Logout
              </span>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 w-96 bg-gray-900 text-white p-6">
          <h1 className="text-2xl font-bold mb-6">My Account</h1>

          {/* Form */}
          <div className="flex flex-wrap gap-x-6 gap-y-4 mb-2">
            {/* <div className="grid grid-cols-2 gap-4 w-full md:mt-7"> */}
            {/* User ID */}
            <div className="w-full md:w-[calc(50%-0.75rem)]">
              <label className="block mb-2 text-gray-400">User ID</label>
              <div className="flex items-center bg-[#fff] px-4 py-2 rounded-lg h-11">
                <FaUserCircle className="text-primary-dark" size={20} />
                <input type="text" value="186100010261" readOnly className="text-black bg-transparent focus:outline-none border-none flex-1" />
                <button className="text-yellow-500">📋</button>
              </div>
            </div>

            {/* Username */}
            <div className="w-full md:w-[calc(50%-0.75rem)]">
              <label className="block mb-2 text-gray-400">Username</label>
              <div className="flex items-center bg-[#595d60] px-4 rounded-lg h-11">
                <FaUserCircle className="text-primary-dark" size={20} />
                <input type="text" value="testinguser" readOnly className="bg-transparent focus:outline-none border-none flex-1" />
              </div>
            </div>

            {/* Email */}
            <div className="w-full md:w-[calc(50%-0.75rem)]">
              <label className="block mb-2 text-gray-400">Email</label>
              <div className="flex items-center bg-[#fff] px-4 rounded-lg h-11">
                <i class="fa fa-envelope text-black" aria-hidden="true"></i>
                <input type="email" value="" className="bg-transparent focus:outline-none border-none flex-1" />
              </div>
            </div>

            {/* Currency */}
            <div className="w-full md:w-[calc(50%-0.75rem)]">
              <label className="block mb-2 text-gray-400">Currency</label>
              <select className="bg-[#595d60] text-white px-4 py-2 rounded-lg w-full focus:outline-none h-11">
                <option value="TND">Tunisia Dinar</option>
                <option value="USD">US Dollar</option>
                <option value="EUR">Euro</option>
              </select>
            </div>

            {/* Mobile Number */}
            <div className="w-full md:w-[calc(50%-0.75rem)]">
              <label className="block mb-2 text-gray-400">Mobile Number</label>
              <div className="flex bg-gray-700 px-4 py-2 rounded h-11 rounded-lg">
                <span className="mr-2">🇵🇰</span>
                <input type="text" placeholder="+92" className="bg-transparent focus:outline-none flex-1 border-none" />
              </div>
            </div>

            {/* First Name */}
            <div className="w-full md:w-[calc(50%-0.75rem)]">
              <label className="block mb-2 text-gray-400">First Name</label>
              <div className="flex items-center bg-[#fff] px-4 rounded-lg h-11">
                <input type="text" value="" className="bg-transparent focus:outline-none border-none flex-1" />
              </div>
            </div>

            {/* Last Name */}
            <div className="w-full md:w-[calc(50%-0.75rem)]">
              <label className="block mb-2 text-gray-400">Last Name</label>
              <div className="flex items-center bg-[#fff] px-4 rounded-lg h-11">
                <input type="text" value="" className="bg-transparent focus:outline-none border-none flex-1" />
              </div>
            </div>
          </div>
          {/* </div> */}

          {/* Update Button */}
          <div className="mt-6 w-full">
            <button className="updateProfileBtn text-black border-none bg-yellow-500 bg mainBtn w-full font-bold px-3 py-2 rounded-lg uppercase leading-3 text-sm dark:border-profileModalButtonBgDark border-profileModalButtonBgLight border-2 dark:bg-profileModalButtonBgDark bg-profileModalButtonBgLight dark:hover:bg-profileModalButtonBgHoverDark hover:bg-profileModalButtonBgHoverLight transition duration-300 h-10 mt-6">
              UPDATE
            </button>
          </div>

          <h1 className="md:mt-12  profileModalTitle text-2xl text-center md:text-left font-bold hidden lg:block">Change Password </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-4 mb-2 md:mt-10">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="relative w-full md:w-[calc(102%-0.75rem)]">
                <label className="block text-[#ababab] text-md font-medium mb-1">Current Password</label>
                <div className="relative">
                  {/* Input Field */}
                  <span className="absolute inset-y-0 left-0 pt-3 pl-4">
                    <FaLock className="text-primary-dark" size={20} />
                  </span>
                  {/* Toggle Icon */}
                  <input
                    type={showPassword ? "text" : "password"}
                    className="bg-no-repeat bg-left appearance-none rounded-lg p-3 pl-12 text-sm text-black w-full mb-4 border-0"
                    required
                    autoComplete="off"
                  />
                  <span onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 pt-3 right-3">
                    {showPassword ? <FaEye className="text-primary-dark" size={24} /> : <FaEyeSlash className="text-primary-dark" size={24} />}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative w-full md:w-[calc(50%-0.75rem)]">
              <label className="block text-[#ababab] text-md font-medium mb-1">New Password</label>
              <div className="relative">
                {/* Input Field */}

                <span className="absolute inset-y-0 left-0 pt-3 pl-4">
                  <FaLock className="text-primary-dark" size={20} />
                </span>
                {/* Toggle Icon */}
                <input
                  type={showPassword ? "text" : "password"}
                  className="bg-no-repeat bg-left appearance-none  rounded-lg p-3 pl-12 text-sm text-black w-full mb-4 border-0"
                  required
                  autoComplete="off"
                />
                <span onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0  pt-3 right-3">
                  {showPassword ? <FaEye className="text-primary-dark" size={24} /> : <FaEyeSlash className="text-primary-dark" size={24} />}
                </span>
              </div>
            </div>
            <div className="relative w-full md:w-[calc(50%-0.75rem)]">
              <label className="block text-[#ababab] text-md font-medium mb-1">Repeat New Password</label>
              <div className="relative">
                {/* Input Field */}

                <span className="absolute inset-y-0 left-0 pt-3 pl-4">
                  <FaLock className="text-primary-dark" size={20} />
                </span>
                {/* Toggle Icon */}
                <input
                  type={showPassword ? "text" : "password"}
                  className="bg-no-repeat bg-left appearance-none  rounded-lg p-3 pl-12 text-sm text-black w-full mb-4 border-0"
                  required
                  autoComplete="off"
                />
                <span onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0  pt-3 right-3">
                  {showPassword ? <FaEye className="text-primary-dark" size={24} /> : <FaEyeSlash className="text-primary-dark" size={24} />}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 w-full">
            <button className="updateProfileBtn text-white mb-4 border-none bg-[#1c1c1c] bg mainBtn w-full font-bold px-3 py-2 rounded-lg uppercase leading-3 text-sm dark:border-profileModalButtonBgDark border-profileModalButtonBgLight border-2 dark:bg-profileModalButtonBgDark bg-profileModalButtonBgLight dark:hover:bg-profileModalButtonBgHoverDark hover:bg-profileModalButtonBgHoverLight transition duration-300 h-10 mt-6">
              CHANGE PASSWORD
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyAccount;
