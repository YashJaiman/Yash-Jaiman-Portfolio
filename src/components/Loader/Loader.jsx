import React from 'react';
import { motion } from 'framer-motion';

/**
 * Loading Component
 * Animated loader shown while content is loading
 */
const Loader = () => {
  return (
    <div className='flex justify-center items-center w-full h-screen bg-dark-900'>
      <div className='relative w-24 h-24'>
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className='absolute inset-0 rounded-full border-2 border-transparent border-t-neon-cyan border-r-neon-cyan'
        />

        {/* Middle rotating ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className='absolute inset-2 rounded-full border-2 border-transparent border-b-neon-purple border-l-neon-purple'
        />

        {/* Inner pulsing circle */}
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
          className='absolute inset-4 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple opacity-50'
        />

        {/* Center dot */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='w-3 h-3 rounded-full bg-neon-cyan glow-cyan'></div>
        </div>
      </div>

      {/* Loading text */}
      <div className='absolute bottom-32 text-center'>
        <motion.h3
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className='text-xl font-mono text-neon-cyan'
        >
          Loading<span className='animate-pulse'>...</span>
        </motion.h3>
      </div>
    </div>
  );
};

export default Loader;
