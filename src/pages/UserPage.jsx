import React from 'react';
import { useAuth } from '../providers/AuthContext';  // Import useAuth to access user from context
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
    const { user, logout } = useAuth();  // Fetch user and logout from AuthContext
    const navigate = useNavigate();  // Hook for navigation

    if (!user) {
        return <p className="text-center text-gray-600">Loading user data...</p>;  // Fallback in case user is not yet available
    }

    // Logout handler
    const handleLogout = () => {
        logout();  // Use the logout function from AuthContext
        navigate('/home');  // Navigate to home after logging out
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                {/* User Avatar */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        className="w-20 h-20 rounded-full mb-4 border border-gray-300"
                        src={`https://ui-avatars.com/api/?name=${user.username}&background=fff&color=000&bold=true`}  // Avatar based on username
                        alt="User Avatar"
                    />
                    <h1 className="text-2xl font-semibold text-gray-800">Welcome, {user.username}!</h1>
                    <p className="text-md text-gray-500 mt-1">
                        You are logged in as a <strong>{user.role}</strong>.
                    </p>
                </div>

                {/* User Info Section */}
                <div className="my-6 text-center">
                    <h2 className="text-xl font-medium text-gray-700 mb-2">Your Dashboard</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Here you can view your account details and access personalized features.
                    </p>
                </div>

                {/* Logout button */}
                <button
                    onClick={handleLogout}
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserPage;
