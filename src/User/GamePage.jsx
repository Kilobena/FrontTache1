import React from "react";
import Featured from "./Featured";
import New from "./New";
import Slots from "./Slots";
import Crash from "./Crash";
import LiveCasino from "./LiveCasino";
import Amatic from "./Amatic";
import Pragmatic from "./Pragmatic";
import Footer from "./Footer";
import BottomBar from "../pages/BottomBar";

const GamePage = () => {
  const sections = [
    { title: "🔥 Featured Games", Component: Featured },
    { title: "🌟 New Releases", Component: New },
    { title: "🎰 Slots", Component: Slots },
    { title: "🚀 Crash Games", Component: Crash },
    { title: "🎥 Live Casino", Component: LiveCasino },
    { title: "🎨 Amatic Games", Component: Amatic },
    { title: "🎯 Pragmatic Games", Component: Pragmatic },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F1F1F] to-[#2A2A2A] text-white">
      {/* Main Content */}
      <div className="container mx-auto py-12 px-4 space-y-16">
        {sections.map(({ title, Component }, index) => (
          <section
            key={index}
            className="rounded-xl p-6 shadow-lg bg-[#292929] hover:bg-[#333333] border border-gray-700 hover:shadow-xl transition-all duration-300"
          >
            {/* Section Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-white underline decoration-yellow-500 underline-offset-8">
                {title}
              </h2>
             
            </div>

            {/* Horizontal Scrolling for Game Cards */}
            <div className="flex overflow-x-auto gap-4 scrollbar-hide flex-nowrap md:flex-wrap">
              <Component limit={8} hideFooter={true} />
            </div>
          </section>
        ))}
      </div>

      <Footer />

      <div className="block md:hidden">
        <BottomBar />
      </div>
    </div>
  );
};

export default GamePage;
