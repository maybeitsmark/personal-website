// Personal website and portfolio  //
// 2026                            //
// Built by Mark Lisanti           //
// https://github.com/maybeitsmark //

import { Link, useLocation } from 'react-router';
import './Navbar.css';

const Navbar = ({ isMobile, activeSection }: { isMobile: boolean, activeSection: boolean }) => {
  const location = useLocation();
  const isProjects = activeSection === true;
  console.log(isProjects);
  return (
    <nav className={`navbar ${isMobile ? 'mobile' : ''}`}>
      <Link to="/" className={`nav-link ${!isProjects ? 'active' : ''}`}>
        About
      </Link>

      <Link to="/projects" state={{ prevUrl: location.pathname }} className={`nav-link ${isProjects ? 'active' : ''}`}>
        Projects
      </Link>

      <a className="nav-link" href="https://medium.com/@maybeitsmark" target="_blank" rel="noopener noreferrer">
        Blog
      </a>
    </nav>
  )
};

export default Navbar;