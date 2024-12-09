import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2E2E2E] py-4 mt-12 border-t border-[#383838]">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <Link to="/home" className="flex items-center space-x-4">
            <img src={logo} alt="Logo" className="w-16 h-1/2 h-8" />
            <h1 className="text-xl font-bold text-yellow-500">CASHBET</h1>
          </Link>
          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-white">
            <li>
              <a
                href="#"
                class="me-4 md:me-6 text-gray-300 hover:text-white transition"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                class="me-4 md:me-6 text-gray-300 hover:text-white transition"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                class="me-4 md:me-6 text-gray-300 hover:text-white transition"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-white transition">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          Copyright 2024 © CASHBET
        </span>
        <span class="pt-2 block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          All Rights Reserved 2024
        </span>

        <div className="pt-6 flex justify-center space-x-6 mt-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-200 transition"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 hover:text-pink-300 transition"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
