import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import AccountSettings from "./Actions/AccountSetting";

const UserActionsDropdown = ({ user, logout, onClickActions }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="flex w-33 justify-center gap-x-1.5 rounded-md text-white px-3 py-2 text-sm font-semibold border border-gray-300 hover:border-yellow-500">
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 0.000671387C3.58218 0.000671387 0 3.58215 0 8.00032C0 12.4185 3.58183 16 8 16C12.4185 16 16 12.4185 16 8.00032C16 3.58215 12.4185 0.000671387 8 0.000671387ZM8 2.39266C9.46183 2.39266 10.6464 3.57758 10.6464 5.03871C10.6464 6.50019 9.46183 7.68476 8 7.68476C6.53887 7.68476 5.3543 6.50019 5.3543 5.03871C5.3543 3.57758 6.53887 2.39266 8 2.39266ZM7.99824 13.9084C6.54028 13.9084 5.20495 13.3775 4.175 12.4986C3.9241 12.2846 3.77932 11.9708 3.77932 11.6415C3.77932 10.1597 4.97865 8.9737 6.46086 8.9737H9.53984C11.0224 8.9737 12.2172 10.1597 12.2172 11.6415C12.2172 11.9712 12.0731 12.2843 11.8218 12.4983C10.7922 13.3775 9.45656 13.9084 7.99824 13.9084Z"
              fill="white"
            ></path>
          </svg>
          {user?.username || "Guest"}
        </span>
        <span>
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </span>
      </MenuButton>
      <MenuItems className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-primary-dark shadow-lg  focus:outline-none">
        <AccountSettings logout={logout} onClickActions={onClickActions} />
      </MenuItems>
    </Menu>
  );
};

export default UserActionsDropdown;
