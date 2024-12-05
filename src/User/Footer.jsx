import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#2E2E2E] py-6 mt-12 border-t border-[#383838]">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-white">
        {/* Left Section - Contact Info */}
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-lg font-bold text-white">Contact Us</h2>
          <p>Email: <span className="text-gray-300">support@gamingbet.com</span></p>
          <p>Phone: <span className="text-gray-300">+1 800 123 4567</span></p>
          <p>Address: <span className="text-gray-300">123 Gaming Street, Las Vegas, NV</span></p>
        </div>

        {/* Middle Section - Navigation Links */}
        <div className="flex space-x-6 mt-4 md:mt-0 text-center">
          <a href="/privacy-policy" className="text-gray-300 hover:text-white transition">
            Privacy Policy
          </a>
          <a href="/terms" className="text-gray-300 hover:text-white transition">
            Terms of Service
          </a>
          <a href="/faq" className="text-gray-300 hover:text-white transition">
            FAQ
          </a>
        </div>

        {/* Right Section - Social Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-200 transition"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 hover:text-pink-300 transition"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
