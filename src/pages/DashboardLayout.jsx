import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Import the Sidebar component
import Header from './Header';

const DashboardLayout = ({ user }) => {
    return (
        <div className="h-screen flex">
            {/* Sidebar */}
            <Sidebar user={user} />

            {/* Main Content Area */}
            <div className="flex flex-col w-full">
                {/* Header */}
                <Header user={user} /> 

                {/* Main content area that changes based on the route */}
                <main className="flex-1 p-8 bg-gray-100">
                    <Outlet /> {/* This renders the child component based on the current route */}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
