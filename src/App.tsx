// Sets up router for Home, Projects list/detail views with shared canvas overlays and navigation components
// https://github.com/maybeitsmark 
// 2026

import { BrowserRouter as Router, Routes, Route } from "react-router";
// pages
import Home from "@/pages/Home/Home";
import ProjectRoute from "@/pages/Projects/ProjectRoute";
// components 
import Navbar from "@/components/Navbar/Navbar";
import CompositionCanvas from "@/components/Portrait/CompositionCanvas";
import BackgroundCanvas from "@/components/Background/BackgroundCanvas";
import NavigationArrow from "@/components/NavigationArrow/NavigationArrow";
import Footer from "@/components/Footer/Footer";
// hooks
import { useAppLayout } from "@/hooks/app_layout.hook";
import { useIsMobile } from "@/hooks/is_mobile.hook";
import { useScrollLock } from "@/hooks/scroll_lock.hook";

const AppContent = () => {
  const { layout } = useAppLayout();
  const { isMobile } = useIsMobile();

  // Keep the document policy route-driven so direct project URLs can scroll.
  useScrollLock(layout, isMobile);

  return (
    <>
      <Navbar />
      <BackgroundCanvas />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectRoute />} />
      </Routes>
      <CompositionCanvas />
      <NavigationArrow />
      {(isMobile || layout !== "home") && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
