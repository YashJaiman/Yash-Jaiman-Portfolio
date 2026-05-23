import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { containerVariants, itemVariants } from '../../utils/motion';

const Contact = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
      className='w-full max-w-5xl mx-auto px-4 md:px-8 text-center relative'
    >
      <div className="absolute top-1/2 left-1/2 h-[110%] w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-cyan/5 blur-[90px] pointer-events-none -z-10" />

      <motion.div variants={itemVariants} className='mb-16'>
        <h2 className='section-header'>Let's <span className='text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple'>Connect</span></h2>
        <p className='section-subtitle'>Open for opportunities and collaborations.</p>
      </motion.div>

      <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable glareMaxOpacity={0.15} scale={1.02} transitionSpeed={1000}>
        <motion.div variants={itemVariants} className='glass-premium rounded-[3rem] p-8 md:p-20 border border-white/10 relative group overflow-hidden shadow-2xl'>
          {/* Animated floating gradients inside card */}
          <div className='absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000' />
          <div className='absolute -inset-2 bg-gradient-to-r from-neon-cyan via-purple-500 to-pink-500 rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-40 transition duration-1000 -z-10' />
          
          <h3 className='text-4xl md:text-6xl font-black mb-8 text-white tracking-tighter'>Have an idea?</h3>
          
          <p className='text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed'>
            Whether you're looking to build a new SaaS product, need a DevOps workflow, or just want to say hi, my inbox is always open.
          </p>

          <a
            href='https://mail.google.com/mail/?view=cm&fs=1&to=yashjaiman029@gmail.com'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Email Yash Jaiman'
            className='inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-2xl text-[#030014] font-black text-xl hover:shadow-[0_0_40px_rgba(0,212,255,0.8)] hover:scale-[1.05] transition-all duration-300 relative overflow-hidden group/btn'
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out" />
            <FaEnvelope size={28} className="relative z-10" /> 
            <span className="relative z-10 tracking-wide">Say Hello</span>
          </a>

          <div className='mt-20 flex flex-col md:flex-row items-center justify-center gap-10 pt-10 border-t border-white/10 relative z-10'>
            <a href='https://github.com/YashJaiman' target='_blank' rel='noopener noreferrer' aria-label='Open Yash Jaiman GitHub profile' className='flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-lg font-bold group/link'>
              <FaGithub size={28} className="group-hover/link:scale-125 transition-transform duration-300" /> GitHub
            </a>
            <a href='https://www.linkedin.com/in/yash-jaiman-962646272/' target='_blank' rel='noopener noreferrer' aria-label='Open Yash Jaiman LinkedIn profile' className='flex items-center gap-3 text-gray-400 hover:text-neon-cyan transition-colors text-lg font-bold group/link'>
              <FaLinkedin size={28} className="group-hover/link:scale-125 transition-transform duration-300" /> LinkedIn
            </a>
            <div className='flex items-center gap-3 text-gray-300 text-lg font-bold'>
              <FaMapMarkerAlt size={28} className='text-neon-purple drop-shadow-[0_0_10px_rgba(124,58,237,0.5)]' /> Jaipur, India
            </div>
          </div>
        </motion.div>
      </Tilt>
    </motion.div>
  );
};

export default Contact;
