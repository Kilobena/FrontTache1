import React from 'react';
import { FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/home');
    };

    return (
        <div className="bg-[#242424] text-white p-3 sm:p-4 shadow-lg flex flex-col w-full">
            {/* Center the content and limit the width */}
            <div className="mx-auto w-full max-w-5xl">
                {/* Top Section: Hamburger Menu, Dashboard Title, and User Info */}
                <div className="flex items-center justify-between">
                    {/* Hamburger Menu Icon for mobile view */}
                    <button
                        onClick={toggleSidebar}
                        className="sm:hidden text-white text-2xl focus:outline-none mr-3"
                    >
                    </button>

                    {/* Dashboard Title (Visible on larger screens only) */}
                </div>

                {/* Centered User Info Section */}
                <div className="flex items-center justify-center mt-3 space-x-3">
                    <FaUserCircle className="text-2xl sm:text-3xl" />

                    <div className="flex flex-col">
                        <span className="text-md sm:text-lg font-semibold">{user?.username || 'Guest'}</span>
                        <span className="text-sm text-gray-400">${user?.balance || 0}</span>
                    </div>

                    <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                        {user?.role || 'User'}
                    </span>

                    <div
                        className="flex items-center cursor-pointer hover:bg-gray-800 p-2 rounded transition duration-200"
                        onClick={handleLogout}
                    >
                        <FaSignOutAlt className="mr-2 text-lg" />
                        <span className="text-md">Logout</span>
                    </div>
                </div>

                {/* Bottom Section: "AGENT MENU" and Date */}
                <div className="text-center mt-4 sm:mt-2">
                    <h1 className="text-xl font-semibold">AGENT MENU</h1>
                    <p className="text-sm text-gray-400">
                        {new Date().toLocaleString('en-US', { timeZone: 'Africa/Tunis' })}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Header;
