import React, { useState } from "react";
import { USER_ACTIONS } from "../../../../routes/routes_data";
import Modal from "../../../ui/Modal";
import MyAccount from "../../../../pages/User/AccountSetting/MyAccount";
import { RiLogoutBoxRLine } from "react-icons/ri";

const AccountSettings = ({ logout, user }) => {
  const [isMyAccountModalOpen, setIsMyAccountModalOpen] = useState(false);

  const handleUserActions = (path) => {
    if (path === USER_ACTIONS[0].path) {
      setIsMyAccountModalOpen(true);
    }
  };

  let isUserRole = user?.role === "User";
  return (
    <>
      <div className="lg:h-auto h-[calc(100vh-340px)] overflow-y-auto">
        {USER_ACTIONS.filter((fi) => {
          if (isUserRole) {
            return true;
          }
          return fi.title === "My Account";
        }).map((item, index) => (
          <a
            key={index}
            href="#"
            className="border-b border-b-gray-900 block px-4 py-2 text-sm text-white"
            onClick={() => handleUserActions(item.path)}
          >
            <div className="flex items-center gap-2 justify-between">
              <ul>
                <li className="flex items-center gap-2 hover:text-primary-yellow">
                  <span className="w-7">
                    <img className="w-6 h-6" src={item.image} alt={item.title} />
                  </span>
                  {item.title}
                </li>
              </ul>
            </div>
          </a>
        ))}
      </div>
      <div className="p-2 lg:bg-none bg-primary-dark">
        <button
          className="flex items-center justify-center gap-1 space-x-1 bg-primary-yellow text-primary-dark px-3 md:py-[6px] py-3 rounded-lg hover:bg-primary-yellow transition cursor-pointer w-full"
          onClick={logout}
        >
          <RiLogoutBoxRLine size={20} />
          <span className="text-lg">Logout</span>
        </button>
      </div>
      {/* My Account Modal */}
      {isMyAccountModalOpen && (
        <Modal
          isOpen={isMyAccountModalOpen}
          onClose={() => setIsMyAccountModalOpen(false)}
          className="h-[calc(100vh-40px)] w-full max-w-[60rem] overflow-y-auto "
          title={<h2 className="font-bold text-2xl"></h2>}
        >
          <MyAccount />
        </Modal>
      )}
    </>
  );
};

export default AccountSettings;
