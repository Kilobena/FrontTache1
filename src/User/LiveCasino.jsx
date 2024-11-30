import React, { useState, useEffect } from "react";
import { fetchGames, fetchGameUrl } from "../service/gameService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { useAuth } from "../providers/AuthContext";
import Footer from "./Footer";

const LiveCasino = ({ limit = null, hideFooter = false }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gameLoading, setGameLoading] = useState({});
  const [offset, setOffset] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameUrl, setGameUrl] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        const fetchedGames = await fetchGames(offset, 30, { type: "livecasino" });
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

  const displayedGames = limit ? games.slice(0, limit) : games;

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
        No  games available at the moment.
      </div>
    );
  }

  return (
    <>
      <section className="bg-[#2E2E2E] pb-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-extrabold text-yellow-400 uppercase tracking-wide">
              
            </h2>
            {limit && (
              <button
                className="text-yellow-400 font-semibold hover:underline"
                onClick={() => navigate("/livecasino")}
              >
                View More
              </button>
            )}
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {displayedGames.map((game) => (
              <div
                key={game.gameId}
                className="relative bg-[#383838] rounded-xl overflow-hidden shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
                onClick={() => handleGameLaunch(game.gameId)}
              >
                <img
                  src={game.imageUrl || "default-image-url.png"}
                  alt={game.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <p className="text-yellow-400  truncate">
                    {game.name}
                  </p>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                  <button
                    disabled={gameLoading[game.gameId]}
                    className="bg-yellow-500 w-14 h-14 rounded-full flex items-center justify-center text-gray-900 font-bold hover:bg-yellow-400"
                  >
                    {gameLoading[game.gameId] ? "..." : "▶"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {!limit && games.length < totalGames && (
            <div className="text-center mt-10">
              <button
                onClick={handleLoadMore}
                className="bg-yellow-400 px-10 py-4 rounded-lg text-gray-900 font-bold hover:bg-yellow-500 shadow-lg transition"
              >
                Load More
              </button>
              <p className="text-white mt-4">
                Showing {games.length} of {totalGames}
              </p>
              <div className="relative mt-4 h-2 w-full bg-gray-700 rounded-full">
                <div
                  className="absolute top-0 left-0 h-2 bg-yellow-500 rounded-full animate-progress"
                  style={{ width: `${(games.length / totalGames) * 100}%` }}
                ></div>
              </div>
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

      {/* Conditionally Render Footer */}
      {!hideFooter && <Footer />}
    </>
  );
};

export default LiveCasino;
