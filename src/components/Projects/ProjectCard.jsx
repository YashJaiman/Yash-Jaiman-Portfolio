import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ActionButton = ({ href, label, icon: Icon, primary }) => {
  const disabled = !href || href === '#';
  if (disabled) return null;

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`${label} for ${href}`}
      className={`flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 relative overflow-hidden group/btn ${
        primary 
          ? 'bg-gradient-to-r from-neon-cyan to-blue-500 text-[#030014] hover:shadow-[0_0_25px_rgba(0,212,255,0.6)]'
          : 'bg-white/5 text-gray-200 border border-white/10 hover:bg-white/10 hover:border-neon-cyan/50 hover:text-white'
      }`}
    >
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out" />
      <span className="relative z-10 flex items-center gap-2">
        <Icon size={16} /> {label}
      </span>
    </a>
  );
};

const ProjectCard = ({ project }) => {
  return (
    <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} glareEnable glareMaxOpacity={0.3} glarePosition="all" glareColor="#ffffff" scale={1.02} transitionSpeed={1000} className='h-full'>
      <motion.article 
        whileHover={{ y: -12 }} 
        transition={{ duration: 0.4, ease: "easeOut" }}
        className='glass-premium rounded-[2rem] overflow-hidden h-full flex flex-col border border-white/10 shadow-2xl relative group'
      >
        <div className='absolute -inset-1 bg-gradient-to-br from-neon-cyan via-transparent to-neon-purple rounded-[2rem] blur opacity-0 group-hover:opacity-30 transition duration-500 -z-10' />

        <div className='h-64 overflow-hidden bg-[#050510] relative rounded-t-[2rem]'>
          <div className='absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/50 to-transparent z-10 opacity-90 group-hover:opacity-60 transition-opacity duration-500' />
          <img 
            src={project.image} 
            alt={project.title} 
            width='640'
            height='360'
            loading='lazy'
            decoding='async'
            className='w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter group-hover:brightness-110' 
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-neon-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay z-10" />
        </div>

        <div className='p-8 flex flex-col flex-1 gap-5 relative z-20 -mt-12 bg-gradient-to-b from-transparent to-[#030014] rounded-b-[2rem]'>
          <h3 className='text-3xl font-black tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neon-cyan group-hover:to-white transition-all duration-300'>
            {project.title}
          </h3>
          
          <p className='text-gray-400 text-base leading-relaxed flex-1 font-light group-hover:text-gray-300 transition-colors duration-300'>
            {project.description}
          </p>

          <div className='flex flex-wrap gap-2 my-4'>
            {(project.technologies || []).map((tech) => (
              <span key={tech} className='px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 text-gray-300 border border-white/10 group-hover:border-neon-cyan/40 group-hover:shadow-[0_0_10px_rgba(0,212,255,0.2)] transition-all duration-300'>
                {tech}
              </span>
            ))}
          </div>

          <div className='flex gap-4 mt-auto pt-4'>
            <ActionButton href={project.live} label='Live Demo' icon={FaExternalLinkAlt} primary />
            <ActionButton href={project.github} label='Source Code' icon={FaGithub} />
          </div>
        </div>
      </motion.article>
    </Tilt>
  );
};

export default ProjectCard;
