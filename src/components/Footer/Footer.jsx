import React from 'react';
import { FaEnvelope, FaGithub, FaHeart, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full mt-24 border-t border-white/10 relative overflow-hidden'>
      <div className='absolute top-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50' />
      <div className='absolute top-0 left-1/2 h-[100px] w-[30%] -translate-x-1/2 bg-neon-cyan/15 blur-[80px] pointer-events-none' />

      <div className='max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10'>
        <div className='flex flex-col items-center md:items-start'>
          <p className='text-xl font-black text-white tracking-tighter mb-2'>
            Yash<span className='text-neon-cyan'>.</span>
          </p>
          <p className='text-sm text-gray-500 font-light'>
            © {currentYear} Yash Jaiman. All rights reserved.
          </p>
        </div>

        <div className='flex items-center gap-1.5 text-sm text-gray-400 font-medium'>
          Designed with <FaHeart className='text-neon-purple mx-1 animate-pulse' aria-hidden='true' /> by Yash
        </div>

        <div className='flex items-center gap-6 text-gray-400'>
          <a href='https://github.com/YashJaiman' target='_blank' rel='noopener noreferrer' aria-label='Open GitHub profile' className='hover:text-white hover:scale-125 transition-all duration-300'>
            <FaGithub size={22} />
          </a>
          <a href='https://www.linkedin.com/in/yash-jaiman-962646272/' target='_blank' rel='noopener noreferrer' aria-label='Open LinkedIn profile' className='hover:text-neon-cyan hover:scale-125 transition-all duration-300'>
            <FaLinkedin size={22} />
          </a>
          <a href='https://mail.google.com/mail/?view=cm&fs=1&to=yashjaiman029@gmail.com' target='_blank' rel='noopener noreferrer' aria-label='Send email' className='hover:text-neon-purple hover:scale-125 transition-all duration-300'>
            <FaEnvelope size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
