import React from "react";

const Modal = ({ onClose, children, title = "Login" }) => {
  return (
    <>
      <style jsx>
        {`
          .icon-modal-close {
            background-color: #1c1c1c !important;
            border-color: #1c1c1c !important;
            color: white) !important;
            border-radius: 8px !important;
            border-width: 1px !important;
            font-weight: 400 !important;
          }
        `}
      </style>
      <div className="fixed inset-0 flex backdrop-blur-md items-center justify-center bg-black bg-opacity-50 z-50">
        {/* Modal Container */}
        <div className="relative text-white max-w-md mb-5 rounded-2xl bg-[#242424] w-full transform transition-all duration-300 scale-100">
          {/* Modal Header*/}
          <div className="flex items-center justify-between mx-6 mt-6 rounded-t font-bold relative">
            <h2 className="font-light text-2xl uppercase max-w-[90%]">{title}</h2>
            <button
              onClick={onClose}
              className="icon-modal-close bg-primary-dark border-0 leading-none right-0 outline-none focus:outline-none absolute z-10 w-10 h-10 flex justify-center items-center"
            >
              <img src="https://www.bet24.gg/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FcloseModal.17393ee7.svg&w=160&q=75" alt="icon button" />
            </button>
          </div>
          {/* Modal Content */}
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
