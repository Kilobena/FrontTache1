import React from "react";

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex backdrop-blur-md items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Modal Container */}
      <div
        className="relative text-white max-w-md mb-5 pt-3 rounded-2xl bg-[#242424]  w-full transform transition-all duration-300 scale-100"
      >
        {/* Close Button */}
        
        <button
          onClick={onClose}
          className="absolute top-2 right-6 text-gray-400 hover:text-white text-2xl"
        >
          &times;
        </button>
        <h2 className="mx-5 text-3xl font-bold text-left">
        Login      </h2>
        

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
