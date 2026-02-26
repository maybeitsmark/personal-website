// Personal website and portfolio  //
// 2026                            //
// Built by Mark Lisanti           //
// https://github.com/maybeitsmark //

import { useHomeNavigation } from './useHomeNavigation';
import "./Home.css";

const Home = () => {
  const { wrapperRef, contentRef } = useHomeNavigation();

  return (
    <div ref={wrapperRef}>
      <div ref={contentRef}>
        <div className="horizontal-container">
          <section className="panel home">...</section>
          <section className="panel portrait">...</section>
          <section className="panel projects">
            <div className="projects-vertical">
            ...
            </div>
            </section>
        </div>
      </div>
    </div>
  );
};

export default Home;