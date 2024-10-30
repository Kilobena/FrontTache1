import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import BottomBar from './BottomBar';

const DashboardLayout = ({ user }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close state
    };

    return (
        <div className="flex flex-col h-full min-h-screen">
            {/* Pass the isSidebarOpen state and toggleSidebar function to Header */}
            <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

            {/* Sidebar and main content */}
            <div className="flex flex-col sm:flex-row w-full flex-1">
                {/* Sidebar can be toggled */}
                <Sidebar user={user} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

                {/* Main content */}
                <div className="flex-1 p-4 sm:p-8 bg-gray-100">
                    <Outlet />
                </div>
            </div>

            {/* Bottom bar for mobile navigation */}
            <BottomBar />
        </div>
    );
};

export default DashboardLayout;
