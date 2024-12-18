import React, { useEffect, useState } from "react";
import { fetchGames, fetchGameUrl } from "../service/gameService";
import { toast } from "react-toastify";
import { useAuth } from "../providers/AuthContext";
import { useNavigate } from "react-router-dom";

export const SearchGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gameLoading, setGameLoading] = useState({});
  const [offset, setOffset] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [isGameFullscreenOpen, setIsGameFullscreenOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [providerFilter, setProviderFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [gameUrl, setGameUrl] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        const fetchedGames = await fetchGames(offset, 30, {
          type: "livecasino",
        });
        if (offset === 0) {
          setGames(fetchedGames);
        } else {
          setGames((prev) => [...prev, ...fetchedGames]);
        }
        setTotalGames(158); // Simulated total games count
      } catch (err) {
        setError(err.message || "Failed to load games.");
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, [offset]);

  const handleGameLaunch = async (gameId) => {
    setGameLoading((prev) => ({ ...prev, [gameId]: true }));
    try {
      if (!user) {
        toast.error("You must be signed in to launch a game.");
        return;
      }

      const username = user.username || "guest";
      const role = user.role || "guest";

      if (role !== "User") {
        toast.error("Only users  can launch a game.");
        return;
      }

      const url = await fetchGameUrl(gameId, username);

      if (url) {
        setGameUrl(url);
        setIsGameFullscreenOpen(true);
      } else {
        toast.error("Failed to launch the game. Please try again.");
      }
    } catch (err) {
      console.error("Error launching the game:", err);
      toast.error("An error occurred while launching the game.");
    } finally {
      setGameLoading((prev) => ({ ...prev, [gameId]: false }));
    }
  };

  const handleLoadMore = (e) => {
    e.preventDefault();
    setOffset((prev) => prev + 30);
  };

  // Filter and sort games
  const filteredGames = games
    .filter((game) => game.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((game) => providerFilter === "all" || game.provider === providerFilter)
    .sort((a, b) => {
      if (sortBy === "popular") return b.popularity - a.popularity;
      if (sortBy === "new") return new Date(b.releaseDate) - new Date(a.releaseDate);
      return 0; // No sorting for "featured"
    });
  let limit = 20;
  const displayedGames = limit ? filteredGames.slice(0, limit) : filteredGames;

  if (loading && offset === 0) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-[#2E2E2E]">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <>
      <div className="px-5 pb-5 h-[calc(100vh-200px)] overflow-y-auto">
        <div className="mt-4 bg-[#2e2e2e]">
          <div className="relative">
            <input
              type="text"
              placeholder="Type to Search (Game | Provider)"
              className="w-full text-left bg-white text-gray-800 pr-8 pl-3 py-2 rounded-[8px] bg-no-repeat appearance-none outline-none focus:outline-none border-transparent w-full text-gray font-semibold rounded-md px-3 py-2.5 mb-2.5 md:mb-4 mt-7 md:mt-4 text-sm md:text-xl placeholder:text-gray placeholder:font-semibold focus:ring-yellow-500"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#000" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
          <p>Search requires at least 3 characters</p>
        </div>
        <div className={`${"grid grid-cols-4 gap-4 pt-5"}`}>
          {displayedGames.map((game) => (
            <div
              key={game.gameId}
              className="relative bg-[#242424] overflow-hidden shadow-lg hover:shadow-2xl transform transition-all"
              style={{
                aspectRatio: "1",
              }}
            >
              <img src={game.image || "default-image-url.png"} alt={game.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleGameLaunch(game.gameId)}
                  className=" px-4 py-2 rounded-full text-gray-900 font-bold shadow-lg transition"
                >
                  <img alt="All Ways Candy" src="https://bet24.gg/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fplay.fee186f3.svg&amp;w=160&amp;q=75" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
