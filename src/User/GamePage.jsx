import React from "react";
import { useNavigate } from "react-router-dom";
import Featured from "./Featured";
import New from "./New";
import Slots from "./Slots";
import Crash from "./Crash";
import LiveCasino from "./LiveCasino";
import Amatic from "./Amatic";
import Pragmatic from "./Pragmatic";
import Footer from "./Footer";
import BottomBar from "../pages/BottomBar";

const GamesPage = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#242424] text-white min-h-screen overflow-hidden mt-2 relative scrollbar-hide">
      <div className=" container mx-auto px-0 pb-20 scrollbar-hide">
        {/* mobil Section */}

        <div className="bg-[#2E2E2E] rounded-lg shadow-md block lg:hidden">
          {/* Title Section */}
          <div className="flex justify-between items-center  border-gray-700 ">
            <h2 className="text-xl md:text-2xl p-2 font-bold flex items-center space-x-3 text-white">
              <img
                src="https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_featured.svg&w=160&q=75"
                alt="Featured"
              />
              <span>Featured</span>
            </h2>
            <button
              onClick={() => navigate("/featured")}
              className="bg-[#1C1C1C] m-2 duration-300 min-w-[112px] cursor-pointer space-x-2 rtl:space-x-reverse font-semibold p-1.5 px-3 sm:p-2.5 sm:px-4 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-[#494949] transition"
            >
              View All
            </button>
          </div>
          <div className="!m-0 !p-0 flex !flex-wrap !gap-4 !important">
            <Featured
              limit={16}
              hideFooter
              hideExtras
              horizontalOnMobile
              className="!m-0 !p-0 flex-auto !important"
            />
          </div>

          <div className="flex justify-between items-center  border-gray-700">
            <h2 className="text-xl md:text-2xl p-2 font-bold flex items-center space-x-3 text-white">
              <img
                src="https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fcasino_Live%20Casino.svg&w=160&q=75"
                alt="LiveCasino"
              />
              <span>Live Casino</span>
            </h2>
            <button
              onClick={() => navigate("/livecasino")}
              className="bg-[#1C1C1C] m-2 duration-300 min-w-[112px] cursor-pointer space-x-2 rtl:space-x-reverse font-semibold p-1.5 px-3 sm:p-2.5 sm:px-4 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-[#494949] transition"
            >
              View All
            </button>
          </div>
          <LiveCasino
            limit={16}
            hideFooter
            hideExtras
            horizontalOnMobile
            className="m-0 p-0 flex flex-wrap gap-4 mt-4"
          />

          <div className="flex justify-between items-center  border-gray-700">
            <h2 className="text-xl md:text-2xl p-2 font-bold flex items-center space-x-3 text-white">
              <img
                src="https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fcasino_Live%20Casino.svg&w=160&q=75"
                alt="New"
              />
              <span>New</span>
            </h2>
            <button
              onClick={() => navigate("/new")}
              className="bg-[#1C1C1C] m-2 duration-300 min-w-[112px] cursor-pointer space-x-2 rtl:space-x-reverse font-semibold p-1.5 px-3 sm:p-2.5 sm:px-4 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-[#494949] transition"
            >
              View All
            </button>
          </div>
          <New
            limit={16}
            hideFooter
            hideExtras
            horizontalOnMobile
            className="m-0 p-0"
          />

          <div className="flex justify-between items-center  border-gray-700">
            <h2 className="text-xl md:text-2xl p-2  font-bold flex items-center space-x-3 text-white">
              <img
                src="https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_slots.svg&w=160&q=75"
                alt="Slots"
              />
              <span>Slots</span>
            </h2>
            <button
              onClick={() => navigate("/slots")}
              className="bg-[#1C1C1C] m-2 duration-300 min-w-[112px] cursor-pointer space-x-2 rtl:space-x-reverse font-semibold p-1.5 px-3 sm:p-2.5 sm:px-4 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-[#494949] transition"
            >
              View All
            </button>
          </div>
          <Slots
            limit={16}
            hideFooter
            hideExtras
            horizontalOnMobile
            className="m-0 p-0"
          />

          <div className="flex justify-between items-center  border-gray-700">
            <h2 className="text-xl md:text-2xl p-2 font-bold flex items-center space-x-3 text-white">
              <img
                src="https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fcasino_Crash.svg&w=160&q=75"
                alt="Crash"
                className="w-6 h-6 object-contain bg-white rounded-full"
              />
              <span>Crash</span>
            </h2>
            <button
              onClick={() => navigate("/crash")}
              className="bg-[#1C1C1C] m-2 duration-300 min-w-[112px] cursor-pointer space-x-2 rtl:space-x-reverse font-semibold p-1.5 px-3 sm:p-2.5 sm:px-4 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-[#494949] transition"
            >
              View All
            </button>
          </div>
          <Crash
            limit={16}
            hideFooter
            hideExtras
            horizontalOnMobile
            className="m-0 p-0"
          />

          <div className="flex justify-between items-center  border-gray-700">
            <h2 className="text-xl md:text-2xl p-2 font-bold flex items-center space-x-3 text-white">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2950/2950744.png"
                alt="Pragmatic"
                className="w-6 h-6 object-contain bg-white rounded-full"
              />
              <span>Pragmatic</span>
            </h2>
            <button
              onClick={() => navigate("/pragmatic")}
              className="bg-[#1C1C1C] m-2 duration-300 min-w-[112px] cursor-pointer space-x-2 rtl:space-x-reverse font-semibold p-1.5 px-3 sm:p-2.5 sm:px-4 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-[#494949] transition"
            >
              View All
            </button>
          </div>
          <Pragmatic
            limit={16}
            hideFooter
            hideExtras
            horizontalOnMobile
            className="m-0 p-0"
          />

          <div className="flex justify-between items-center  border-gray-700">
            <h2 className="text-xl md:text-2xl p-2 font-bold flex items-center space-x-3 text-white">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1453/1453446.png"
                alt="Amatic"
                className="w-6 h-6 object-contain bg-white rounded-full"
              />
              <span>Amatic</span>
            </h2>
            <button
              onClick={() => navigate("/amatic")}
              className="bg-[#1C1C1C] m-2 duration-300 min-w-[112px] cursor-pointer space-x-2 rtl:space-x-reverse font-semibold p-1.5 px-3 sm:p-2.5 sm:px-4 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-[#494949] transition"
            >
              View All
            </button>
          </div>
          <Amatic
            limit={16}
            hideFooter
            hideExtras
            horizontalOnMobile
            className="m-2 p-0"
          />
        </div>

        {/* Featured Section */}

        <div className="hidden md:block container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[80rem]">
          <div className="bg-[#2E2E2E] rounded-lg shadow-md p-6">
            {/* Title Section */}
            <div className="flex justify-between items-center  border-gray-700 ">
              <h2 className="text-xl md:text-2xl font-bold flex items-center space-x-3 text-white">
                <img
                  src="https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_featured.svg&w=160&q=75"
                  alt="Featured"
                />
                <span>Featured</span>
              </h2>
              <button
                onClick={() => navigate("/featured")}
                className="bg-[#1C1C1C] duration-300 min-w-[112px] cursor-pointer space-x-2 rtl:space-x-reverse font-semibold p-1.5 px-3 sm:p-2.5 sm:px-4 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-[#494949] transition"
              >
                View All
              </button>
            </div>
            <div className="!m-0 !p-0 flex !flex-wrap !gap-4 !important">
              <Featured
                limit={16}
                hideFooter
                hideExtras
                horizontalOnMobile
                className="!m-0 !p-0 flex-auto !important"
              />
            </div>
          </div>
        </div>

        {/* New Section */}
        <div className="hidden md:block container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[80rem]">
          <div className="bg-[#2E2E2E] rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center  border-gray-700">
              <h2 className="text-xl md:text-2xl font-bold flex items-center space-x-3 text-white">
                <img
                  src="https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fcasino_Live%20Casino.svg&w=160&q=75"
                  alt="LiveCasino"
                />
                <span>Live Casino</span>
              </h2>
              <button
                onClick={() => navigate("/livecasino")}
                className="bg-[#1C1C1C] duration-300 min-w-[112px] cursor-pointer space-x-2 rtl:space-x-reverse font-semibold p-1.5 px-3 sm:p-2.5 sm:px-4 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-[#494949] transition"
              >
                View All
              </button>
            </div>
            <LiveCasino
              limit={16}
              hideFooter
              hideExtras
              horizontalOnMobile
              className="m-0 p-0 flex flex-wrap gap-4 mt-4"
            />
          </div>
        </div>

        <div className="hidden md:block container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[80rem]">
          <div className="bg-[#2E2E2E] rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center  border-gray-700">
              <h2 className="text-xl md:text-2xl font-bold flex items-center space-x-3 text-white">
                <img
                  src="https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fcasino_Live%20Casino.svg&w=160&q=75"
                  alt="New"
                />
                <span>New</span>
              </h2>
              <button
                onClick={() => navigate("/new")}
                className="bg-[#1C1C1C] duration-300 min-w-[112px] cursor-pointer space-x-2 rtl:space-x-reverse font-semibold p-1.5 px-3 sm:p-2.5 sm:px-4 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-[#494949] transition"
              >
                View All
              </button>
            </div>
            <New
              limit={16}
              hideFooter
              hideExtras
              horizontalOnMobile
              className="m-0 p-0"
            />
          </div>
        </div>

        {/* Slots Section */}
        <div className="hidden md:block container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[80rem]">
          <div className="bg-[#2E2E2E] rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center  border-gray-700">
              <h2 className="text-xl md:text-2xl font-bold flex items-center space-x-3 text-white">
                <img
                  src="https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_slots.svg&w=160&q=75"
                  alt="Slots"
                />
                <span>Slots</span>
              </h2>
              <button
                onClick={() => navigate("/slots")}
                className="bg-[#1C1C1C] duration-300 min-w-[112px] cursor-pointer space-x-2 rtl:space-x-reverse font-semibold p-1.5 px-3 sm:p-2.5 sm:px-4 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-[#494949] transition"
              >
                View All
              </button>
            </div>
            <Slots
              limit={16}
              hideFooter
              hideExtras
              horizontalOnMobile
              className="m-0 p-0"
            />
          </div>
        </div>

        {/* Crash Section */}
        <div className="hidden md:block container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[80rem]">
          <div className="bg-[#2E2E2E] rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center  border-gray-700">
              <h2 className="text-xl md:text-2xl font-bold flex items-center space-x-3 text-white">
                <img
                  src="https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fcasino_Crash.svg&w=160&q=75"
                  alt="Crash"
                  className="w-6 h-6 object-contain bg-white rounded-full"
                />
                <span>Crash</span>
              </h2>
              <button
                onClick={() => navigate("/crash")}
                className="bg-[#1C1C1C] duration-300 min-w-[112px] cursor-pointer space-x-2 rtl:space-x-reverse font-semibold p-1.5 px-3 sm:p-2.5 sm:px-4 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-[#494949] transition"
              >
                View All
              </button>
            </div>
            <Crash
              limit={16}
              hideFooter
              hideExtras
              horizontalOnMobile
              className="m-0 p-0"
            />
          </div>
        </div>

        {/* Pragmatic Section */}
        <div className="hidden md:block container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[80rem]">
          <div className="bg-[#2E2E2E] rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center  border-gray-700">
              <h2 className="text-xl md:text-2xl font-bold flex items-center space-x-3 text-white">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2950/2950744.png"
                  alt="Pragmatic"
                  className="w-6 h-6 object-contain bg-white rounded-full"
                />
                <span>Pragmatic</span>
              </h2>
              <button
                onClick={() => navigate("/pragmatic")}
                className="bg-[#1C1C1C] duration-300 min-w-[112px] cursor-pointer space-x-2 rtl:space-x-reverse font-semibold p-1.5 px-3 sm:p-2.5 sm:px-4 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-[#494949] transition"
              >
                View All
              </button>
            </div>
            <Pragmatic
              limit={16}
              hideFooter
              hideExtras
              horizontalOnMobile
              className="m-0 p-0"
            />
          </div>
        </div>

        {/* Amatic Section */}
        <div className="hidden md:block container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[80rem]">
          <div className="bg-[#2E2E2E] rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center  border-gray-700">
              <h2 className="text-xl md:text-2xl font-bold flex items-center space-x-3 text-white">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1453/1453446.png"
                  alt="Amatic"
                  className="w-6 h-6 object-contain bg-white rounded-full"
                />
                <span>Amatic</span>
              </h2>
              <button
                onClick={() => navigate("/amatic")}
                className="bg-[#1C1C1C] duration-300 min-w-[112px] cursor-pointer space-x-2 rtl:space-x-reverse font-semibold p-1.5 px-3 sm:p-2.5 sm:px-4 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-[#494949] transition"
              >
                View All
              </button>
            </div>
            <Amatic
              limit={16}
              hideFooter
              hideExtras
              horizontalOnMobile
              className="m-0 p-0"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Bottom Bar */}
      <div className="block md:hidden fixed bottom-0 w-full z-10 bg-[#242424]">
        <BottomBar />
      </div>
    </section>
  );
};

export default GamesPage;
