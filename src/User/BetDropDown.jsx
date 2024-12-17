import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const BetDropDown = ({ agentDropDownData, balance }) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton
                    className="inline-flex w-full justify-center gap-x-1.5 hover:text-yellow-500 rounded-md text-white px-3 py-2 text-sm font-semibold text-gray-900 border border-gray-300 hover:border-yellow-500"
                >
                    {balance}
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>
            </div>
            <MenuItems
                className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-black shadow-lg  focus:outline-none"
            >
                <div className="py-1 ">
                    {agentDropDownData.map((item, index) => (
                        <MenuItem key={index}>

                            <a
                                href="#"
                                className="border-b border-gray-900 block px-4 py-2 text-sm 
                     text-gray-900 text-gray-700 text-white "

                            >
                                {/* Display image and title */}
                                <div className="flex items-center gap-2 justify-between">
                                    <ul className="flex gap-3 hover:text-yellow-500 group">
                                        <li>{item.image}</li>
                                        <li>{item.title}</li>
                                    </ul>
                                    <span>{item.cash}</span>


                                </div>
                            </a>

                        </MenuItem>
                    ))}
                </div>
            </MenuItems>


        </Menu>




    )
}
export default BetDropDown;