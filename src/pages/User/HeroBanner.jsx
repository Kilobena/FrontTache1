import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slide1 from "../../assets/images/slides/homepage-slide-1.webp";
import Slide2 from "../../assets/images/slides/homepage-slide-2.webp";
import Slide3 from "../../assets/images/slides/homepage-slide-3.webp";
import Slide4 from "../../assets/images/slides/homepage-slide-4.webp";
import Slide5 from "../../assets/images/slides/homepage-slide-5.webp";
import Slide6 from "../../assets/images/slides/homepage-slide-6.webp";
import Slide7 from "../../assets/images/slides/homepage-slide-7.webp";
import Slide8 from "../../assets/images/slides/homepage-slide-8.webp";
import Slide9 from "../../assets/images/slides/homepage-slide-9.webp";

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="hidden sm:flex absolute top-1/2 right-0 transform -translate-y-1/2 text-white bg-[#242424] bg-opacity-70 w-12 h-12 flex items-center justify-center z-10 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 shadow-lg"
    >
      <FaChevronRight size={24} />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="hidden sm:flex absolute top-1/2 left-0 transform -translate-y-1/2 text-white bg-[#242424] bg-opacity-70 w-12 h-12 flex items-center justify-center z-10 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 shadow-lg"
    >
      <FaChevronLeft size={24} />
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
      <div className={`min-w-9 h-2 rounded-full transition-colors duration-300 ${i === currentSlide ? "bg-yellow-500" : "bg-white"}`} />
    ),
    appendDots: (dots) => (
      <div
        // eslint-disable-next-line react/no-unknown-property
        className="slick-dots"
        style={{
          position: "absolute",
          zIndex: 10,
          width: "100%",
          bottom: "30px",
          display: "flex",
          justifyContent: "center",
          gap: "7px",
        }}
      >
        {dots}
      </div>
    ),
  };

  const slides = [
    { image: Slide1 },
    { image: Slide2 },
    { image: Slide3 },
    { image: Slide4 },
    { image: Slide5 },
    { image: Slide6 },
    { image: Slide7 },
    { image: Slide8 },
    { image: Slide9 },
  ];

  return (
    <div className="relative bg-[#242424]">
      <style jsx="true">
        {`
          .slick-dots {
            display: flex;
            gap: 7px;
          }
          .slick-dots li {
            width: 2.5rem;
            height: 0.5rem;
            margin: 0 !important;
          }
          .welcome-banner .img-slide {
            position: absolute;
            inset: 0px;
            box-sizing: border-box;
            padding: 0px;
            border: none;
            margin: auto;
            display: block;
            width: 0px;
            height: 0px;
            min-width: 100%;
            max-width: 100%;
            min-height: 100%;
            max-height: 100%;
            object-fit: cover;
          }
        `}
      </style>
      <Slider className="welcome-banner" {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            {/* h-[125px] sm:h-[350px] md:h-[550px] */}
            <div
              className="relative brightness-40 pointer-events-none
              relative h-full bg-cover bg-center transition-transform duration-700 ease-in-out"
              // style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div style={{ paddingTop: "calc(29.1605%)" }}>
                <span>
                  <img className="img-slide" src={slide.image} />
                </span>
              </div>
              {/* <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
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
              </div> */}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroBanner;
