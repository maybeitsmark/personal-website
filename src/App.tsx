import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { projectRoutes } from './routes';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import './App.css';

function App() {
  return (
    <Router>
      <AnimatePresence>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Home />} />
            {projectRoutes.map(({ path, element }) => (
              <Route key={path} path={`/projects/${path}`} element={element} />
            ))}
          </Routes>
        </Suspense>
        <Footer />
      </AnimatePresence>
    </Router>
  );
}

export default App;
