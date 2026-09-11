// Renders the navbar component for the application
// https://github.com/maybeitsmark
// 2026

import { useState, useEffect, type MouseEvent } from "react";
import { Link } from "react-router";
// hooks
import { useAppLayout } from "@/hooks/app_layout.hook";
import { useIsMobile } from "@/hooks/is_mobile.hook";
import { useNavigationLock } from "@/hooks/navigation_lock.hook";
// css
import "./Navbar.css";

const Navbar = () => {
  const { layout } = useAppLayout();
  const { isMobile } = useIsMobile();
  const navigate = useNavigationLock();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 0);

  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const isHome = layout === "home";
  const isProjects = layout === "projects" || layout === "project-detail";

  // Close menu when switching back to desktop
  useEffect(() => {
    if (!isMobile) {
      setMenuOpen(false);
    }
  }, [isMobile]);

  const closeMenu = () => setMenuOpen(false);

  const handleRouteClick = (event: MouseEvent<HTMLAnchorElement>, path: "/" | "/projects") => {
    event.preventDefault();

    const isHorizontalTransition = !isMobile && (
      (layout === "home" && path === "/projects") ||
      (layout === "projects" && path === "/")
    );

    navigate(path, { lockScroll: isHorizontalTransition });
    closeMenu();
  };

  if (isMobile) {
    return (
      <nav className={`navbar mobile${isScrolled ? " scrolled" : ""}`}>
        <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          <span />
        </button>
        {menuOpen && (
          <div className="mobile-menu">
            <Link to="/" className={`nav-link ${isHome ? "active" : ""}`} onClick={(event) => handleRouteClick(event, "/")}>About</Link>
            <Link to="/projects" className={`nav-link ${isProjects ? "active" : ""}`} onClick={(event) => handleRouteClick(event, "/projects")}>Projects</Link>
            <a href={`${import.meta.env.BASE_URL}blog`} className="nav-link" onClick={closeMenu}>Blog</a>
          </div>
        )}
      </nav>
    );
  }

  return (
    <nav className={`navbar${isScrolled ? " scrolled" : ""}`}>
      <Link to="/" className={`nav-link ${isHome ? "active" : ""}`} onClick={(event) => handleRouteClick(event, "/")}>About</Link>
      <Link to="/projects" className={`nav-link ${isProjects ? "active" : ""}`} onClick={(event) => handleRouteClick(event, "/projects")}>Projects</Link>
      <a href={`${import.meta.env.BASE_URL}blog`} className="nav-link">Blog</a>
    </nav>
  );
};

export default Navbar;
