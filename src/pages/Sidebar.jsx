import React from 'react';
import { FaUserPlus, FaUsers, FaMoneyCheckAlt, FaHistory } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext'; 

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;
    const { user } = useAuth();  // Get the user from AuthContext

    return (
        <div className="min-h-screen w-64 bg-gray-900 text-white flex flex-col justify-between">
            <div className="p-4">
                <h2 className="text-xl font-bold mb-6">AGENT MENU</h2>
                <ul className="space-y-6">
                    <li 
                        className={`flex items-center cursor-pointer p-2 rounded hover:bg-yellow-700 ${isActive('/transferaction') ? 'bg-gray-800' : ''}`}
                        onClick={() => navigate('/transferaction')}
                    >
                        <FaMoneyCheckAlt className="mr-3" />
                        Transfer
                    </li>
                    <li 
                        className={`flex items-center cursor-pointer p-2 rounded hover:bg-yellow-700 ${isActive('/transferhistory') ? 'bg-gray-800' : ''}`}
                        onClick={() => navigate('/transferhistory')}
                    >
                        <FaHistory className="mr-3" />
                        Transfers History
                    </li>
                    <li 
                        className={`flex items-center cursor-pointer p-2 rounded hover:bg-yellow-700 ${isActive('/user-management') ? 'bg-gray-800' : ''}`}
                        onClick={() => navigate('/user-management')}
                    >
                        <FaUsers className="mr-3" />
                        Manage Users
                    </li>
                    <li 
                        className={`flex items-center cursor-pointer p-2 rounded hover:bg-yellow-700 ${isActive('/registre') ? 'bg-gray-800' : ''}`}
                        onClick={() => navigate('/registre')}
                    >
                        <FaUserPlus className="mr-3" />
                        Register User
                    </li>

                    
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
