import React from 'react';
import sportsImage from '../assets/sports-image.webp'; // Replace with your actual path
import casinoImage from '../assets/casino-image.jpg'; // Replace with your actual path

import BottomBar from '../pages/BottomBar';
import Header from '../pages/Header';

const HomePage = () => {
  return (
    <div className="bg-[#242424] text-white min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Carousel Indicators */}
      <div className="bg-gray-800 p-4 flex justify-center space-x-4">
        <span className="h-2 w-8 bg-yellow-500 rounded-full"></span>
        <span className="h-2 w-8 bg-white rounded-full"></span>
        <span className="h-2 w-8 bg-gray-500 rounded-full"></span>
      </div>

      {/* Main Content */}
      <main className="p-4 space-y-6 overflow-y-auto flex-grow">
        {/* Sports Section */}
        <div className="bg-gray-700 rounded-lg overflow-hidden">
          <div className="relative">
            <img src={sportsImage} alt="Sports" className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-black opacity-30"></div>
          </div>
          <div className="p-4 text-center">
            <h2 className="text-2xl font-bold mb-2">SPORTS</h2>
            <button className="inline-block bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded hover:bg-yellow-400 transition">
              PLAY NOW →
            </button>
          </div>
        </div>

        {/* Live Sports Section */}
        <div className="bg-gray-700 rounded-lg overflow-hidden">
          <div className="relative">
            <img src={casinoImage} alt="Live Sports" className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-black opacity-30"></div>
          </div>
          <div className="p-4 text-center">
            <h2 className="text-2xl font-bold mb-2">LIVE SPORTS</h2>
            <button className="inline-block bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded hover:bg-yellow-400 transition">
              PLAY NOW →
            </button>
          </div>
        </div>
      </main>

      {/* Bottom bar for navigation */}
      <BottomBar />
    </div>
  );
};

export default HomePage;
