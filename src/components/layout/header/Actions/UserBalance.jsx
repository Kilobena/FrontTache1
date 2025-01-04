import React from "react";
import { MenuItem, MenuItems } from "@headlessui/react";

const UserBalance = ({ user }) => {
  const totalBalance = (user?.balance || 0) + (user?.sportsbookBonus || 165) + (user?.casinoBonus || 435);

  const userBalanceData = [
    {
      title: "Cash",
      image: "https://www.bet24.gg/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcash.9e24785d.svg&w=160&q=75",
      cash: user?.balance || 0,
    },
    {
      title: "Sportsbook Bonus",
      image: "https://www.bet24.gg/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbonus.6a39706b.svg&w=160&q=75",
      cash: user?.sportsbookBonus || 165,
    },
    {
      title: "Casino Bonus",
      image: "https://www.bet24.gg/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbonus.6a39706b.svg&w=160&q=75",
      cash: user?.casinoBonus || 435,
    },
    {
      title: "Total",
      image: "https://www.bet24.gg/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftotal.14d0c515.svg&w=160&q=75",
      cash: totalBalance,
    },
  ];

  return (
    <>
      {userBalanceData.map((item, index) => {
        return (
          <a key={index} href="#" className="border-b border-gray-900 block px-4 py-2 text-sm  text-white ">
            <div className="flex items-center gap-2 justify-between">
              <ul>
                <li className="flex items-center gap-2 hover:text-primary-yellow">
                  <span className="w-7">
                    <img className="w-6 h-6" src={item.image} alt={item.title} />
                  </span>
                  {item.title}
                </li>
              </ul>
              <span>{item?.cash?.toFixed(2)} د.ت</span>
            </div>
          </a>
        );
      })}
    </>
  );
};

export default UserBalance;