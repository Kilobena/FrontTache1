import React from 'react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext'; 

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth(); 

    const handleLogout = () => {
        logout(); 
        console.log('User logged out, token removed');
        navigate('/home'); 
        console.log('Redirecting to /home');
    };

    return (
        <div className="flex items-center justify-between bg-gray-900 text-white p-4 shadow-lg">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 border-r border-gray-600 pr-4">
                    <FaUserCircle className="text-3xl" aria-label="User profile" />
                    <div className="text-lg font-semibold">{user?.username || 'Guest'}</div> {/* Utiliser l'opérateur de coalescence nulle */}
                </div>
                <div className="flex flex-col items-center px-4 border-r border-gray-600 hover:bg-gray-800 rounded transition duration-200">
                    <span className="text-xl font-bold text-green-400">${user?.balance || 0}</span> {/* Utiliser l'opérateur de coalescence nulle */}
                </div>
                <div className="flex flex-col items-center px-4 hover:bg-gray-800 rounded transition duration-200">
                    <span className="bg-yellow-500 text-black px-3 py-1 rounded-full font-semibold">{user?.role || 'User'}</span> {/* Utiliser l'opérateur de coalescence nulle */}
                </div>
                <div 
                    className="flex items-center cursor-pointer hover:bg-gray-800 p-2 rounded transition duration-200" 
                    onClick={handleLogout}
                    aria-label="Logout"
                >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                </div>
            </div>
        </div>
    );
};

export default Header;
