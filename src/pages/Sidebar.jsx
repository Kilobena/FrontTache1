import React from 'react';
import { FaUserPlus, FaUsers, FaMoneyCheckAlt, FaHistory, FaSignOutAlt, FaBars, FaTimes, FaGamepad, FaChartBar, FaTrophy, FaWallet } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext';

const Sidebar = ({ isOpen, toggleSidebar, user }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleMenuClick = (path) => {
        navigate(path);
        if (window.innerWidth < 640) {
            toggleSidebar();
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Toggle icon for sidebar (FaBars or FaTimes) */}
            <div className="sm:hidden fixed top-4 right-4 z-50">
                <button onClick={toggleSidebar} className="text-white bg-[#242424] p-2 rounded mt-20">
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            <div
                className={`fixed top-0 right-0 h-full bg-[#242424] text-white z-40 transform transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                } sm:translate-x-0 sm:static sm:w-64 w-full sm:h-auto`}
            >
                {/* Sidebar starts immediately at the top with reduced padding */}
                <div className="p-2">
                    {/* Menu Items */}
                    <ul className="space-y-6">
                        <li
                            className={`flex items-center cursor-pointer p-3 rounded hover:bg-yellow-500 ${isActive('/transferaction') ? 'bg-yellow-500' : ''}`}
                            onClick={() => handleMenuClick('/transferaction')}
                        >
                            <FaMoneyCheckAlt className="mr-3" />
                            Transfer
                        </li>

                        <li
                            className={`flex items-center cursor-pointer p-3 rounded hover:bg-yellow-500 ${isActive('/transferhistory') ? 'bg-yellow-500' : ''}`}
                            onClick={() => handleMenuClick('/transferhistory')}
                        >
                            <FaHistory className="mr-3" />
                            Transfers History
                        </li>

                        {/* Separation Line after Transfers */}
                        <hr className="border-gray-700" />

                        <li
                            className={`flex items-center cursor-pointer p-3 rounded hover:bg-yellow-500 ${isActive('/transfers-report') ? 'bg-yellow-500' : ''}`}
                            //onClick={() => handleMenuClick('/transfers-report')}
                        >
                            <FaChartBar className="mr-3" />
                            Transfers Report
                        </li>
                        <li
                            className={`flex items-center cursor-pointer p-3 rounded hover:bg-yellow-500 ${isActive('/gaming-report') ? 'bg-yellow-500' : ''}`}
                            //onClick={() => handleMenuClick('/gaming-report')}
                        >
                            <FaGamepad className="mr-3" />
                            Gaming Report
                        </li>

                        {/* Separation Line after Gaming Report */}
                        

                        <li
                            className={`flex items-center cursor-pointer p-3 rounded hover:bg-yellow-500 ${isActive('/sportsbook-bets') ? 'bg-yellow-500' : ''}`}
                            //onClick={() => handleMenuClick('/sportsbook-bets')}
                        >
                            <FaTrophy className="mr-3" />
                            Sportsbook Bets
                        </li>
                        <li
                            className={`flex items-center cursor-pointer p-3 rounded hover:bg-yellow-500 ${isActive('/casino-bets') ? 'bg-yellow-500' : ''}`}
                            //onClick={() => handleMenuClick('/casino-bets')}
                        >
                            <FaWallet className="mr-3" />
                            Casino Bets
                        </li>

                        {/* Separation Line after Casino Bets */}
                        <hr className="border-gray-700" />

                        <li
                            className={`flex items-center cursor-pointer p-3 rounded hover:bg-yellow-500 ${isActive('/user-management') ? 'bg-yellow-500' : ''}`}
                            onClick={() => handleMenuClick('/user-management')}
                        >
                            <FaUsers className="mr-3" />
                            Manage Users
                        </li>
                        <li
                            className={`flex items-center cursor-pointer p-3 rounded hover:bg-yellow-500 ${isActive('/registre') ? 'bg-yellow-500' : ''}`}
                            onClick={() => handleMenuClick('/registre')}
                        >
                            <FaUserPlus className="mr-3" />
                            Register User
                        </li>

                        {/* Separation Line after Register User */}
                        <hr className="border-gray-700" />

                        <li
                            className="flex items-center cursor-pointer p-3 rounded hover:bg-gray-700"
                            onClick={() => handleMenuClick('/logout')}
                        >
                            <FaSignOutAlt className="mr-3" />
                            Logout
                        </li>
                    </ul>
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
