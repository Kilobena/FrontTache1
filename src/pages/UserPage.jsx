import React from 'react';

const UserPage = ({ user }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Welcome, {user.username}!</h1>
            <p className="text-xl">You are logged in as a <strong>{user.role}</strong>.</p>

            {/* Additional static content */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-2">This is your user page!</h2>
                <p className="text-lg">Here you can view your account details and other user-specific content.</p>
            </div>
        </div>
    );
};

export default UserPage;
