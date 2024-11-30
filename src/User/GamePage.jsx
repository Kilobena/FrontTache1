import React from "react";
import Featured from "./Featured";
import New from "./New";
import Slots from "./Slots";
import Crash from "./Crash";
import Providers from "./Providers";
import LiveCasino from "./LiveCasino"; // Import LiveCasino with limit functionality
import Amatic from "./Amatic";
import Pragmatic from "./Pragmatic";
import Footer from "./Footer"; // Footer component for contact info

const GamePage = () => {
  return (
    <div className="min-h-screen bg-[#2E2E2E] text-white">
      {/* Main Content */}
      <div className="container mx-auto py-12 space-y-16 px-4">
        {/* Featured Section */}
        <section className="bg-[#383838] rounded-lg p-8 shadow-md">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">
            🔥 Featured Games
          </h2>
          <Featured limit={12} hideFooter= {true}  />
        </section>

        {/* New Games Section */}
        <section className="bg-[#383838] rounded-lg p-8 shadow-md">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">
            🌟 New Releases
          </h2>
          <New limit={12} hideFooter= {true}  />
        </section>

        {/* Slots Section */}
        <section className="bg-[#383838] rounded-lg p-8 shadow-md">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">
            🎰 Slots
          </h2>
          <Slots limit={12} hideFooter= {true}  />
        </section>

        {/* Crash Section */}
        <section className="bg-[#383838] rounded-lg p-8 shadow-md">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">
            🚀 Crash Games
          </h2>
          <Crash limit={12} hideFooter= {true} />
        </section>

        {/* Providers Section 
        <section className="bg-[#383838] rounded-lg p-8 shadow-md">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">
            🏢 Providers
          </h2>
          <Providers limit={12} hideFooter= {true}  />
        </section>
        */}
        {/* Live Casino Section */}
        <section className="bg-[#383838] rounded-lg p-8 shadow-md">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">
            🎥 Live Casino
          </h2>
          <LiveCasino limit={12} hideFooter= {true} /> {/* Show 12 games */}
        </section>

        {/* Amatic Section */}
        <section className="bg-[#383838] rounded-lg p-8 shadow-md">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">
            🎨 Amatic Games
          </h2>
          <Amatic limit={12} hideFooter= {true}  />
        </section>

        {/* Pragmatic Section */}
        <section className="bg-[#383838] rounded-lg p-8 shadow-md">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">
            🎯 Pragmatic Games
          </h2>
          <Pragmatic limit={12} hideFooter= {true}  />
        </section>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default GamePage;
