import React, { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { TypeAnimation } from 'react-type-animation';
import myImage from '../../assets/images/myimage.jpeg';

const HeroScene = lazy(() => import('./HeroScene'));

const badges = [
  { name: 'React', class: 'top-[-20px] left-[-30px]' },
  { name: 'Docker', class: 'top-[15%] right-[-40px]' },
  { name: 'AWS', class: 'top-[50%] left-[-50px]' },
  { name: 'Kubernetes', class: 'bottom-[20%] right-[-45px]' },
  { name: 'CI/CD', class: 'bottom-[-15px] left-[20px]' },
  { name: 'MongoDB', class: 'top-[-10px] right-[20%]' },
  { name: 'Node.js', class: 'bottom-[-20px] right-[30%]' }
];

const Hero = () => {
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    setShowScene(!reducedMotion && !coarsePointer && window.innerWidth >= 768);
  }, []);

  return (
    <div className='relative min-h-screen flex items-center overflow-hidden px-4 md:px-8 pt-24'>
      {showScene && (
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      )}
      
      {/* Cinematic ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030014]/50 via-transparent to-[#030014] z-0 pointer-events-none" />

      <div className='w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10'>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className='order-last lg:order-first flex flex-col justify-center'
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className='text-6xl md:text-8xl font-black leading-tight mb-2 tracking-tighter text-white drop-shadow-2xl'
          >
            Hi, I'm <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-blue-400 to-neon-purple animate-pulse">Yash Jaiman</span>
          </motion.h1>

          <div className='h-16 mt-4 mb-6 text-gray-300 text-3xl md:text-4xl font-semibold tracking-wide'>
            <TypeAnimation
              sequence={[
                'MERN Stack Developer', 1500,
                'DevOps Learner', 1500,
                'Cloud Enthusiast', 1500,
                'Backend Developer', 1500,
              ]}
              speed={50}
              repeat={Infinity}
              wrapper="span"
              className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white drop-shadow-[0_0_10px_rgba(0,212,255,0.8)]"
            />
          </div>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
            className='text-gray-400 text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-light'
          >
            Full Stack Developer & DevOps Enthusiast building scalable web applications, cloud infrastructure, and modern production-ready systems.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
            className='flex flex-wrap gap-5'
          >
            <a href='#projects' className='hero-btn hero-btn-primary group relative overflow-hidden'>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10 flex items-center">
                View Projects
                <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block" aria-hidden="true">-&gt;</span>
              </span>
            </a>
            <a href='/resume.pdf' target='_blank' rel='noopener noreferrer' className='hero-btn hero-btn-secondary hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]'>Download Resume</a>
            <a href='#contact' className='hero-btn hero-btn-tertiary hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]'>Contact Me</a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className='relative mx-auto lg:mx-0 order-first lg:order-last w-full flex justify-center items-center'
        >
          <div className="relative w-72 h-72 md:w-[450px] md:h-[450px]">
            {/* Ambient rotating glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full blur-[100px] opacity-40 animate-pulse-ring" />
            
            <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} glareEnable glareMaxOpacity={0.5} glarePosition="all" scale={1.05} transitionSpeed={400} className='w-full h-full relative z-10'>
              <div className='w-full h-full rounded-2xl relative gradient-border p-1 group overflow-visible'>
                <div className="w-full h-full bg-[#050510] rounded-2xl relative overflow-hidden glass-premium shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  {/* Holographic overlay */}
                  <div className='absolute inset-0 bg-gradient-to-br from-neon-cyan/20 via-transparent to-neon-purple/20 z-20 pointer-events-none mix-blend-overlay group-hover:opacity-100 opacity-50 transition-opacity duration-500' />
                  
                  <img 
                    src={myImage} 
                    alt='Yash Jaiman' 
                    width='450'
                    height='450'
                    loading='eager'
                    decoding='async'
                    className='w-full h-full object-cover rounded-xl filter contrast-125 brightness-110 saturate-150 transition-all duration-700 group-hover:scale-110 group-hover:brightness-125' 
                  />
                  {/* Inner neon border */}
                  <div className="absolute inset-0 border border-white/20 rounded-xl z-20 pointer-events-none" />
                </div>
                
                {/* Tech Badges in 3D Space */}
                {badges.map((badge, index) => (
                  <motion.div
                    key={badge.name}
                    animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.3, ease: "easeInOut" }}
                    className={`tech-badge ${badge.class} hover:scale-125 hover:shadow-[0_0_30px_rgba(0,212,255,0.8)]`}
                  >
                    {badge.name}
                  </motion.div>
                ))}
              </div>
            </Tilt>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
