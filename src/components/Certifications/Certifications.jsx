import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import {
  FaAws,
  FaAward,
  FaCode,
  FaExternalLinkAlt,
  FaGoogle,
  FaGraduationCap,
  FaPython,
  FaRedhat,
} from 'react-icons/fa';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { containerVariants, itemVariants } from '../../utils/motion';

const certs = [
  {
    title: 'RHCSA',
    provider: 'Red Hat',
    file: 'rhcsa-certificate.pdf',
    glow: 'from-red-500 to-rose-600',
    Icon: FaRedhat,
  },
  {
    title: 'AWS Cloud Practitioner',
    provider: 'Amazon Web Services',
    file: 'aws-certificate.pdf',
    glow: 'from-orange-400 to-amber-500',
    Icon: FaAws,
  },
  {
    title: 'Google Cloud Associate Engineer',
    provider: 'Google Cloud',
    file: 'google-cloud-certificate.pdf',
    glow: 'from-blue-500 to-cyan-400',
    Icon: FaGoogle,
  },
  {
    title: 'DSA Certificate',
    provider: 'Data Structures and Algorithms',
    file: 'dsa-certificate.pdf',
    glow: 'from-neon-purple to-pink-500',
    Icon: FaCode,
  },
  {
    title: 'NPTEL Programming in C',
    provider: 'IIT / NPTEL',
    file: 'nptel-c-certificate.pdf',
    glow: 'from-cyan-400 to-blue-500',
    Icon: FaGraduationCap,
  },
  {
    title: 'NPTEL Entrepreneurship',
    provider: 'IIT / NPTEL',
    file: 'nptel-entrepreneurship-certificate.pdf',
    glow: 'from-emerald-400 to-cyan-500',
    Icon: FaAward,
  },
  {
    title: 'NPTEL Object-Oriented Programming',
    provider: 'IIT / NPTEL',
    file: 'nptel-oop-certificate.pdf',
    glow: 'from-violet-400 to-fuchsia-500',
    Icon: FaCode,
  },
  {
    title: 'NPTEL Python',
    provider: 'IIT / NPTEL',
    file: 'nptel-python-certificate.pdf',
    glow: 'from-yellow-300 to-emerald-400',
    Icon: FaPython,
  },
];

const Certifications = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
      className='w-full max-w-7xl mx-auto px-4 md:px-8'
    >
      <motion.div variants={itemVariants} className='text-center mb-20'>
        <h2 className='section-header'>Premium <span className='text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple'>Certifications</span></h2>
        <p className='section-subtitle'>Industry recognized achievements and credentials.</p>
      </motion.div>

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8'>
        {certs.map(({ title, provider, file, glow, Icon }) => (
          <motion.div key={file} variants={itemVariants} className='h-full'>
            <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} glareEnable glareMaxOpacity={0.25} scale={1.03} transitionSpeed={1000} className='h-full'>
              <div className='glass-premium rounded-3xl p-7 border border-white/10 flex flex-col h-full min-h-[310px] shadow-2xl justify-between gap-7 group relative overflow-hidden'>
                <div className={`absolute inset-0 bg-gradient-to-br ${glow} opacity-0 group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none`} />
                <div className={`absolute -inset-1 bg-gradient-to-r ${glow} rounded-3xl blur opacity-0 group-hover:opacity-25 transition duration-700 pointer-events-none -z-10`} />

                <div className='relative z-10 flex items-start justify-between gap-4'>
                  <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br ${glow} shadow-[0_0_30px_rgba(0,212,255,0.18)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon size={30} className='text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.45)]' />
                  </div>
                  <FaAward size={52} className='text-white/10 transition-all duration-700 group-hover:scale-125 group-hover:text-white/20' />
                </div>

                <div className='relative z-10'>
                  <p className={`mb-3 inline-flex rounded-full border border-white/10 bg-gradient-to-r ${glow} bg-clip-text text-xs font-black uppercase tracking-[0.24em] text-transparent`}>
                    {provider}
                  </p>
                  <h3 className='text-white font-black text-2xl leading-tight transition-transform duration-300 group-hover:translate-x-1'>
                    {title}
                  </h3>
                </div>

                <a
                  href={`/certificate/${file}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='relative z-10 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#030014]/60 px-5 py-4 text-center text-sm font-black uppercase tracking-widest text-gray-300 transition-all duration-300 hover:border-transparent hover:bg-white hover:text-[#030014] hover:shadow-[0_0_30px_rgba(255,255,255,0.28)] overflow-hidden group/btn'
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${glow} opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300 pointer-events-none`} />
                  <FaExternalLinkAlt size={14} className='relative z-10 shrink-0' />
                  <span className='relative z-10'>View Credential</span>
                </a>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Certifications;
