import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

const AccountSettings = ({ logout, onClickActions, setActionModal }) => {
  const UserActions = [
    {
      title: "My Acount",
      image: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Faccount_My%20account.svg&w=640&q=75",
    },
    {
      title: "Casino Bets",
      image: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Faccount_Casino%20bets.svg&w=1920&q=75",
    },
    {
      title: "Sports Bets",
      image: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Faccount_Sports%20bet.svg&w=1920&q=75",
    },
    {
      title: "Transaction History",
      image: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Faccount_Payment%20History.svg&w=1920&q=75",
    },
    {
      title: "Verify Account",
      image: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Faccount_Verify%20Account.svg&w=160&q=75",
    },
  ];
  return (
    <>
      <div className="lg:h-auto h-[calc(100vh-250px)]">
        {UserActions.map((item, index) => (
          <a
            key={index} // Make sure to add a key for each element when rendering a list
            href="#"
            className="border-b border-b-gray-900 block px-4 py-2 text-sm text-white"
            onClick={() => onClickActions(item.title)} // Add click handler here
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
      <div className="px-2">
        <button
          className="flex items-center justify-center space-x-1 bg-yellow-500 text-white px-3 my-2 py-2 rounded-md hover:bg-yellow-600 transition cursor-pointer lg:static absolute bottom-4 w-full"
          onClick={logout}
        >
          <FaSignOutAlt className="mr-2 text-lg" />
          <span className="text-md">Logout</span>
        </button>
      </div>
    </>
  );
};

export default AccountSettings;
