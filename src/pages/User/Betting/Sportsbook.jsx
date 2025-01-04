import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { cmsSportbook } from "./cmssportsbook";
import { SPORTSBOOK_CLIENT_KEY } from "../../../helpers/constants";
import { useAuth } from "../../../providers/AuthContext";

// Utility function for debounce
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};


const Loader = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-[#2E2E2E]">
    <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);


const Sportsbook = () => {
  const location = useLocation();
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Get the current user from the Auth context

  const [error, setError] = useState(null);
  const isInitialized = useRef(false); // Ref to prevent duplicate initializations
  useEffect(() => {
    console.log("Current user in Sportsbook:", user); // Debug log
  }, [user]);


  // Fetch CMS Token
  const fetchCMSToken = async () => {
    console.log("Calling fetchCMSToken...");
    try {
      console.log("CMS Token Request: Sending POST request to https://catch-me.bet/get-cms-token");
      const response = await fetch("https://catch-me.bet/get-cms-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const rawText = await response.text();
      console.log("Raw CMS Token Response:", rawText);

      const data = JSON.parse(rawText);
      console.log("Parsed CMS Token Response:", data);

      if (data.success) {
        console.log("CMS Token fetched successfully:", data.token);
        return data.token;
      } else {
        throw new Error(`Failed to fetch CMS token: ${data.message}`);
      }
    } catch (error) {
      console.error("Error fetching CMS token:", error);
      return null;
    }
  };

  console.log("cms user",user.c_id);

  // Login User
  const userLogin = async (userId, currency, type) => {
    console.log("Calling userLogin...");
    try {
      console.log("User Login Request: Payload sent to backend:", { userId, currency, type });
      const response = await fetch("https://catch-me.bet/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, currency, type }),
      });

      const rawText = await response.text();
      console.log("Raw User Login Response:", rawText);

      const data = JSON.parse(rawText);
      console.log("Parsed User Login Response:", data);

      if (data.success) {
        console.log("User logged in successfully:", data.token);
        return data.token;
      } else {
        throw new Error(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during user login:", error);
      return null;
    }
  };

  // Handle Resize with Debouncing
  useEffect(() => {
    const handleResize = () => {
      const isTabletNow = window.innerWidth <= 1024;
      const isMobileNow = window.innerWidth <= 640;

      // Update state only if values have changed
      setIsTablet((prev) => (prev !== isTabletNow ? isTabletNow : prev));
      setIsMobile((prev) => (prev !== isMobileNow ? isMobileNow : prev));
    };

    const debounceResize = debounce(handleResize, 300);
    window.addEventListener("resize", debounceResize);

    return () => {
      window.removeEventListener("resize", debounceResize);
    };
  }, []);

  // Initialize Sportbook
  useEffect(() => {
    const initializeSportbook = async () => {
      if (isInitialized.current) {
        console.log("Sportbook already initialized. Skipping...");
        return;
      }

      setLoading(true);
      setError(null);

      const platform = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";
      console.log("Initializing Sportbook with platform:", platform);

      const defaultPage = location.pathname.startsWith("/sports-betting")
        ? "sport"
        : "live";

      try {
        // Fetch CMS Token
        const cmsToken = await fetchCMSToken();
        console.log("fetchCMSToken returned:", cmsToken);
        if (!cmsToken) throw new Error("CMS Token not available.");

        // Login User
        const userToken = await userLogin(user.c_id, "USD", "player");
        console.log("userLogin returned:", userToken);
        if (!userToken) throw new Error("User Token not available.");

        // Prepare SPORTBOOK DTO
        const SPORTBOOK_DTO = {
          platform,
          user: userToken,
          lang: "en-US",
          token: SPORTSBOOK_CLIENT_KEY || cmsToken,
          defaultPage,
        };
        console.log("SPORTBOOK DTO:", SPORTBOOK_DTO);

        // Start Sportbook
        cmsSportbook.startSportbook(
          SPORTBOOK_DTO.platform,
          SPORTBOOK_DTO.user,
          SPORTBOOK_DTO.lang,
          SPORTBOOK_DTO.token,
          SPORTBOOK_DTO.defaultPage
        );

        console.log("Sportbook initialized successfully.");
        isInitialized.current = true; // Mark as initialized
      } catch (error) {
        console.error("Error initializing Sportbook:", {
          errorMessage: error.message,
          stack: error.stack,
        });
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    initializeSportbook();
  }, [isMobile, isTablet, location]);


  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div id="appcontent">
        {/* Sportsbook content will be injected here */}
      </div>
    </>
  );
};

export default Sportsbook;
