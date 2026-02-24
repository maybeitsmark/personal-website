import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { AnimatePresence } from 'framer-motion';
//import { projectRoutes } from './routes';
import Home from './pages/Home';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <AnimatePresence>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Home />} />

      
          </Routes>
        </Suspense>
        <Footer />
      </AnimatePresence>
    </Router>
  );
}

export default App;
/**
 * 
 *       {projectRoutes.map(({ path, element }) => (
              <Route key={path} path={`/projects/${path}`} element={element} />
            ))}
 */