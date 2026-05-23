import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import {
  FaBriefcase,
  FaCheckCircle,
  FaGraduationCap,
  FaRocket,
  FaServer,
} from 'react-icons/fa';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { containerVariants, itemVariants } from '../../utils/motion';

const timelineData = [
  {
    year: '2023 - 2027',
    title: 'B.Tech in Computer Science Engineering',
    role: 'B.Tech Journey',
    description:
      'Started my B.Tech journey at Poornima Institute of Engineering & Technology (PIET), Jaipur with focus on software engineering, backend development, cloud computing, DevOps, and problem solving.',
    highlights: [
      'PIET Jaipur',
      'Computer Science Engineering',
      'Current CGPA: 8.1',
      'Learning DSA, OOP, DBMS, Networking',
    ],
    glow: 'from-neon-cyan to-blue-500',
    Icon: FaGraduationCap,
  },
  {
    year: 'Jul 2024 - Jul 2024',
    title: 'Software Developer Intern — Mission Minded Foundation',
    role: 'Software Developer Intern',
    description:
      'Worked on frontend development and UI optimization while improving application usability and user experience.',
    highlights: [
      'Built responsive UI components',
      'Worked with HTML, CSS, JavaScript',
      'Improved frontend performance',
      'Collaborated on real-world requirements',
    ],
    glow: 'from-purple-500 to-neon-purple',
    Icon: FaBriefcase,
  },
  {
    year: 'Jun 2025 - Sept 2025',
    title: 'Red Hat Linux Intern — System Administrator',
    role: 'RHCSA Linux Intern',
    description:
      'Worked with Red Hat Enterprise Linux (RHEL) environments, automation scripting, and server deployment.',
    highlights: [
      'Managed Linux users & permissions',
      'Automated tasks using Bash & Python',
      'Configured secure mail server',
      'Worked with Postfix, Dovecot & Roundcube',
    ],
    glow: 'from-red-500 to-rose-500',
    Icon: FaServer,
  },
  {
    year: 'May 2026 - Jul 2026',
    title: 'DevOps Intern — Digital Creative Tech Solutions',
    role: 'DevOps Intern',
    description:
      'Working on DevOps workflows, Dockerized deployments, CI/CD pipelines, monitoring, and scalable infrastructure practices.',
    highlights: [
      'Docker & Containerization',
      'Jenkins CI/CD',
      'Deployment Automation',
      'Cloud & Infrastructure Learning',
    ],
    glow: 'from-cyan-400 to-neon-purple',
    Icon: FaRocket,
  },
];

const ExperienceCard = ({ item, align }) => {
  const { Icon } = item;

  return (
    <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} glareEnable glareMaxOpacity={0.14} scale={1.015} transitionSpeed={900} className='h-full'>
      <article className='group relative h-full overflow-hidden rounded-3xl border border-white/10 glass-premium p-6 md:p-8 shadow-2xl transition-all duration-500 hover:-translate-y-1'>
        <div className={`absolute inset-0 bg-gradient-to-br ${item.glow} opacity-0 transition-opacity duration-700 group-hover:opacity-[0.07] pointer-events-none`} />
        <div className={`absolute -inset-1 bg-gradient-to-r ${item.glow} rounded-3xl blur opacity-0 transition duration-700 group-hover:opacity-25 pointer-events-none -z-10`} />

        <div className={`relative z-10 flex flex-col gap-6 ${align === 'left' ? 'md:text-right md:items-end' : 'md:text-left md:items-start'}`}>
          <div className={`flex w-full flex-col gap-4 ${align === 'left' ? 'md:items-end' : 'md:items-start'}`}>
            <span className='inline-flex w-fit rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-cyan-100 shadow-[0_0_20px_rgba(0,212,255,0.08)]'>
              {item.year}
            </span>
            <div className={`flex items-center gap-3 ${align === 'left' ? 'md:flex-row-reverse' : ''}`}>
              <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${item.glow} shadow-[0_0_24px_rgba(0,212,255,0.24)]`}>
                <Icon className='text-white' size={20} />
              </div>
              <p className='text-xs font-black uppercase tracking-[0.28em] text-gray-400'>{item.role}</p>
            </div>
          </div>

          <div>
            <h3 className='text-2xl md:text-3xl font-black leading-tight text-white'>
              {item.title}
            </h3>
            <p className='mt-4 text-base leading-8 text-gray-400 font-light'>
              {item.description}
            </p>
          </div>

          <ul className={`grid w-full gap-3 text-sm text-gray-300 ${align === 'left' ? 'md:justify-items-end' : ''}`}>
            {item.highlights.map((highlight) => (
              <li
                key={highlight}
                className={`flex max-w-md items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 backdrop-blur-xl ${align === 'left' ? 'md:flex-row-reverse md:text-right' : ''}`}
              >
                <FaCheckCircle className='shrink-0 text-neon-cyan drop-shadow-[0_0_8px_rgba(0,212,255,0.55)]' />
                <span className='font-semibold'>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Tilt>
  );
};

const Experience = () => {
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
        <h2 className='section-header'>Experience & <span className='text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple'>Journey</span></h2>
        <p className='section-subtitle'>A focused timeline of my education, internships, Linux administration, and DevOps growth.</p>
      </motion.div>

      <div className='relative'>
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isVisible ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.25, ease: 'easeOut' }}
          className='absolute left-6 top-0 bottom-0 w-[3px] origin-top rounded-full bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent shadow-[0_0_24px_rgba(0,212,255,0.55)] md:left-1/2 md:-translate-x-1/2'
        />

        <div className='space-y-14 md:space-y-20'>
          {timelineData.map((item, index) => {
            const align = index % 2 === 0 ? 'left' : 'right';
            const cardPosition = align === 'left' ? 'md:col-start-1' : 'md:col-start-3';
            const { Icon } = item;

            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className='relative grid grid-cols-1 pl-16 md:grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)] md:items-center md:gap-0 md:pl-0'
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ delay: 0.35 + index * 0.16, type: 'spring', stiffness: 220, damping: 18 }}
                  className='absolute left-6 top-8 z-20 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full border border-cyan-200/40 bg-[#030014] shadow-[0_0_28px_rgba(0,212,255,0.7)] md:left-1/2 md:top-1/2 md:-translate-y-1/2'
                >
                  <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.glow} opacity-25 blur-md`} />
                  <span className='absolute inset-0 rounded-full border border-cyan-200/30 animate-ping' />
                  <Icon className='relative z-10 text-cyan-100' size={18} />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className={`w-full ${cardPosition}`}
                >
                  <ExperienceCard item={item} align={align} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Experience;
