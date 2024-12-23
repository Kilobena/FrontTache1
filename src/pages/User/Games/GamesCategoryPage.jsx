import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GAMES_CATEGORY_NAV } from "../../../routes/routes_data";
import GamesCategoryCard from "./GameCategoryCard";

const GamesCategoryPage = () => {
  const location = useLocation();

  const isLobbyPage = location.pathname === "/casino";
  const currentCategory = GAMES_CATEGORY_NAV.find((item) => location.pathname.startsWith(item.path));

  return (
    <section className="text-white overflow-hidden relative">
      <div className="max-w-[80rem] mx-auto">
        {isLobbyPage ? (
          GAMES_CATEGORY_NAV.filter((category) => category.path !== "/casino").map((category) => (
            <GamesCategoryCard key={category.path} data={category} limit={16} showAllCategories horizontalOnMobile />
          ))
        ) : currentCategory ? (
          <GamesCategoryCard data={currentCategory} showAllCategories={false} />
        ) : (
          <p className="text-center text-gray-400">Category not found.</p>
        )}
      </div>
    </section>
  );
};

export default GamesCategoryPage;
