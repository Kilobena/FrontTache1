import React from "react";

const Modal = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 sm:p-8">
            <div className="relative bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
