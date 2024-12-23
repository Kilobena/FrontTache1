import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../providers/AuthContext";
import { fetchGames, fetchGameUrl } from "../../../service/gameService";
import GamesCategoryFilters from "./GamesCategoryFilters";
import GameFullscreen from "./GameFullscreen";

const GamesCategoryCard = ({ data, showAllCategories, limit = null, horizontalOnMobile = false }) => {
  const { user } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
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

  useEffect(() => {
    const loadGames = async (append = false) => {
      setLoading(true);
      try {
        const response = await fetchGames(offset, limit || 32, data?.type ? { type: data.type } : { category: data.category });
        setGames((prevGames) => (append ? [...prevGames, ...response.data] : response.data)); // Append only when `append` is true
        setTotalGames(response.pagination?.total);
      } catch (error) {
        console.error("Failed to load games:", error);
      } finally {
        setLoading(false);
      }
    };

    if (offset === 0) {
      loadGames(); // Load initially
    } else {
      loadGames(true); // Append for load more
    }
  }, [offset, limit, data]);

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
    setOffset((prev) => prev + (limit || 32)); // Increment offset based on the limit
  };

  // Filter and sort games
  const filteredGames = games
    ?.filter((game) => providerFilter === "all" || game.provider === providerFilter)
    ?.sort((a, b) => {
      if (sortBy === "popular") return b.popularity - a.popularity;
      if (sortBy === "new") return new Date(b.releaseDate) - new Date(a.releaseDate);
      return 0;
    });

  const displayedGames = limit ? filteredGames.slice(0, limit) : filteredGames;

  if (!showAllCategories && loading && offset === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-400px)] bg-[#2E2E2E] mb-4">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (showAllCategories && loading && offset === 0) {
    <div className="flex items-center justify-center py-4 bg-[#2E2E2E] text-white mb-4"> </div>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-400px)] bg-[#2E2E2E] text-red-500">
        {error.includes("Failed to fetch games") ? "Unable to load games. Please try again later." : error}
      </div>
    );
  }
  if (!loading && games.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-400px)] bg-[#2E2E2E] text-white mb-4">No games available at the moment.</div>
    );
  }
  return (
    <>
      <div className="bg-[#2E2E2E] md:rounded-lg lg:p-4 p-3 md:mb-4 mb-0">
        {!loading && (
          <div className="flex flex-wrap items-center justify-between lg:mb-4 mb-3 md:gap-y-4 gap-y-2">
            <div className="flex items-center sm:w-auto space-x-3 md:space-x-4">
              {showAllCategories ? (
                <img src={data.icon} alt={data.label} className="lg:w-8 w-6" />
              ) : (
                <button
                  onClick={() => navigate("/casino")}
                  className="flex items-center justify-center text-gray-400 bg-[#242424] hover:bg-[#333] hover:text-white transition-all  rounded-lg min-w-8 min-h-8"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 9.16668H6.52499L11.1833 4.50834L9.99999 3.33334L3.33333 10L9.99999 16.6667L11.175 15.4917L6.52499 10.8333H16.6667V9.16668Z"></path>
                  </svg>
                </button>
              )}{" "}
              <h2 className="lg:text-2xl leading-none text-lg font-semibold text-white">{data.label}</h2>
            </div>
            {showAllCategories ? (
              <button
                onClick={() => navigate(data.path)}
                className="bg-[#1C1C1C] duration-300 min-w-[112px] cursor-pointer rtl:space-x-reverse font-semibold p-1.5 px-3 sm:p-2.5 sm:px-4 text-white py-2 rounded-lg text-sm shadow hover:bg-[#494949] transition"
              >
                View All
              </button>
            ) : (
              <GamesCategoryFilters
                setSelectedProviderFilter={setProviderFilter}
                selectedProviderFilter={providerFilter}
                selectedSortByFilter={sortBy}
                setSelectedSortByFilter={setSortBy}
              />
            )}
          </div>
        )}
        <>
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
                className="relative bg-[#242424] rounded overflow-hidden shadow-lg hover:shadow-2xl"
                style={{
                  aspectRatio: "1",
                }}
              >
                <img src={game.image} alt={game.name} className="w-full h-auto" />
                <div className="absolute inset-0 bg-black bg-opacity-60 hidden lg:flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleGameLaunch(game.gameId)}
                    className=" px-4 py-2 rounded-full text-gray-900 font-bold  shadow-lg transition"
                  >
                    <img alt="play game" src="https://bet24.gg/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fplay.fee186f3.svg&amp;w=160&amp;q=75" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {horizontalOnMobile && (
            <div className="md:hidden">
              <div
                className="grid auto-cols-[124px] grid-rows-2 gap-2 px-4 overflow-x-auto overflow-y-hidden pb-2 hide-scrollbar scroll-smooth"
                style={{
                  display: "grid",
                  gridAutoFlow: "column",
                  WebkitOverflowScrolling: "touch", // For smooth iOS scrolling
                }}
              >
                <style jsx="true">{`
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
                {displayedGames.map((game) => (
                  <div
                    key={game.gameId}
                    className="relative bg-[#242424] rounded overflow-hidden shadow-lg will-change-transform"
                    style={{
                      aspectRatio: "1",
                      scrollSnapAlign: "start",
                    }}
                    onClick={() => handleGameLaunch(game.gameId)}
                  >
                    <img
                      src={game.image || "default-image-url.png"}
                      alt={game.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-60 hidden lg:flex items-center justify-center opacity-0 active:opacity-100 transition-opacity duration-200">
                      <button className="w-10 h-10 flex items-center justify-center active:scale-95 transition-transform">
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
                className="bg-primary-yellow px-6 py-3 rounded-lg text-gray-900 font-bold hover:bg-yellow-500 shadow-lg transition-transform transform hover:scale-105"
              >
                Load More
              </button>
              <p className="text-gray-300 mt-2">
                Showing {games.length} of {totalGames}
              </p>
            </div>
          )}
        </>
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

export default GamesCategoryCard;
