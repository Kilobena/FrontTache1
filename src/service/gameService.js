      import axios from "axios";

      const API_BASE_URL = "https://catch-me.bet/api";

      const extractDirectGameUrl = (wrappedUrl) => {
        try {
          const urlObj = new URL(wrappedUrl);
          const innerUrl = urlObj.searchParams.get("url");
          if (!innerUrl) {
            console.warn("No 'url' parameter found in wrapped URL. Using original URL.");
          }
          return innerUrl ? decodeURIComponent(innerUrl) : wrappedUrl;
        } catch (error) {
          console.error("Error extracting direct game URL:", error);
          return wrappedUrl;
        }
      };

      export const fetchGamesProvider = async (page = 1, limit = 30) => {
        try {
          const response = await axios.post(
            `${API_BASE_URL}/getlist`,
            { page, limit },
            { headers: { "Content-Type": "application/json" } }
          );
          return response.data?.data || [];
        } catch (error) {
          console.error("Error fetching games:", error.response || error);
          throw new Error("Failed to fetch games.");
        }
      };

      export const fetchGameUrl = async (gameId, username) => {
        if (!username) {
          throw new Error("Username is required to launch the game.");
        }

        try {
          const payload = {
            gameid: Number(gameId),
            lang: "en",
            play_for_fun: false,
            homeurl: "https://catch-me.bet",
            username,
          };

          console.log("Payload for get-game:", payload);

          const response = await axios.post(`${API_BASE_URL}/get-game`, payload, {
            headers: { "Content-Type": "application/json" },
          });

          if (response.data?.data?.gameUrl) {
            const wrappedUrl = response.data.data.gameUrl;
            const directUrl = extractDirectGameUrl(wrappedUrl);
            return directUrl;
          } else {
            throw new Error("Game URL missing in response!");
          }
        } catch (error) {
          throw new Error(error.response?.data?.message || "Failed to fetch game URL.");
        }
      };


      export const fetchGames = async (offset = 0, limit = 30, filters = {}) => {
        try {
          console.log("[DEBUG] Fetching games with params:", { offset, limit, ...filters });
          const response = await axios.get(`${API_BASE_URL}/gamesLocal`, {
            params: { offset, limit, ...filters },
            headers: { "Content-Type": "application/json" },
          });
          console.log("[DEBUG] API response:", response.data); // Debug API response
          return response.data?.data || [];
        } catch (error) {
          console.error("Error fetching games from database:", error.response || error);
          throw new Error("Failed to fetch games from the database.");
        }
      };
