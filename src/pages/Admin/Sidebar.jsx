import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ADMIN_NAV } from "../../routes/APP_ROUTES";
import IconLogout from "../../assets/icons/icon-logout.svg";

const Sidebar = ({ isSidebarOpen, logout, toggleSidebar, user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  const handleMenuClick = (path) => {
    navigate(path);
    // Close the sidebar on mobile view after clicking a menu item
    if (window.innerWidth > 991) {
      toggleSidebar(true);
    } else {
      toggleSidebar(false);
    }
  };

  const isActive = (path) => location.pathname === path;
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, []);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Tunis",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(currentTime);

  const formattedTime = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Tunis",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(currentTime);

  return (
    <>
      <style jsx="true">{`
        .sidebar-nav li.active img,
        .sidebar-nav li:hover img {
          filter: invert(0%) sepia(0%) saturate(7500%) hue-rotate(343deg) brightness(105%) contrast(109%) !important;
        }
      `}</style>

      {/* Sidebar Menu */}
      <div
        className={`w-full overflow-y-hidden bg-[#242424] text-white z-40 transform transition-transform duration-300 static lg:w-[17.25rem] lg:h-full lg:right-0 lg:mt-0 lg:overflow-y-auto ${
          isSidebarOpen ? "lg:translate-x-0 top-full" : "lg:translate-x-full h-0"
        } `}
      >
        <div className="p-3">
          <div className="flex items-center agentMenuBorderBottom">
            <div className="hidden lg:flex px-2 py-2  flex-col space-y-2 agentToolPadding">
              <div className="text-lg font-bold uppercase">Agent Menu</div>
              <div className="text-sm mb-4 opacity-70">{`${formattedDate} - ${formattedTime} Africa/Tunis`}</div>
            </div>
          </div>
          <hr className="border-white/10 mb-3" />
          <ul className="sidebar-nav flex flex-col space-y-3 mb-3">
            {ADMIN_NAV.map((item, index) => {
              return (
                <>
                  <li
                    className={`cursor-pointer px-[14px] py-2 rounded-lg flex items-center w-full transition duration-300 font-semibold hover:text-black  hover:bg-primary-yellow text-[17px] ${
                      isActive("/agent" + "" + item.path) ? "bg-primary-yellow text-black" : "text-white"
                    }`}
                    onClick={() => handleMenuClick("/agent" + "" + item.path)}
                  >
                    <img
                      src={item.image}
                      alt={item.label}
                      className={`w-6 h-6 mr-3 ${isActive("/agent" + "" + item.path) ? "active" : "icon-white"}`}
                    />
                    {/* <FaChartBar className="mr-3 ml-3" /> */}
                    {item.title}
                  </li>
                  {index === 1 || index === 5 ? <hr className="border-white/10" /> : null}
                </>
              );
            })}

            {/* Logout Section */}
            <hr className="border-white/10" />

            <li
              className={`cursor-pointer px-[14px] py-2 rounded-lg flex items-center w-full transition duration-300 font-semibold hover:text-black  hover:bg-primary-yellow text-[17px] `}
              onClick={logout}
            >
              <img src={IconLogout} alt="logout" className={`mr-3 icon-white`} />
              Logout
            </li>
          </ul>
          <hr className="border-white/10" />

          {/* User Info */}
          <div className="p-4 text-xs flex flex-col space-y-1 opacity-70 mb-5">
            <p className="text-sm">Last Login:</p>
            <p className="mt-5 text-sm">{new Date(user?.userdate).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
