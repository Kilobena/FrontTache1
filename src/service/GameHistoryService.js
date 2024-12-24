import axios from "axios";
import Cookies from "js-cookie"; // To manage cookies

const API_BASE_URL = "https://catch-me.bet/hr";

export const fetchGameHistory = async ({ date_start, date_end, page_number = 1, items_per_page = 10 }) => {
  const token = Cookies.get("token"); // Retrieve the token from cookies

  if (!token) {
    throw new Error("User is not authenticated. Token is missing.");
  }

  console.log("[DEBUG] FetchGameHistory: Request Payload", {
    date_start,
    date_end,
    page_number,
    items_per_page,
  });

  try {
    const response = await axios.post(
      `${API_BASE_URL}/getGameHistory`,
      {
        date_start,
        date_end,
        page_number,
        items_per_page,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token in headers
        },
      }
    );

    console.log("[DEBUG] FetchGameHistory: API Response", response.data);

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to fetch game history.");
    }
  } catch (error) {
    console.error("[ERROR] FetchGameHistory: API Call Error", error);
    throw error;
  }
};
