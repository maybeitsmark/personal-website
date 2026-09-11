// Handles scroll to top and navigation between Home, Projects list, and Project detail pages. 
// https://github.com/maybeitsmark 
// 2026

import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigationLock } from "@/hooks/navigation_lock.hook";
import { useIsMobile } from "@/hooks/is_mobile.hook";
import { transitionLock } from "@/utils/transition_lock.util";

// css
import "./navigation_arrow.css";
import arrow from "@/assets/icons/arrow.svg";

const NavigationArrow = () => {
  const [isScrolledY, setIsScrolledY] = useState(false);

  const navigate = useNavigationLock();
  const location = useLocation();
  const { isMobile } = useIsMobile();

  const isHome = location.pathname === "/" || location.pathname === "/home";
  const isProjects = location.pathname === "/projects";
  const isProjectDetail = location.pathname.startsWith("/projects/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledY(window.scrollY > 1 && document.documentElement.scrollHeight > window.innerHeight);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleClick = () => {
    if (transitionLock.current) return;
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (isHome) {
      navigate("/projects", { lockScroll: !isMobile });
      return;
    }
    if (isMobile) return;

    if (isProjects) {
      navigate("/", { lockScroll: !isMobile });
      return;
    }

    if (isProjectDetail) {
      navigate("/projects");
    }
  };

  const direction = isMobile || isScrolledY ? "up": isHome ? "right" : "left";
  const visible = !isMobile || isScrolledY;

  return (
    <button type="button" className={`arrow-container${visible ? "" : " is-hidden"}`} disabled={!visible} aria-hidden={!visible} aria-label={direction === "up" ? "Scroll to top" : isHome ? "Go to projects" : "Go back"} onClick={handleClick}>
      <img src={arrow} alt="" className={`page-arrow ${direction}`} />
    </button>
  );
};

export default NavigationArrow;
