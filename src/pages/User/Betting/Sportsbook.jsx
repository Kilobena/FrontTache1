import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cmsSportbook, initCmsSportBook } from "./cmssportsbook";
import { SPORTSBOOK_CLIENT_KEY } from "../../../helpers/constants";

const Sportsbook = () => {
  const location = useLocation();

  const [isTablet, setIsTablet] = useState(window?.innerWidth <= 1024);
  const [isMobile, setIsMobile] = useState(window?.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1024);
      setIsMobile(window.innerWidth <= 480);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Check if the script loaded successfully
    let SPORTBOOK_DTO = {
      platform: isMobile ? "mobile" : isTablet ? "tablet" : "desktop",
      user: "guest",
      lang: "en-US",
      token: process.env.SPORTSBOOK_CLIENT_KEY,
      defaultPage: location.pathname.startsWith("/sports-betting")
        ? "sport"
        : "live",
    };
    (function () {
      // initCmsSportBook(SPORTBOOK_DTO);
      cmsSportbook.startSportbook(
        isMobile ? "mobile" : isTablet ? "tablet" : "desktop",
        "guest",
        "en-US",
        SPORTSBOOK_CLIENT_KEY,
        location.pathname.startsWith("/sports-betting") ? "sport" : "live"
      );
    })();
  }, []);

  return (
    <>
      <div id="appcontent">
        {/* Sportsbook content will be injected here */}
      </div>
    </>
  );
};

export default Sportsbook;
