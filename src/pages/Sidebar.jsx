import React from 'react';
import { FaUserPlus, FaUsers, FaMoneyCheckAlt, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ user }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        // Clear the token from localStorage
        localStorage.removeItem('token');
        
        // Log for debugging
        console.log('User logged out, token removed');
        
        // Redirect to the login page after logout
        navigate('/home');
        
        // Log the redirection to ensure it's happening
        console.log('Redirecting to /');
    };

    return (
        <div className="h-full w-64 bg-gray-900 text-white flex flex-col justify-between">
            <div className="p-4">
                <h2 className="text-xl font-bold mb-6">AGENT MENU</h2>
                <ul className="space-y-6">
                    <li 
                        className={`flex items-center cursor-pointer p-2 rounded ${isActive('/transferaction') ? 'bg-gray-800' : ''}`}
                        onClick={() => navigate('/transferaction')}
                    >
                        <FaMoneyCheckAlt className="mr-3" />
                        Transfer
                    </li>
                    <li 
                        className={`flex items-center cursor-pointer p-2 rounded ${isActive('/transferhistory') ? 'bg-gray-800' : ''}`}
                        onClick={() => navigate('/transferhistory')}
                    >
                        <FaHistory className="mr-3" />
                        Transfers History
                    </li>
                    <li 
                        className={`flex items-center cursor-pointer p-2 rounded ${isActive('/user-management') ? 'bg-gray-800' : ''}`}
                        onClick={() => navigate('/user-management')}
                    >
                        <FaUsers className="mr-3" />
                        Manage Users
                    </li>
                    <li 
                        className={`flex items-center cursor-pointer p-2 rounded ${isActive('/registre') ? 'bg-gray-800' : ''}`}
                        onClick={() => navigate('/registre')}
                    >
                        <FaUserPlus className="mr-3" />
                        Register User
                    </li>
                </ul>
            </div>
            <div className="p-4">
                {/* Logout Action */}
                <div 
                    className="flex items-center cursor-pointer hover:bg-gray-800 p-2 rounded" 
                    onClick={handleLogout}
                >
                    <FaSignOutAlt className="mr-3" />
                    Logout
                </div>
                {/* Display last login or any other user-specific information */}
                <p className="mt-6 text-xs">
                    {user ? (
                        <>
                            Last Login: <br />
                            {user.lastLogin || 'N/A'}
                        </>
                    ) : (
                        'Not logged in'
                    )}
                </p>
            </div>
        </div>
    );
};

export default Sidebar;
