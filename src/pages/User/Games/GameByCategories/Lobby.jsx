import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Featured from "./Featured";
import New from "./New";
import Slots from "./Slots";
import Crash from "./Crash";
import LiveCasino from "./LiveCasino";
import Amatic from "./Amatic";
import Pragmatic from "./Pragmatic";

import { GAMES_CATEGORY_NAV } from "../../../../routes/routes_data";

const LobbyRevamp = () => {
  const navigate = useNavigate();

  return (
    <section className=" text-white min-h-screen overflow-hidden relative scrollbar-hide">
      <div className="container mx-auto px-0 pb-20 scrollbar-hide">
        {GAMES_CATEGORY_NAV.filter((fi) => fi.label !== "Lobby").map((item, index) => {
          return (
            <div key={index} className="hidden md:block container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[80rem]">
              <div className="bg-[#2E2E2E] lg:rounded-lg shadow-md p-6">
                {/* Title Section */}
                <div className="flex justify-between items-center  border-gray-700 ">
                  <h2 className="text-xl md:text-2xl p-2 font-bold flex items-center space-x-3 text-white">
                    <img src={item?.icon} alt={item.label} className="w-6 h-6" />
                    <span>{item.label}</span>
                  </h2>
                  <button
                    onClick={() => navigate(item.path)}
                    className="bg-[#1C1C1C] m-2 duration-300 min-w-[112px] cursor-pointer space-x-2 rtl:space-x-reverse font-semibold p-1.5 sm:p-2.5 sm:px-4 text-white px-4 py-2 rounded-lg text-sm shadow hover:bg-[#494949] transition"
                  >
                    View All
                  </button>
                </div>
                {item.component}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LobbyRevamp;
