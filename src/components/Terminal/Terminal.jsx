import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { containerVariants, itemVariants } from '../../utils/motion';

const commands = [
  { cmd: 'whoami', output: 'Yash Jaiman' },
  { cmd: 'skills', output: 'MERN | DevOps | Cloud | Docker' },
  { cmd: 'currently_learning', output: 'Kubernetes | Terraform | CI/CD' },
  { cmd: 'goals', output: 'Backend Engineer | DevOps Engineer' }
];

const Terminal = () => {
  const [ref, isVisible] = useScrollAnimation();
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [currentText, setCurrentText] = useState('');
  
  const terminalRef = useRef(null);

  useEffect(() => {
    if (!isVisible || currentIndex >= commands.length) return;

    let timeout;
    const command = commands[currentIndex];
    
    setIsTyping(true);
    let charIndex = 0;
    
    const typeChar = () => {
      if (charIndex < command.cmd.length) {
        setCurrentText(command.cmd.substring(0, charIndex + 1));
        charIndex++;
        timeout = setTimeout(typeChar, 100);
      } else {
        setIsTyping(false);
        timeout = setTimeout(() => {
          setHistory(prev => [...prev, { cmd: command.cmd, output: command.output }]);
          setCurrentText('');
          setCurrentIndex(prev => prev + 1);
        }, 500);
      }
    };

    timeout = setTimeout(typeChar, 1000);

    return () => clearTimeout(timeout);
  }, [isVisible, currentIndex]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, currentText]);

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
      className='w-full max-w-4xl mx-auto px-4 md:px-8'
    >
      <motion.div variants={itemVariants} className='text-center mb-16'>
        <h2 className='section-header'>Developer <span className='text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600'>Terminal</span></h2>
        <p className='section-subtitle'>Interactive command-line interface.</p>
      </motion.div>

      <motion.div variants={itemVariants} className='rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#050510] font-mono'>
        {/* Terminal Header */}
        <div className='flex items-center px-4 py-3 bg-white/5 border-b border-white/10'>
          <div className='flex space-x-2'>
            <div className='w-3 h-3 rounded-full bg-red-500'></div>
            <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
            <div className='w-3 h-3 rounded-full bg-green-500'></div>
          </div>
          <div className='mx-auto text-xs text-gray-400 font-semibold tracking-widest'>yash@ubuntu:~</div>
        </div>

        {/* Terminal Body */}
        <div 
          ref={terminalRef}
          className='p-6 h-[350px] overflow-y-auto text-sm md:text-base'
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#00d4ff transparent' }}
        >
          {history.map((item, idx) => (
            <div key={idx} className='mb-4'>
              <div className='flex items-center text-green-400 mb-1'>
                <span className='mr-2 font-bold' aria-hidden='true'>$</span>
                <span className='text-blue-400 mr-2'>~</span>
                <span className='text-white'>{item.cmd}</span>
              </div>
              <div className='text-gray-300 pl-4'>{item.output}</div>
            </div>
          ))}

          {currentIndex < commands.length && (
            <div className='flex items-center text-green-400 mb-1'>
              <span className='mr-2 font-bold' aria-hidden='true'>$</span>
              <span className='text-blue-400 mr-2'>~</span>
              <span className='text-white'>{currentText}</span>
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ duration: 0.8, repeat: Infinity }}
                className='ml-1 w-2.5 h-5 bg-white inline-block align-middle'
              />
            </div>
          )}

          {currentIndex >= commands.length && (
            <div className='flex items-center text-green-400 mb-1 mt-4'>
              <span className='mr-2 font-bold' aria-hidden='true'>$</span>
              <span className='text-blue-400 mr-2'>~</span>
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ duration: 0.8, repeat: Infinity }}
                className='ml-1 w-2.5 h-5 bg-white inline-block align-middle'
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Terminal;
