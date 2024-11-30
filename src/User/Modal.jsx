import React from "react";
import PropTypes from "prop-types";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      {/* Modal Content */}
      <div className="relative bg-gray-900 rounded-lg shadow-2xl w-11/12 sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-1/2 overflow-hidden animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600 transition shadow-lg"
          aria-label="Close Modal"
        >
          ✕
        </button>

        {/* Content */}
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired, // The content of the modal
  onClose: PropTypes.func.isRequired, // Function to handle modal close
};

export default Modal;
