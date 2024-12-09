import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import pragmaticPlayImage1 from "../assets/live-bet-image.jpg";
import pragmaticPlayImage2 from "../assets/casino-roulette-image.jpg";
import pragmaticPlayImage3 from "../assets/sports-bet-image.jpg";

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="hidden sm:flex absolute top-1/2 right-5 transform -translate-y-1/2 text-white bg-[#242424] bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center z-10 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 shadow-lg"
    >
      <FaChevronRight size={18} />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="hidden sm:flex absolute top-1/2 left-5 transform -translate-y-1/2 text-white bg-[#242424] bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center z-10 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 shadow-lg"
    >
      <FaChevronLeft size={18} />
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
    beforeChange: (current, next) => setCurrentSlide(next),
    customPaging: (i) => (
      <div
        className={`w-9 h-2 rounded-full transition-colors duration-300 ${
          i === currentSlide ? "bg-yellow-500" : "bg-white"
        }`}
      />
    ),
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          width: "100%",
          bottom: "10px",
          display: "flex",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        {dots}
      </div>
    ),
  };

  const slides = [
    {
      image: pragmaticPlayImage1,
      title: "Explore Our Casino Games",
      description:
        "Play exciting slots, table games, and exclusive casino experiences.",
    },
    {
      image: pragmaticPlayImage2,
      title: "Live Casino Action",
      description:
        "Join live dealers for the most thrilling casino experiences.",
    },
    {
      image: pragmaticPlayImage3,
      title: "Live Betting Action",
      description:
        "Place your bets in real-time with the best odds in the industry.",
    },
  ];

  return (
    <div className="relative bg-[#242424]">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative h-[260px] sm:h-[350px] md:h-[500px]"
          >
            <div
              className="relative h-full bg-cover bg-center transition-transform duration-700 ease-in-out"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-start pl-4 sm:pl-6 md:pl-12 text-white">
                <motion.h1
                  className="pl-8 text-lg sm:text-xl md:text-3xl font-bold"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  className="pl-8 mt-2 text-sm sm:text-base md:text-lg"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  {slide.description}
                </motion.p>
                <motion.button
                  className="ml-8 mt-4 bg-yellow-500 px-6 py-2 rounded-lg text-gray-900 font-semibold hover:bg-yellow-400 transition-all duration-300"
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
