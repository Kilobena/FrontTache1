import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import pragmaticPlayImage1 from "../assets/casino-image.jpg";
import pragmaticPlayImage2 from "../assets/live-casino.webp";
import pragmaticPlayImage3 from "../assets/live-sports.jpg";

const HeroBanner = () => {
  // Arrow components with enhanced design
  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white bg-[#242424] bg-opacity-70 rounded-full w-12 h-12 flex items-center justify-center z-10 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 shadow-lg"
    >
      <FaChevronRight size={20} />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute top-1/2 left-5 transform -translate-y-1/2 text-white bg-[#242424] bg-opacity-70 rounded-full w-12 h-12 flex items-center justify-center z-10 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 shadow-lg"
    >
      <FaChevronLeft size={20} />
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div
        className="absolute bottom-5 flex justify-center w-full z-10"
      >
        <ul className="flex space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-8 h-2 bg-white opacity-50 rounded-full mx-2 relative">
        {/* Progress Indicator */}
        <motion.div
          className="absolute inset-0 bg-yellow-500 h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }} // Sync with autoplay speed
        ></motion.div>
      </div>
    ),
  };

  const slides = [
    {
      image: pragmaticPlayImage1,
      title: "Explore Our Casino Games",
      description: "Play exciting slots, table games, and exclusive casino experiences.",
    },
    {
      image: pragmaticPlayImage2,
      title: "Live Casino Action",
      description: "Join live dealers for the most thrilling casino experiences.",
    },
    {
      image: pragmaticPlayImage3,
      title: "Live Betting Action",
      description: "Place your bets in real-time with the best odds in the industry.",
    },
  ];

  return (
    <div className="relative bg-gray-800">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-96 md:h-[500px]">
            <div
              className="relative h-full bg-cover bg-center transition-transform duration-700 ease-in-out"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-12 text-white">
                <motion.h1
                  className="text-3xl md:text-5xl font-bold"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  className="mt-4 text-lg md:text-xl"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  {slide.description}
                </motion.p>
                <motion.button
                  className="mt-6 bg-yellow-500 px-6 py-3 rounded-lg text-gray-900 font-semibold hover:bg-yellow-400 transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Join Now
                </motion.button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroBanner;
