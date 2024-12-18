import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const BalanceDropDown = ({ userBalanceData, balance }) => {
  return (
    <>
      <style jsx>{`
        ul li:hover img {
          filter: brightness(0) saturate(100%) invert(83%) sepia(25%) saturate(2166%) hue-rotate(349deg) brightness(104%) contrast(90%);
        }
      `}</style>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-white px-3 py-2 text-sm font-light border border-gray-300 hover:border-primary-yellow">
            {balance.toFixed(2)} د.ت
            <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
          </MenuButton>
        </div>
        <MenuItems className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-black shadow-lg  focus:outline-none">
          <div className="py-1 ">
            {userBalanceData.map((item, index) => (
              <MenuItem key={index}>
                <a
                  href="#"
                  className="border-b border-gray-900 block px-4 py-2 text-sm 
                     text-gray-900 text-gray-700 text-white "
                >
                  {/* Display image and title */}
                  <div className="flex items-center gap-2 justify-between">
                    <ul>
                      <li className="flex items-center gap-2 hover:text-primary-yellow">
                        <img src={item.image} alt="item icon" className="w-6" />
                        {item.title}
                      </li>
                    </ul>
                    <span>{item.cash.toFixed(2)} د.ت</span>
                  </div>
                </a>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </>
  );
};
export default BalanceDropDown;
