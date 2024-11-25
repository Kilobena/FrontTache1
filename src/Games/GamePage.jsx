import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../providers/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GamePage = () => {
  const { user } = useAuth();
  const [games, setGames] = useState([]); // Filtered games
  const [gameUrl, setGameUrl] = useState(""); // Game URL for iframe
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [launchLoading, setLaunchLoading] = useState(false); // Loading state for Play button
  const [loading, setLoading] = useState(true); // Loading state for game list
  const [error, setError] = useState(null); // Error messages

  // Fetch the game list and limit to 10 games
  useEffect(() => {
    const fetchGameList = async () => {
      try {
        setLoading(true); // Start loading spinner
        const response = await axios.post(
          "https://catch-me.bet/api/getlist",
          {},
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("API Response:", response.data);
        const allGames = response.data?.data || [];

        // Group games by category
        const gamesByCategory = allGames.reduce((acc, game) => {
          if (!acc[game.category]) {
            acc[game.category] = [];
          }
          acc[game.category].push(game);
          return acc;
        }, {});

        // Extract one game per category, up to 10 categories
        const selectedGames = Object.values(gamesByCategory)
          .flatMap((categoryGames) => categoryGames.slice(0, 1)) // Take the first game of each category
          .slice(0, 10); // Limit to 10 games

        setGames(selectedGames);
        if (selectedGames.length === 0) {
          setError("No games available at the moment.");
        }
      } catch (err) {
        console.error("Error fetching game list:", err.response || err);
        setError("Failed to fetch game list. Please try again later.");
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchGameList();
  }, []);

  // Fetch the game URL for the selected game
  const fetchGameUrl = async (gameId) => {
    if (!gameId) {
      toast.error("Invalid game ID. Please try again.");
      return;
    }
  
    if (!user?.username) {
      toast.error("You must be logged in to play this game.");
      return;
    }
  
    try {
      setLaunchLoading(true); // Start button loading state
      console.log("Launching game with ID:", gameId);
  
      // Ensure gameid is sent as a number
      const payload = {
        gameid: Number(gameId), // Convert gameId to a number
        lang: "en",
        play_for_fun: false, // Adjust based on backend expectation
        homeurl: "https://catch-me.bet",
        username: user.username, // Ensure this matches your backend's expectations
      };
  
      console.log("Payload being sent:", payload);
  
      const response = await axios.post(
        "https://catch-me.bet/api/get-game",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Game URL Response:", response.data);
      const gameUrlResponse = response.data?.data?.gameUrl;
  
      if (gameUrlResponse) {
        setGameUrl(gameUrlResponse);
        setIsModalOpen(true);
      } else {
        toast.error("Failed to fetch game URL.");
      }
    } catch (err) {
      console.error("Error fetching game URL:", err.response?.data || err);
      const errorMessage = err.response?.data?.message || "Failed to fetch game URL.";
      toast.error(errorMessage); // Display detailed error
    } finally {
      setLaunchLoading(false); // End button loading state
    }
  };
  

  // Render loading spinner
 // Render loading spinner
if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <style jsx>{`
        .loader {
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
        }
        .loader div {
          box-sizing: border-box;
          display: block;
          position: absolute;
          width: 64px;
          height: 64px;
          margin: 8px;
          border: 8px solid #3498db;
          border-radius: 50%;
          animation: loader-spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          border-color: #3498db transparent transparent transparent;
        }
        .loader div:nth-child(1) {
          animation-delay: -0.45s;
        }
        .loader div:nth-child(2) {
          animation-delay: -0.3s;
        }
        .loader div:nth-child(3) {
          animation-delay: -0.15s;
        }
        @keyframes loader-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}


  // Render error message
  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Top 10 Games by Category</h1>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <div key={game.id} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={game.image_background}
              alt={game.name}
              className="rounded-md mb-4 w-full h-40 object-cover"
            />
            <h2 className="text-xl font-bold text-gray-800">{game.name}</h2>
            <p className="text-gray-600">
              <span className="font-semibold">Category:</span> {game.category}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Release Date:</span> {game.release_date}
            </p>
            <button
              onClick={() => fetchGameUrl(game.id)}
              className={`bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mt-2 ${
                launchLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={launchLoading}
            >
              {launchLoading ? "Loading..." : "Play Game"}
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
            >
              ✕
            </button>
            <iframe
              src={gameUrl}
              title="Game"
              className="w-full h-[600px] rounded-lg"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default GamePage;
