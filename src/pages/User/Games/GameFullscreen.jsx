import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.webp";
import PropTypes from "prop-types";

const GameFullscreen = ({ children, onClose }) => {
  // Prevent body scrolling when component mounts
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#242424] flex flex-col z-50 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#242424] p-4 flex justify-between items-center">
        <Link to="/home" className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <h1 className="text-xl font-bold text-yellow-500">CASHBET</h1>
        </Link>
        <button
          onClick={onClose}
          className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600 transition shadow-lg"
          aria-label="Close Modal"
        >
          ✕
        </button>
      </div>

      {/* Content - Takes remaining height */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
};

GameFullscreen.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default GameFullscreen;
