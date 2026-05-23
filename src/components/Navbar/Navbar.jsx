import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaBars, FaTimes, FaEnvelope } from 'react-icons/fa';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3 glass-premium border-b border-white/5 shadow-2xl' : 'py-5 bg-transparent'}`}
    >
      <div className='max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center'>
        <a href='#hero' aria-label='Go to home section' className='text-3xl font-black tracking-tighter gradient-text hover:glow-cyan transition-all duration-300'>
          Yash<span className='text-neon-cyan'>.</span>
        </a>

        {/* Desktop Nav */}
        <div className='hidden lg:flex items-center space-x-8'>
          <div className='flex space-x-6 bg-white/5 px-6 py-2.5 rounded-full border border-white/10 shadow-lg backdrop-blur-md'>
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className='text-sm font-medium text-gray-300 hover:text-neon-cyan transition-colors'>
                {item.name}
              </a>
            ))}
          </div>

          <div className='flex items-center space-x-4 border-l border-white/10 pl-6'>
            <a href='https://github.com/YashJaiman' target='_blank' rel='noopener noreferrer' aria-label='Open GitHub profile' className='text-gray-400 hover:text-white transition-colors hover:scale-110 duration-300'><FaGithub size={20} /></a>
            <a href='https://www.linkedin.com/in/yash-jaiman-962646272/' target='_blank' rel='noopener noreferrer' aria-label='Open LinkedIn profile' className='text-gray-400 hover:text-neon-cyan transition-colors hover:scale-110 duration-300'><FaLinkedin size={20} /></a>
            <a href='https://mail.google.com/mail/?view=cm&fs=1&to=yashjaiman029@gmail.com' target='_blank' rel='noopener noreferrer' aria-label='Send email' className='text-gray-400 hover:text-neon-cyan transition-colors hover:scale-110 duration-300'><FaEnvelope size={20} /></a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className='lg:hidden text-gray-300' type='button' aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='lg:hidden glass-premium border-b border-white/10'
          >
            <div className='flex flex-col items-center py-6 space-y-4'>
              {navItems.map((item) => (
                <a key={item.name} href={item.href} onClick={() => setIsOpen(false)} className='text-gray-300 hover:text-neon-cyan font-semibold text-lg'>
                  {item.name}
                </a>
              ))}
              <div className='flex space-x-6 pt-6 mt-2 border-t border-white/10 w-2/3 justify-center'>
                <a href='https://github.com/YashJaiman' target='_blank' rel='noopener noreferrer' aria-label='Open GitHub profile' className='text-gray-400 hover:text-white'><FaGithub size={24} /></a>
                <a href='https://www.linkedin.com/in/yash-jaiman-962646272/' target='_blank' rel='noopener noreferrer' aria-label='Open LinkedIn profile' className='text-gray-400 hover:text-neon-cyan'><FaLinkedin size={24} /></a>
                <a href='https://mail.google.com/mail/?view=cm&fs=1&to=yashjaiman029@gmail.com' target='_blank' rel='noopener noreferrer' aria-label='Send email' className='text-gray-400 hover:text-neon-cyan'><FaEnvelope size={24} /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
