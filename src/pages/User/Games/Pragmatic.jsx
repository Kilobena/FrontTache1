import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../providers/AuthContext";
import GameFullscreen from "./GameFullscreen";
import FiltersGames from "./Filters/FiltersGames";
import { fetchGames, fetchGameUrl } from "../../../service/gameService";

const Pragmatic = ({ limit = null, hideFooter = false, hideExtras = false, horizontalOnMobile = false }) => {
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
  const [gameUrl, setGameUrl] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        const fetchedGames = await fetchGames(offset, 30, {
          category: "pragmatic play",
        });
        if (offset === 0) {
          setGames(fetchedGames);
        } else {
          setGames((prev) => [...prev, ...fetchedGames]);
        }
        setTotalGames(783); // Simulated total games count
      } catch (err) {
        setError(err.message || "Failed to load games.");
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, [offset]);
  //

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
        {error.includes("Failed to fetch games") ? "Unable to load games. Please try again later." : error}
      </div>
    );
  }

  if (!loading && games.length === 0) {
    return <div className="flex items-center justify-center min-h-screen bg-[#2E2E2E] text-white">No games available at the moment.</div>;
  }

  return (
    <>
      <div className="bg-[#2E2E2E] max-w-screen-xl container mx-auto p-4 lg:rounded-md">
        {!hideExtras && (
          <div className="flex flex-wrap items-center justify-between mb-6 gap-y-4 sm:gap-y-0">
            <div className="flex items-center justify-center w-full sm:w-auto space-x-4">
              <button
                onClick={() => navigate("/casino")}
                className="flex items-center justify-center text-gray-400 bg-[#242424] hover:bg-[#333] hover:text-white transition-all  rounded-lg min-w-8 min-h-8"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6667 9.16668H6.52499L11.1833 4.50834L9.99999 3.33334L3.33333 10L9.99999 16.6667L11.175 15.4917L6.52499 10.8333H16.6667V9.16668Z"></path>
                </svg>
              </button>
              <div className="block w-full text-left">
                <h2 className="lg:text-2xl text-lg font-semibold text-white">Pragmatic</h2>
              </div>
            </div>

            <FiltersGames
              setSelectedProviderFilter={setProviderFilter}
              selectedProviderFilter={providerFilter}
              selectedSortByFilter={sortBy}
              setSelectedSortByFilter={setSortBy}
            />
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
              <img src={game.image || "default-image-url.png"} alt={game.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleGameLaunch(game.gameId)}
                  className=" px-4 py-2 rounded-full text-gray-900 font-bold  shadow-lg transition"
                >
                  <img alt="All Ways Candy" src="https://bet24.gg/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fplay.fee186f3.svg&amp;w=160&amp;q=75" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {horizontalOnMobile && (
          <div className="md:hidden">
            <div
              className="grid auto-cols-[105px] grid-rows-2 gap-4 px-4 overflow-x-auto overflow-y-hidden pb-2 hide-scrollbar scroll-smooth"
              style={{
                display: "grid",
                gridAutoFlow: "column",
                WebkitOverflowScrolling: "touch", // For smooth iOS scrolling
              }}
            >
              <style jsx>{`
                .hide-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                  scroll-snap-type: x mandatory;
                  scroll-behavior: smooth;
                }
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {displayedGames.map((game, index) => (
                <div
                  key={game.gameId}
                  className="relative bg-[#242424] rounded-lg overflow-hidden shadow-lg will-change-transform"
                  style={{
                    aspectRatio: "1",
                    scrollSnapAlign: "start",
                  }}
                >
                  <img
                    src={game.image || "default-image-url.png"}
                    alt={game.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 active:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => handleGameLaunch(game.gameId)}
                      className="w-10 h-10 flex items-center justify-center active:scale-95 transition-transform"
                    >
                      <img
                        alt="Play"
                        src="https://bet24.gg/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fplay.fee186f3.svg&amp;w=160&amp;q=75"
                        className="w-full h-full"
                      />
                    </button>
                  </div>
                </div>
              ))}
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
            <iframe src={gameUrl} title="Game" className="w-full h-[600px] rounded-lg" frameBorder="0" allowFullScreen></iframe>
          )}
        </GameFullscreen>
      )}
    </>
  );
};

export default Pragmatic;
