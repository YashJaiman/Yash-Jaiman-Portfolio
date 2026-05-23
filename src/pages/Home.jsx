import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

import Hero from '../components/Hero/Hero';

const About = lazy(() => import('../components/About/About'));
const Experience = lazy(() => import('../components/Experience/Experience'));
const Terminal = lazy(() => import('../components/Terminal/Terminal'));
const Skills = lazy(() => import('../components/Skills/Skills'));
const LeetCodeStats = lazy(() => import('../components/LeetCodeStats/LeetCodeStats'));
const Projects = lazy(() => import('../components/Projects/Projects'));
const Certifications = lazy(() => import('../components/Certifications/Certifications'));
const Contact = lazy(() => import('../components/Contact/Contact'));

const SectionFallback = () => (
  <div className='w-full max-w-7xl mx-auto px-4 md:px-8'>
    <div className='min-h-[260px] rounded-3xl border border-white/10 bg-white/[0.035] animate-pulse' />
  </div>
);

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section id='hero' className='w-full min-h-screen'>
        <Hero />
      </section>

      <section id='about' className='w-full min-h-screen py-24'>
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
      </section>

      <section id='experience' className='w-full py-24'>
        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>
      </section>

      <section id='terminal' className='w-full py-24'>
        <Suspense fallback={<SectionFallback />}>
          <Terminal />
        </Suspense>
      </section>

      <section id='skills' className='w-full py-24'>
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
      </section>

      <section id='leetcode' className='w-full min-h-[600px] py-24'>
        <Suspense fallback={<SectionFallback />}>
          <LeetCodeStats />
        </Suspense>
      </section>

      <section id='projects' className='w-full py-24'>
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
      </section>

      <section id='certifications' className='w-full py-24'>
        <Suspense fallback={<SectionFallback />}>
          <Certifications />
        </Suspense>
      </section>

      <section id='contact' className='w-full py-24'>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </section>
    </motion.div>
  );
};

export default Home;
