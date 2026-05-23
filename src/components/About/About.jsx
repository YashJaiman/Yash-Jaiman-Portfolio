import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { containerVariants, itemVariants } from '../../utils/motion';
import myImage from '../../assets/images/myimage.jpeg';

const About = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
      className='w-full max-w-7xl mx-auto px-4 md:px-8 relative'
    >
      <div className="absolute top-1/2 left-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-cyan/5 blur-[110px] pointer-events-none -z-10" />

      <div className='grid lg:grid-cols-2 gap-16 items-center'>
        <motion.div variants={itemVariants} className='relative group'>
          <div className='absolute -inset-2 bg-gradient-to-r from-neon-cyan via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-1000' />
          <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} glareEnable glareMaxOpacity={0.2} scale={1.02} transitionSpeed={1000}>
            <div className='relative glass-premium p-3 rounded-3xl overflow-hidden'>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-10" />
              <img src={myImage} alt='Yash Jaiman profile portrait' width='448' height='448' loading='lazy' decoding='async' className='w-full max-w-md mx-auto rounded-2xl object-cover filter contrast-125 saturate-150 relative z-0' />
              
              <div className='absolute -bottom-6 -right-6 glass-premium p-6 rounded-2xl border border-white/20 shadow-[0_10px_40px_rgba(0,212,255,0.3)] animate-float z-20 backdrop-blur-xl'>
                <p className='text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white'>
                  <motion.span initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 2 }}>
                    3+
                  </motion.span>
                </p>
                <p className='text-sm text-gray-300 font-bold uppercase tracking-widest mt-1'>Major Projects</p>
              </div>
            </div>
          </Tilt>
        </motion.div>

        <motion.div variants={itemVariants} className='relative z-10'>
          <h2 className='section-header mb-10'>About <span className='text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple'>Me</span></h2>
          
          <div className='space-y-6 text-gray-300 text-lg md:text-xl leading-relaxed font-light'>
            <p className='pl-6 border-l-4 border-neon-cyan/50 bg-gradient-to-r from-neon-cyan/5 to-transparent py-2'>
              I am a Computer Science Engineering student passionate about building scalable full-stack applications, backend systems, cloud infrastructure, and DevOps workflows using modern technologies.
            </p>
          </div>

          <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto lg:mx-0'>
            <div className='glass-premium px-8 py-6 rounded-2xl border border-white/10 text-center hover:-translate-y-2 transition-transform duration-300 group'>
              <p className='text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-blue-400 font-black text-4xl mb-2 group-hover:scale-110 transition-transform'>
                <motion.span initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 2 }}>
                  2+
                </motion.span>
              </p>
              <p className='text-sm text-gray-400 uppercase tracking-widest font-bold'>Years Coding</p>
            </div>
            <div className='glass-premium px-8 py-6 rounded-2xl border border-white/10 text-center hover:-translate-y-2 transition-transform duration-300 group'>
              <p className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-black text-4xl mb-2 group-hover:scale-110 transition-transform'>
                <motion.span initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 2 }}>
                  8
                </motion.span>
              </p>
              <p className='text-sm text-gray-400 uppercase tracking-widest font-bold'>Certifications</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
