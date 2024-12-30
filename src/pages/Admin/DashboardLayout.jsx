import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AppHeader from "../../components/layout/header/AppHeader";

const DashboardLayout = ({ user, logout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  useEffect(() => {
    if (window.innerWidth <= 991) {
      setIsSidebarOpen(false);
    }
  }, []);

  return (
    <div className="flex flex-col ">
      {/* Pass the isSidebarOpen state and toggleSidebar function to Header */}
      {/* <HeaderAdmin toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} /> */}

      <AppHeader toggleSidebar={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />

      {/* Sidebar and main content */}

      <div className="lg:p-5 p-2 sm:p-0  flex flex-col sm:flex-row w-full flex-1">
        {/* Sidebar can be toggled */}
        <Sidebar user={user} logout={logout} isSidebarOpen={isSidebarOpen} toggleSidebar={setIsSidebarOpen} />

        {/* Main content */}
        <div className="flex-1 lg:p-[1.5rem] p-3 bg-[#fff] rounded-lg md:rounded-none lg:rounded-tr-lg lg:rounded-br-lg ltr:lg:rounded-r-xl ltr:lg:rounded-l-none rtl:lg:rounded-l-xl rtl:lg:rounded-r-none">
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
