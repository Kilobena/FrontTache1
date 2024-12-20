import React from "react";
import UserBalance from "./Actions/UserBalance";
import AccountSettings from "./Actions/AccountSetting";
import Modal from "../../ui/Modal";
import { FaCopy } from "react-icons/fa";

const UserActionsModal = ({ user, logout, setIsUserActionsModalOpen }) => {
  return (
    <>
      <style jsx>{`
        .modal-user-action a {
          border: 0;
          margin-bottom: 0.25rem;
        }
      `}</style>
      <Modal
        onClose={() => setIsUserActionsModalOpen(false)}
        className="w-full h-screen modal-user-action"
        title={
          <h2 className="bg-primary-dark w-full my-4 font-medium text-lg absolute left-0 -top-4 p-3">
            <span className="flex items-center gap-2">
              <svg className="w-10 h-10" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 0.000671387C3.58218 0.000671387 0 3.58215 0 8.00032C0 12.4185 3.58183 16 8 16C12.4185 16 16 12.4185 16 8.00032C16 3.58215 12.4185 0.000671387 8 0.000671387ZM8 2.39266C9.46183 2.39266 10.6464 3.57758 10.6464 5.03871C10.6464 6.50019 9.46183 7.68476 8 7.68476C6.53887 7.68476 5.3543 6.50019 5.3543 5.03871C5.3543 3.57758 6.53887 2.39266 8 2.39266ZM7.99824 13.9084C6.54028 13.9084 5.20495 13.3775 4.175 12.4986C3.9241 12.2846 3.77932 11.9708 3.77932 11.6415C3.77932 10.1597 4.97865 8.9737 6.46086 8.9737H9.53984C11.0224 8.9737 12.2172 10.1597 12.2172 11.6415C12.2172 11.9712 12.0731 12.2843 11.8218 12.4983C10.7922 13.3775 9.45656 13.9084 7.99824 13.9084Z"
                  fill="white"
                ></path>
              </svg>
              <span className="leading-none">
                <p className="mb-1">{user?.username || "Guest"}</p>
                <small className="text-primary-yellow flex gap-2">
                  {user._id.substring(0, 10)} <FaCopy />
                </small>
              </span>
            </span>
          </h2>
        }
      >
        <div className="pt-20">
          <div className="px-4 mb-5">
            <UserBalance user={user} />
          </div>
          <AccountSettings user={user} logout={logout} />
        </div>
      </Modal>
    </>
  );
};

export default UserActionsModal;
