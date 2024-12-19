import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import UserBalance from "./Actions/UserBalance";

const BalanceDropDown = ({ user }) => {
  return (
    <>
      <style jsx>{`
        ul li:hover img {
          filter: brightness(0) saturate(100%) invert(83%) sepia(25%) saturate(2166%) hue-rotate(349deg) brightness(104%) contrast(90%);
        }
      `}</style>
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className="text-nowrap flex w-full justify-center gap-x-1.5 rounded-md text-white px-3 py-2 text-sm font-light border border-gray-300 hover:border-primary-yellow">
          {user?.balance.toFixed(2)} د.ت
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </MenuButton>
        <MenuItems className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-primary-dark shadow-lg  focus:outline-none">
          <UserBalance />
        </MenuItems>
      </Menu>
    </>
  );
};
export default BalanceDropDown;
