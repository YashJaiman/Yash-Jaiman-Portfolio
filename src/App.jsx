import React, { Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import './index.css';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Loader from './components/Loader/Loader';
import Cursor from './components/Cursor/Cursor';
import NoiseOverlay from './components/NoiseOverlay/NoiseOverlay';

function App() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <NoiseOverlay />
      <Cursor />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <MainLayout>
          <Home />
        </MainLayout>
      </motion.div>
    </Suspense>
  );
}

export default App;
