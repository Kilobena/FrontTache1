import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import UserBalance from "./Actions/UserBalance";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import io from "socket.io-client";
import { useAuth } from "../../../providers/AuthContext";

const BalanceDropDown = ({ user }) => {
  const [balance, setBalance] = useState(user?.balance || 0);
  const socket = React.useRef(null);
  const { updateUser, getBalance } = useAuth();

  useEffect(() => {
    // Initialize Socket.IO connection
    socket.current = io("https://catch-me.bet");

    // Listen for balance updates
    socket.current.on("balanceUpdated", async (data) => {
      console.log("Balance updated event received:", data);
      if (data.userId === user._id) {
        // Fetch the updated balance from the server
        const updatedBalance = await getBalance(user.username);
        if (updatedBalance.success) {
          setBalance(updatedBalance.balance); // Update local state
          updateUser({ balance: updatedBalance.balance }); // Update context
        }
      }
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [user._id, user.username, updateUser, getBalance]);

  return (
    <Menu as="div" className="balance-dropdown relative inline-block text-left">
      <MenuButton className="text-nowrap flex w-full justify-center gap-x-1.5 rounded-md text-white px-3 py-2 text-sm font-light border border-[#636363] hover:border-primary-yellow">
        {balance.toFixed(2)} د.ت
        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
      </MenuButton>
      <MenuItems className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-primary-dark shadow-lg focus:outline-none">
        <UserBalance user={user} />
      </MenuItems>
    </Menu>
  );
};

export default BalanceDropDown;
