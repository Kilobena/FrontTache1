import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";
import plus18 from "../../assets/plus18-image.svg";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2E2E2E] py-20 sm:py-4 pt-4 py-12 border-t border-[#383838]">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex flex-col items-center space-y-6 sm:space-y-0 sm:flex-row sm:justify-between">
          <Link to="/home" className="flex items-center space-x-4">
            <img
              src={logo}
              alt="Logo"
              className="w-[3rem] h-[3rem] sm:w-[5rem] sm:h-[4rem] "
            />
            <h1 className="text-lg sm:text-xl font-bold text-yellow-500">
              CASHBET
            </h1>
          </Link>
          <div className="flex flex-row items-center space-x-5 sm:space-x-6 sm:space-y-0 sm:space-x-6">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition text-md"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition text-md"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition text-md"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition text-md"
            >
              FAQ
            </a>
          </div>
        </div>
        <hr className="my-6 border-l-4 border-white border-opacity-50 sm:mx-auto lg:my-8" />
        <div className="text-center space-y-2">
          <span className="block text-sm text-gray-500 dark:text-gray-400">
            Copyright 2024 © CASHBET
          </span>
          <span className="block text-sm text-gray-500 dark:text-gray-400">
            All Rights Reserved 2024
          </span>
        </div>
        <div className="pt-6 flex justify-center items-center space-x-6">
          {/* Plus18 Icon with Text */}
          <div className="flex items-center space-x-4">
            <img
              src={plus18}
              alt="plus18"
              className="w-[2.2rem] h-[2.2rem] filter brightness-0 invert"
            />
            <span className="pl-3 pr-3 font-semibold text-white border-2 border-white rounded-lg px-2 py-1 text-[12px] text-center uppercase whitespace-nowrap">
              Play
              <br />
              Responsibly
            </span>
          </div>

          {/* Vertical Separator */}
          <div className="border-l-2 border-white border-opacity-50 h-[3.2rem] sm:h-[3.5rem]"></div>

          {/* Social Media Links */}
          <div className="flex space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              <FaFacebook size={28} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200 transition"
            >
              <FaTwitter size={28} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 transition"
            >
              <FaInstagram size={28} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
