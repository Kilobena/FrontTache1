import React from 'react';
import { FaBars, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext';
import BetDropDown from '../User/BetDropDown';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'


const HeaderAdmin = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/home');
    };
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

    const logoutDropDown = [
        {
            title: 'My Acount',
            image: <i class="fa-solid fa-money-bill"></i>,
            cash: "1000"

        },
    ]

    return (
        <div className="bg-[#242424] text-white p-3 sm:p-4 shadow-lg flex flex-col w-full mr-4"> {/* Ajout de 'mr-4' */}
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
                    <BetDropDown agentDropDownData={agentDropDownData} balance={user?.balance || 0} />
                    <button className='bg-yellow-500 hover:bg-yellow-400 font-bold py-2 px-4 text-sm transition duration-300 rounded-lg text-black font-light'>{user?.username || 'Guest'}</button>
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <MenuButton
                                className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-white px-3 py-2 text-sm font-semibold text-gray-900 border border-gray-300 hover:text-yellow-500 hover:border-yellow-500"
                            >
                                {user?.role || 'User'}
                                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                            </MenuButton>
                        </div>
                        <MenuItems
                            className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-black shadow-lg  focus:outline-none"
                        >
                            <div className="py-1 ">

                                <MenuItem >

                                    <a
                                        href="#"
                                        className="border-b border-gray-900 block px-4 py-2 text-sm text-gray-900 text-gray-700 text-white "

                                    >
                                        {/* Display image and title */}
                                        <div className="flex items-center gap-2 justify-between">
                                            <ul className="flex gap-3 hover:text-yellow-500 group">
                                                <li><i class="fa-solid fa-money-bill"></i></li>
                                                <li>My Acount</li>
                                            </ul>



                                        </div>
                                    </a>

                                </MenuItem>
                                <div
                                    className="flex items-center space-x-1 bg-yellow-500 text-white mx-2 px-3 my-2 py-2 rounded-md hover:bg-yellow-600 transition cursor-pointer"
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
                        <span className="text-md md:text-lg font-semibold">{user?.username || 'Guest'}</span>
                        <span className="text-sm text-gray-400">£{user?.balance || 0}</span>
                    </div>
                    <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                        {user?.role || 'User'}
                    </span>
                    <div
                        className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 transition"
                        onClick={handleLogout}
                    >
                        <FaSignOutAlt className="mr-2 text-lg" />
                        <span className="text-md">Logout</span>
                    </div>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                    {new Date().toLocaleString('en-US', { timeZone: 'Africa/Tunis' })}
                </p>
            </div>
        </div>
    );
};


export default HeaderAdmin;
