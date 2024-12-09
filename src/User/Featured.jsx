import React, { useState, useEffect } from "react";
import { fetchGames, fetchGameUrl } from "../service/gameService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../providers/AuthContext";
import Footer from "./Footer";
import BottomBar from "../pages/BottomBar";
import GameFullscreen from "./GameFullscreen";

const Featured = ({
  limit = null,
  hideFooter = false,
  hideExtras = false,
  horizontalOnMobile = false,
}) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gameLoading, setGameLoading] = useState({});
  const [offset, setOffset] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [providerFilter, setProviderFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [isGameFullscreenOpen, setIsGameFullscreenOpen] = useState(false);
  const [gameUrl, setGameUrl] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        const fetchedGames = await fetchGames(offset, 30, {
          category: "evolution",
        });
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
    .filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (game) => providerFilter === "all" || game.provider === providerFilter
    )
    .sort((a, b) => {
      if (sortBy === "popular") return b.popularity - a.popularity;
      if (sortBy === "new")
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      return 0;
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
      <div className="bg-[#2E2E2E] max-w-screen-xl container mx-auto m-3 p-4 rounded">
        {!hideExtras && (
          <div className="flex justify-center mb-6">
            <div className="relative w-full sm:w-4/4 lg:w-2/2">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white text-gray-800 px-12 py-3 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
            </div>
          </div>
        )}

        {!hideExtras && (
          <div className="flex flex-wrap items-center justify-between mb-6 gap-y-4 sm:gap-y-0">
            <div className="flex items-center justify-center w-full sm:w-auto space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center text-gray-400 bg-[#242424] hover:bg-[#333] hover:text-white transition-all px-3 py-2 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div className="block w-full text-left">
                <h2 className="text-lg font-bold text-white">Featured Games</h2>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative w-full sm:w-auto">
                <select
                  value={providerFilter}
                  onChange={(e) => setProviderFilter(e.target.value)}
                  className="bg-white text-black w-full px-4 py-2 rounded border border-gray-400 shadow-sm focus:ring-2 focus:ring-yellow-500 appearance-none"
                >
                  <option value="all">Providers: All</option>
                  <option value="provider1">Provider 1</option>
                  <option value="provider2">Provider 2</option>
                </select>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white text-black w-full sm:w-auto px-4 py-2 rounded border border-gray-400 shadow-sm focus:ring-2 focus:ring-yellow-500 appearance-none"
              >
                <option value="popular">Sort By: Popular</option>
                <option value="new">Sort By: New</option>
                <option value="featured">Sort By: Featured</option>
              </select>
            </div>
          </div>
        )}

        <div
          className={`${
            horizontalOnMobile
              ? "md:grid md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 gap-4 hidden"
              : "grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4"
          }`}
        >
          {displayedGames.map((game) => (
            <div
              key={game.gameId}
              className="relative bg-[#242424] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all"
              style={{
                aspectRatio: "1",
              }}
            >
              <img
                src={game.imageUrl || "default-image-url.png"}
                alt={game.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleGameLaunch(game.gameId)}
                  className=" px-4 py-2 rounded-full text-gray-900 font-bold  shadow-lg transition"
                >
                  <img
                    alt="All Ways Candy"
                    src="https://bet24.gg/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fplay.fee186f3.svg&amp;w=160&amp;q=75"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {horizontalOnMobile && (
          <div className="md:hidden">
            <div className="grid grid-rows-2 gap-y-8 overflow-x-auto pb-1">
              <div className="flex gap-4 px-4">
                {displayedGames
                  .slice(0, Math.ceil(displayedGames.length / 2))
                  .map((game) => (
                    <div
                      key={game.gameId}
                      className="relative bg-[#242424] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all flex-shrink-0"
                      style={{
                        width: "100px", // Adjusted width for smaller images
                        aspectRatio: "1",
                      }}
                    >
                      <img
                        src={game.imageUrl || "default-image-url.png"}
                        alt={game.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleGameLaunch(game.gameId)}
                          className=" px-4 py-2 rounded-full text-gray-900 font-bold  shadow-lg transition"
                        >
                          <img
                            alt="All Ways Candy"
                            src="https://bet24.gg/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fplay.fee186f3.svg&amp;w=160&amp;q=75"
                          />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="flex gap-4 px-4">
                {displayedGames
                  .slice(Math.ceil(displayedGames.length / 2))
                  .map((game) => (
                    <div
                      key={game.gameId}
                      className="relative bg-[#242424] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all flex-shrink-0"
                      style={{
                        width: "100px", // Adjusted width for smaller images
                        aspectRatio: "1",
                      }}
                    >
                      <img
                        src={game.imageUrl || "default-image-url.png"}
                        alt={game.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleGameLaunch(game.gameId)}
                          className=" px-4 py-2 rounded-full text-gray-900 font-bold  shadow-lg transition"
                        >
                          <img
                            alt="All Ways Candy"
                            src="https://bet24.gg/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fplay.fee186f3.svg&amp;w=160&amp;q=75"
                          />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

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

      {isGameFullscreenOpen && (
        <GameFullscreen onClose={() => setIsGameFullscreenOpen(false)}>
          {!gameUrl ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <iframe
              src={gameUrl}
              title="Game"
              className="w-full h-[600px] rounded-lg"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          )}
        </GameFullscreen>
      )}

      {!hideFooter && <Footer />}
      <div className="block md:hidden fixed bottom-0 w-full z-10 bg-[#242424]">
        <BottomBar />
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default Featured;
