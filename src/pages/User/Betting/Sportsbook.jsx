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
    const platform = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";
    if (location) {
      const defaultPage = location.pathname.startsWith("/sports-betting")
        ? "sport"
        : "live";

      const SPORTBOOK_DTO = {
        platform,
        user: "guest",
        lang: "en-US",
        token: SPORTSBOOK_CLIENT_KEY || "",
        defaultPage,
      };

      cmsSportbook.startSportbook(
        SPORTBOOK_DTO.platform,
        SPORTBOOK_DTO.user,
        SPORTBOOK_DTO.lang,
        SPORTBOOK_DTO.token,
        SPORTBOOK_DTO.defaultPage
      );
    }
  }, [location]);

  return (
    <>
      <div id="appcontent">
        {/* Sportsbook content will be injected here */}
      </div>
    </>
  );
};

export default Sportsbook;
