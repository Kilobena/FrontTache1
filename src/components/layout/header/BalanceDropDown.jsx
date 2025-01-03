import React from "react";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import UserBalance from "./Actions/UserBalance";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const BalanceDropDown = ({ user }) => {
  return (
    <>
      <style jsx="true">{`
        .balance-dropdown ul li:hover img {
          filter: brightness(0) saturate(100%) invert(83%) sepia(25%) saturate(2166%) hue-rotate(349deg) brightness(104%) contrast(90%);
        }
      `}</style>
      <Menu as="div" className="balance-dropdown relative inline-block text-left">
        <MenuButton className="text-nowrap flex w-full justify-center gap-x-1.5 rounded-md text-white px-3 py-2 text-sm font-light border border-[#636363] hover:border-primary-yellow">
          {user?.balance ? user?.balance.toFixed(2) : "0.00"} د.ت
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </MenuButton>
        <MenuItems className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-primary-dark shadow-lg  focus:outline-none">
          <UserBalance user={user} />
        </MenuItems>
      </Menu>
    </>
  );
};
export default BalanceDropDown;