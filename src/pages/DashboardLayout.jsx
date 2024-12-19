import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import HeaderAdmin from "./HeaderAdmin";
import BottomBar from "./BottomBar";
import AppHeader from "../User/AppHeader";

const DashboardLayout = ({ user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close state
  };

  return (
    <div className="flex flex-col h-full min-h-screen">
      {/* Pass the isSidebarOpen state and toggleSidebar function to Header */}
      {/* <HeaderAdmin toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} /> */}

      <AppHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>

      {/* Sidebar and main content */}
      <div className="lg:p-5  flex flex-col sm:flex-row w-full flex-1">
        {/* Sidebar can be toggled */}
        <Sidebar user={user} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main content */}
        <div className="flex-1 p-6 bg-[#fff]">
          <Outlet />
        </div>
      </div>

      {/* Bottom bar for mobile navigation */}
      {/* <div className="block md:hidden fixed bottom-0 w-full z-10 bg-[#242424]">
        <BottomBar />
      </div> */}
    </div>
  );
};

export default DashboardLayout;
