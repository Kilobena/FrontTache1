import React from 'react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
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
        <div className="bg-[#242424] text-white p-3 sm:p-4 shadow-lg flex flex-col w-full mr-4"> {/* Ajout de 'mr-4' */}
            <div className="w-full flex flex-col lg:flex-row items-center justify-between">
                {/* Title aligned to the left only on larger screens */}
                <h1 className="text-xl md:text-2xl font-semibold hidden lg:block">AGENT MENU</h1>

                {/* User information aligned to the right only on larger screens */}
                <div className="hidden lg:flex items-center space-x-3 ml-auto">
                    <FaUserCircle className="text-2xl md:text-3xl" />
                    <div className="flex flex-col items-center sm:items-start">
                        <span className="text-md md:text-lg font-semibold">{user?.username || 'Guest'}</span>
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
            </div>

            {/* Center user information on mobile */}
            <div className="text-center mt-4 sm:mt-2 lg:hidden">
                <h1 className="text-xl font-semibold">AGENT MENU</h1>
                <div className="flex items-center justify-center space-x-3 mt-2">
                    <FaUserCircle className="text-2xl md:text-3xl" />
                    <div className="flex flex-col items-center">
                        <span className="text-md md:text-lg font-semibold">{user?.username || 'Guest'}</span>
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
                <p className="text-sm text-gray-400 mt-2">
                    {new Date().toLocaleString('en-US', { timeZone: 'Africa/Tunis' })}
                </p>
            </div>
        </div>
    );
};

export default Header;
