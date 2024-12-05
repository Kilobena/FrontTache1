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
      <div className="container mx-auto px-0 pb-20 scrollbar-hide">
        {/* Featured Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-[#1e1e1e] rounded-lg shadow-md p-6">
            {/* Title Section */}
            <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center space-x-3 text-yellow-400">
                <img
                  src="https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_featured.svg&w=160&q=75"
                  alt="Featured"
          
                />
                <span>Featured</span>
              </h2>
              <button
                onClick={() => navigate("/featured")}
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-yellow-500 transition"
              >
                View All
              </button>
            </div>
            <div className="m-0 p-0 flex flex-wrap gap-4">
              <Featured
                limit={16}
                hideFooter
                hideExtras
                horizontalOnMobile
                className="m-0 p-0 flex-auto"
              />
            </div>
          </div>
        </div>

        {/* New Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-[#1e1e1e] rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center space-x-3 text-yellow-400">
                <img
                  src="https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fcasino_Live%20Casino.svg&w=160&q=75"
                  alt="LiveCasino"
                 
                />
                <span>LiveCasino</span>
              </h2>
              <button
                onClick={() => navigate("/livecasino")}
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-yellow-500 transition"
              >
                View All
              </button>
            </div>
            <LiveCasino limit={16} hideFooter hideExtras horizontalOnMobile className="m-0 p-0" />
          </div>
        </div>


        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-[#1e1e1e] rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center space-x-3 text-yellow-400">
                <img
                  src="https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fcasino_Live%20Casino.svg&w=160&q=75"
                  alt="New"
             
                />
                <span>New</span>
              </h2>
              <button
                onClick={() => navigate("/new")}
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-yellow-500 transition"
              >
                View All
              </button>
            </div>
            <New limit={16} hideFooter hideExtras horizontalOnMobile className="m-0 p-0" />
          </div>
        </div>

        

        {/* Slots Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-[#1e1e1e] rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center space-x-3 text-yellow-400">
                <img
                  src="https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_slots.svg&w=160&q=75"
                  alt="Slots"
               
                />
                <span>Slots</span>
              </h2>
              <button
                onClick={() => navigate("/slots")}
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-yellow-500 transition"
              >
                View All
              </button>
            </div>
            <Slots limit={16} hideFooter hideExtras horizontalOnMobile className="m-0 p-0" />
          </div>
        </div>

        {/* Crash Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-[#1e1e1e] rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center space-x-3 text-yellow-400">
                <img
                  src="https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fcasino_Crash.svg&w=160&q=75"
                  alt="Crash"
                  className="w-6 h-6 object-contain bg-white rounded-full"
                />
                <span>Crash</span>
              </h2>
              <button
                onClick={() => navigate("/crash")}
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-yellow-500 transition"
              >
                View All
              </button>
            </div>
            <Crash limit={16} hideFooter hideExtras horizontalOnMobile className="m-0 p-0" />
          </div>
        </div>

        {/* Pragmatic Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-[#1e1e1e] rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center space-x-3 text-yellow-400">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2950/2950744.png"
                  alt="Pragmatic"
                  className="w-6 h-6 object-contain bg-white rounded-full"
                />
                <span>Pragmatic</span>
              </h2>
              <button
                onClick={() => navigate("/pragmatic")}
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-yellow-500 transition"
              >
                View All
              </button>
            </div>
            <Pragmatic limit={16} hideFooter hideExtras horizontalOnMobile className="m-0 p-0" />
          </div>
        </div>

        {/* Amatic Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-[#1e1e1e] rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center space-x-3 text-yellow-400">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1453/1453446.png"
                  alt="Amatic"
                  className="w-6 h-6 object-contain bg-white rounded-full"
                />
                <span>Amatic</span>
              </h2>
              <button
                onClick={() => navigate("/amatic")}
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-yellow-500 transition"
              >
                View All
              </button>
            </div>
            <Amatic limit={16} hideFooter hideExtras horizontalOnMobile className="m-0 p-0" />
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