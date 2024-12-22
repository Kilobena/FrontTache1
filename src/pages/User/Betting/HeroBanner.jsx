import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slide1 from "../../../assets/images/slides/sports-betting-slide-1.webp";

const HeroBanner = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  const slides = [{ image: Slide1 }];

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
              <div style={{ paddingTop: "calc(13%)" }}>
                <span>
                  <img className="img-slide" src={slide.image} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroBanner;
