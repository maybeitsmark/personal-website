// Renders home screen with About/Contact content and Project Grid, managing scroll locking during transitions
// https://github.com/maybeitsmark 
// 2026

import { useLayoutEffect, useRef } from "react";
// components
import ContactForm from "@/components/ContactForm/ContactForm";
import About from "@/components/About/About";
import ProjectGrid from "@/components/ProjectGrid/ProjectsGrid";
// hooks
import { usePanelsAnimation } from "@/hooks/panels_animation.hook";
import { useAppLayout } from "@/hooks/app_layout.hook";
import { useMouseScroll } from "@/hooks/mouse_scroll.hook";
import { useIsMobile } from "@/hooks/is_mobile.hook";
// styles
import "./home.css";
import "./home_mobile.css";

const Home = () => {
  const { layout } = useAppLayout();
  const { isMobile } = useIsMobile();
  
  const panelsRef = useRef<any>(null);

  useMouseScroll({ layout, isMobile });
  usePanelsAnimation({ panelsRef, layout, isMobile });

  useLayoutEffect(() => {
    if (!isMobile) return;
    const target = panelsRef.current?.querySelector(layout === "projects" ? ".projects" : ".home");
    target?.scrollIntoView({ block: "start" });
  }, [layout, isMobile]);

  if (isMobile) {
    return (
      <section className="horizontal-section-mobile">
        <div ref={panelsRef} className="panels-mobile" >
          <section className="panel-mobile home">
            <div className="about-panel">
            <About />
            <ContactForm />
            </div>
          </section>
          <section className="panel-mobile projects">
            <ProjectGrid />
          </section>
        </div>
      </section>
    );
  };

  return (
    <section className={`horizontal-section layout-${layout}`}>
      <div ref={panelsRef} className="panels">
        <section className="panel home">
          <div className="about-panel">
            <About />
            <ContactForm />
          </div>
        </section>
        <section className="panel portrait">
          <p className="lyrics">ᴱⱽᴱᴿʸᵀᴴᴵᴺᴳ ᵀᴴᴬᵀ ᴴᴬᴾᴾᴱᴺˢ ᴵᴺ ᴸᴵᶠᴱ ᵂᴵᴸᴸ ᴺᴱⱽᴱᴿ ᴴᴬᴾᴾᴱᴺ ᴬᴳᴬᴵᴺ</p>
        </section>
        <section className="panel projects">
          <ProjectGrid />
        </section>
      </div>
    </section>
  );
};

export default Home;
