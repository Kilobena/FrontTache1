import React from "react";

const Modal = ({ onClose, children, title, className }) => {
  return (
    <>
      <style jsx>
        {`
          .icon-modal-close {
            // background-color: #1c1c1c !important;
            border-color: #1c1c1c !important;
            color: white) !important;
            border-radius: 8px !important;
            border-width: 1px !important;
            font-weight: 400 !important;
          }
        `}
      </style>
      <div className="!mx-0 fixed inset-0 backdrop-blur-md flex lg:items-center items-start justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
        {/* Modal Container */}
        <div
          className={`overflow-y-auto relative text-white lg:rounded-2xl rounded-none bg-[#2e2e2e] transform transition-all duration-300 scale-100 w-full ${className}`}
        >
          {/* Modal Header*/}
          <div className="flex items-center justify-between px-4 rounded-t font-bold relative">
            {title}
            <button
              onClick={onClose}
              className="icon-modal-close hover:bg-[#494949] bg-primary-dark border-0 leading-none right-4 top-4 outline-none focus:outline-none absolute z-20 w-9 h-9 flex justify-center items-center"
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
