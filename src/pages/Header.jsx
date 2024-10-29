import React from 'react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext';

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/home');
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-900 text-white p-3 sm:p-4 shadow-lg">
            {/* Dashboard Title */}
            <h1 className="text-xl sm:text-2xl font-semibold">Dashboard</h1>

            {/* User Info Section */}
            <div className="flex items-center justify-between w-full sm:w-auto mt-4 sm:mt-0">
                {/* Left Section: Username and Avatar */}
                <div className="flex items-center space-x-3">
                    <FaUserCircle className="text-2xl sm:text-3xl" />
                    <div className="flex flex-col">
                        <span className="text-md sm:text-lg font-semibold">{user?.username || 'Guest'}</span>
                        <span className="text-sm text-gray-400">${user?.balance || 0}</span>
                    </div>
                </div>

                {/* Right Section: Role and Logout */}
                <div className="flex items-center space-x-4 ml-6 sm:ml-8">
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
        </div>
    );
};

export default Header;
