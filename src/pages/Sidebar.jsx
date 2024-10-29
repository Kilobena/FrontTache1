import React, { useState } from 'react';
import { FaBars, FaTimes, FaUserPlus, FaUsers, FaMoneyCheckAlt, FaHistory } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    // Automatically close the sidebar on mobile after clicking an item
    const handleMenuClick = (path) => {
        navigate(path);
        if (window.innerWidth < 640) {  // Close the menu if screen width is less than 640px (mobile)
            setIsOpen(false);
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex">
            {/* Sidebar Toggle Button for Mobile */}
            <div className="sm:hidden">
                <button
                    onClick={toggleSidebar}
                    className="text-white bg-gray-800 p-2 m-2 rounded"
                >
                    <FaBars />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`min-h-screen w-64 bg-gray-900 text-white flex flex-col justify-between fixed sm:relative z-50 transition-transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } sm:translate-x-0`}
            >
                <div className="p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">AGENT MENU</h2>
                        {/* Close button for mobile */}
                        {isOpen && (
                            <button
                                onClick={toggleSidebar}
                                className="text-white sm:hidden"
                            >
                                <FaTimes size={24} />
                            </button>
                        )}
                    </div>
                    <ul className="space-y-6 mt-6">
                        <li
                            className={`flex items-center cursor-pointer p-2 rounded hover:bg-yellow-700 ${
                                isActive('/transferaction') ? 'bg-gray-800' : ''
                            }`}
                            onClick={() => handleMenuClick('/transferaction')}
                        >
                            <FaMoneyCheckAlt className="mr-3" />
                            Transfer
                        </li>
                        <li
                            className={`flex items-center cursor-pointer p-2 rounded hover:bg-yellow-700 ${
                                isActive('/transferhistory') ? 'bg-gray-800' : ''
                            }`}
                            onClick={() => handleMenuClick('/transferhistory')}
                        >
                            <FaHistory className="mr-3" />
                            Transfers History
                        </li>
                        <li
                            className={`flex items-center cursor-pointer p-2 rounded hover:bg-yellow-700 ${
                                isActive('/user-management') ? 'bg-gray-800' : ''
                            }`}
                            onClick={() => handleMenuClick('/user-management')}
                        >
                            <FaUsers className="mr-3" />
                            Manage Users
                        </li>
                        <li
                            className={`flex items-center cursor-pointer p-2 rounded hover:bg-yellow-700 ${
                                isActive('/registre') ? 'bg-gray-800' : ''
                            }`}
                            onClick={() => handleMenuClick('/registre')}
                        >
                            <FaUserPlus className="mr-3" />
                            Register User
                        </li>
                    </ul>
                </div>

                {/* Add anything to the bottom if needed */}
                <div className="p-4">
                    <p className="text-sm">© 2024 </p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
