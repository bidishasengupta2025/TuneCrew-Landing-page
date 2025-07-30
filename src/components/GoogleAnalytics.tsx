"use client";

import { useEffect } from "react";
import { initGA, logPageView } from "../utils/analytics";

const GoogleAnalytics = () => {
  useEffect(() => {
    initGA();

    logPageView();

    const handleRouteChange = (url: string) => {
      logPageView();
    };

    window.addEventListener("hashchange", () =>
      handleRouteChange(window.location.hash)
    );

    return () => {
      window.removeEventListener("hashchange", () =>
        handleRouteChange(window.location.hash)
      );
    };
  }, []);

  return null;
};

export default GoogleAnalytics;
