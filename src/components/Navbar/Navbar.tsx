import { Link, useLocation } from 'react-router';
import './Navbar.css';

const Navbar = ({ isMobile }: { isMobile: boolean }) => {
  const location = useLocation()
  const isProjects = location.pathname.includes('/projects')

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
}

export default Navbar;