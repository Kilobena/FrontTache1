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
    <section className="bg-[#242424] text-white min-h-screen overflow-hidden mt-2 relative">
      <div className="container mx-auto px-0 pb-20"> {/* Added padding-bottom */}
        {/* Featured Section */}
        <div className="space-y-0">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl md:text-2xl font-bold flex items-center space-x-2">
              <span role="img" aria-label="Featured">⭐</span>
              <span>Featured</span>
            </h2>
            <button
              onClick={() => navigate("/featured")}
              className="text-yellow-400 hover:text-yellow-300 font-semibold focus:outline-none"
            >
              View All
            </button>
          </div>
          <div className="m-0 p-0">
            <Featured
              limit={16}
              hideFooter
              hideExtras
              horizontalOnMobile
              className="m-0 p-0"
            />
          </div>
        </div>

        <div className="space-y-0">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl md:text-2xl font-bold flex items-center space-x-2">
              <span role="img" aria-label="New">🆕</span>
              <span>New </span>
            </h2>
            <button
              onClick={() => navigate("/new")}
              className="text-yellow-400 hover:text-yellow-300 font-semibold focus:outline-none"
            >
              View All
            </button>
          </div>
          <div className="m-0 p-0">
            <New 
              limit={16}
              hideFooter
              hideExtras
              horizontalOnMobile
              className="m-0 p-0"
            />
          </div>
        </div>

        <div className="space-y-0">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl md:text-2xl font-bold flex items-center space-x-2">
              <span role="img" aria-label="Slots">🎰</span>
              <span>Slots</span>
            </h2>
            <button
              onClick={() => navigate("/featured")}
              className="text-yellow-400 hover:text-yellow-300 font-semibold focus:outline-none"
            >
              View All
            </button>
          </div>
          <div className="m-0 p-0">
            <Slots
              limit={16}
              hideFooter
              hideExtras
              horizontalOnMobile
              className="m-0 p-0"
            />
          </div>
        </div>

        <div className="space-y-0">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl md:text-2xl font-bold flex items-center space-x-2">
              <span role="img" aria-label="Crash ">🚀 </span>
              <span>Crash Games</span>
            </h2>
            <button
              onClick={() => navigate("/featured")}
              className="text-yellow-400 hover:text-yellow-300 font-semibold focus:outline-none"
            >
              View All
            </button>
          </div>
          <div className="m-0 p-0">
            <Crash
              limit={16}
              hideFooter
              hideExtras
              horizontalOnMobile
              className="m-0 p-0"
            />
          </div>
        </div>

        <div className="space-y-0">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl md:text-2xl font-bold flex items-center space-x-2">
              <span role="img" aria-label="Live Casino">🎨 </span>
              <span> Amatic Games</span>
            </h2>
            <button
              onClick={() => navigate("/featured")}
              className="text-yellow-400 hover:text-yellow-300 font-semibold focus:outline-none"
            >
              View All
            </button>
          </div>
          <div className="m-0 p-0">
            <Amatic
              limit={16}
              hideFooter
              hideExtras
              horizontalOnMobile
              className="m-0 p-0"
            />
          </div>
        </div>

        <div className="space-y-0">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl md:text-2xl font-bold flex items-center space-x-2">
              <span role="img" aria-label="Featured">🎯</span>
              <span> Pragmatic Games</span>
            </h2>
            <button
              onClick={() => navigate("/featured")}
              className="text-yellow-400 hover:text-yellow-300 font-semibold focus:outline-none"
            >
              View All
            </button>
          </div>
          <div className="m-0 p-0">
            <Pragmatic 
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
