import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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

  const cmsSportbook = {
    userToken: "guest",
    culture: "en-en",
    platform: "desktop",
    baseUrl: "https://test1.cmswager.com/",
    iframeUrl: "",
    defaultPage: "sport",
    integration: "",
    setUserToken: function (token) {
      this.userToken = token;
    },
    setCulture: function (culture) {
      this.culture = culture;
    },
    setPlatform: function (platform) {
      this.platform = platform;
    },
    setDefaultPage: function (defaultPage) {
      this.defaultPage = defaultPage;
    },
    setIntegration: function (integration) {
      this.integration = integration;
    },
    composeUrl: function () {
      var url = `${this.baseUrl}?language=${this.culture}&token=${this.userToken}&integration=${this.integration}&platform=${this.platform}&defaultpage=${this.defaultPage}`;
      this.iframeUrl = url;
    },
    checkIframe: function () {
      var elementExists = !!document.getElementById("ifrContent");
      return elementExists;
    },
    createIframe: function () {
      var iframe = document.createElement("iframe");
      iframe.setAttribute("src", this.iframeUrl);
      iframe.setAttribute("id", "ifrContent");
      iframe.setAttribute("width", "100%");
      iframe.setAttribute("height", "100%");
      iframe.setAttribute("frameborder", "0");

      iframe.style.width = "100vw";
      iframe.style.height = "100vh";
      iframe.style.overflow = "hidden";
      iframe.style.overflowX = "hidden";
      iframe.style.overflowY = "hidden";
      iframe.style.display = "block";
      iframe.style.border = "none";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      var element = document.getElementById("appcontent");

      element.appendChild(iframe);
    },
    startSportbook: function (platform, token, culture, integration, defaultPage) {
      this.setIntegration(integration);
      this.setCulture(culture);
      this.setUserToken(token);
      this.setPlatform(platform);
      console.log(defaultPage);
      if (defaultPage != "" && defaultPage != undefined) this.setDefaultPage(defaultPage);
      this.composeUrl();
      var element = document.getElementById("ifrContent");
      if (!!element) {
        var element = document.getElementById("ifrContent");
        element.setAttribute("src", this.iframeUrl);
      } else {
        this.createIframe();
      }
    },
  };

  useEffect(() => {
    // Check if the script is already loaded to prevent duplication
    // if (!document.querySelector('script[src="https://testsportsbook.cmswager.com/js/sportsbook.js"]')) {
    //   const script = document.createElement("script");
    //   script.src = "https://testsportsbook.cmswager.com/js/sportsbook.js";
    //   script.async = true;
    //   document.body.appendChild(script);

    //   script.onload = () => {
    //     // Check if the script loaded successfully
    //     if (window.cmsSportbook) {
    //       window.cmsSportbook.startSportbook(
    //         isMobile ? "mobile" : isTablet ? "tablet" : "desktop",
    //         "guest",
    //         "en-US",
    //         SPORTSBOOK_CLIENT_KEY,
    //         location.pathname.startsWith("/sports-betting") ? "sport" : "live"
    //       );
    //     } else {
    //       console.error("cmsSportbook is not available");
    //     }
    //   };
    // }

    // return () => {
    //   // Cleanup: remove script tag when component is unmounted
    //   const existingScript = document.querySelector('script[src="https://testsportsbook.cmswager.com/js/sportsbook.js"]');
    //   if (existingScript) {
    //     document.body.removeChild(existingScript);
    //   }
    // };
    (function () {
      cmsSportbook.startSportbook(
        isMobile ? "mobile" : isTablet ? "tablet" : "desktop",
        "guest",
        "en-US",
        process.env.SPORTSBOOK_CLIENT_KEY,
        location.pathname.startsWith("/sports-betting") ? "sport" : "live"
      );
    })();
  }, []);

  return (
    <>
      <div id="appcontent">{/* Sportsbook content will be injected here */}</div>
    </>
  );
};

export default Sportsbook;
