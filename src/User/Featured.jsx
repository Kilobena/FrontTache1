import React, { useState, useEffect } from "react";
import { fetchGames, fetchGameUrl } from "../service/gameService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { useAuth } from "../providers/AuthContext";
import Footer from "./Footer";
import BottomBar from "../pages/BottomBar";

const Featured = ({ limit = null, hideFooter = false }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gameLoading, setGameLoading] = useState({});
  const [offset, setOffset] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [providerFilter, setProviderFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameUrl, setGameUrl] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        const fetchedGames = await fetchGames(offset, 30, { category: "evolution" });
        if (offset === 0) {
          setGames(fetchedGames);
        } else {
          setGames((prev) => [...prev, ...fetchedGames]);
        }
        setTotalGames(77); // Simulated total games count
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
      const username = user?.username || "guest";

      if (!username) {
        toast.error("You must log in to launch a game.");
        return;
      }

      const url = await fetchGameUrl(gameId, username);

      if (url) {
        setGameUrl(url);
        setIsModalOpen(true);
      } else {
        toast.error("Failed to launch the game. Please try again.");
      }
    } catch (err) {
      console.error("Error launching the game:", err);
      toast.error(err.message || "Error launching the game.");
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

  const displayedGames = limit ? filteredGames.slice(0, limit) : filteredGames;

  if (loading && offset === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#2E2E2E]">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#2E2E2E] text-red-500">
        {error.includes("Failed to fetch games")
          ? "Unable to load games. Please try again later."
          : error}
      </div>
    );
  }

  if (!loading && games.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#2E2E2E] text-white">
        No games available at the moment.
      </div>
    );
  }

  return (
    <>
<section className="bg-[#242424] text-white min-h-screen mt-3 max-w-[80rem] p-4 mx-auto">
<div className="bg-[#3C3C3C] max-w-screen-xl p-4 mx-auto rounded-lg container mx-auto px-4 py-6">
          {/* Search Bar */}
          <div className="flex justify-center mb-6">
            <div className="relative w-full sm:w-4/4 lg:w-2/2 ">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white text-gray-800 px-10 py-2 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* Header with Filters */}
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {/* Return Button */}
              <button
                onClick={() => navigate(-1)}
                className="text-gray-400 bg-[#242424]-700 hover:bg-[#242424] hover:text-yellow-400 transition-all mb-2 px-3 py-2 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h2 className="text-xl font-bold mb-2">Featured Games</h2>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4 mt-2">
              {/* Provider Filter */}
              <select
                value={providerFilter}
                onChange={(e) => setProviderFilter(e.target.value)}
                className="bg-white text-black px-4 py-2 rounded border border-gray-400 shadow-sm focus:ring-2 focus:ring-yellow-500"
              >
                <option value="all">Providers: All</option>
                <option value="provider1">Provider 1</option>
                <option value="provider2">Provider 2</option>
              </select>

              {/* Sort By Filter */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white text-black px-4 py-2 rounded border border-gray-400 shadow-sm focus:ring-2 focus:ring-yellow-500"
              >
                <option value="popular">Sort By: Popular</option>
                <option value="new">Sort By: New</option>
                <option value="featured">Sort By: Featured</option>
              </select>
            </div>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4">
            {displayedGames.map((game) => (
              <div
                key={game.gameId}
                className="relative bg-[#242424]-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                {/* Game Image */}
                <img
                  src={game.imageUrl || "default-image-url.png"}
                  alt={game.name}
                  className="w-full h-36 object-cover rounded-t-lg"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleGameLaunch(game.gameId)}
                    className="bg-yellow-400 px-4 py-2 rounded-full text-gray-900 font-bold hover:bg-yellow-500 shadow-lg transition"
                  >
                    Play Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {!limit && games.length < totalGames && (
            <div className="text-center mt-8">
              <button
                onClick={handleLoadMore}
                className="bg-yellow-400 px-6 py-3 rounded-lg text-gray-900 font-bold hover:bg-yellow-500 shadow-lg transition-transform transform hover:scale-105"
              >
                Load More
              </button>
              <p className="text-gray-300 mt-2">
                Showing {games.length} of {totalGames}
              </p>
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            {!gameUrl ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <iframe
                src={gameUrl}
                title="Game"
                className="w-full h-[500px] rounded-lg"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            )}
          </Modal>
        )}
      </section>

      {!hideFooter && <Footer />}
      <div className="block md:hidden">
        <BottomBar />
      </div>
    </>
  );
};

export default Featured;
