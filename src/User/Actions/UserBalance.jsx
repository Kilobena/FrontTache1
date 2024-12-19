import React from "react";
import { MenuItem, MenuItems } from "@headlessui/react";

const UserBalance = ({ logout, onClickActions }) => {
  const userBalanceData = [
    {
      title: "Cash",
      image:
        "https://www.bet24.gg/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcash.9e24785d.svg&w=160&q=75",
      cash: 290,
    },
    {
      title: "Sportsbook Bonus",
      image:
        "https://www.bet24.gg/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbonus.6a39706b.svg&w=160&q=75",
      cash: 0,
    },
    {
      title: "Casino Bonus",
      image:
        "https://www.bet24.gg/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbonus.6a39706b.svg&w=160&q=75",
      cash: 0,
    },
    {
      title: "Total",
      image:
        "https://www.bet24.gg/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftotal.14d0c515.svg&w=160&q=75",
      cash: 290,
    },
  ];
  return (
    <>
      {userBalanceData.map((item, index) => (
        <a
          key={index}
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
      ))}
    </>
  );
};

export default UserBalance;
