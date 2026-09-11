import { useState, useEffect } from "react";

// Keep in sync with responsive CSS; short landscape windows also need stacking.
export const MOBILE_QUERY = "(max-width: 1023px), (max-height: 699px)";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);
  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(query.matches);
    query.addEventListener("change", update);
    update();
    return () => query.removeEventListener("change", update);
  }, []);
  return { isMobile };
};
