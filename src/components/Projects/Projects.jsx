import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { projects } from '../../constants/projects';
import { containerVariants, itemVariants } from '../../utils/motion';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
      className='w-full max-w-7xl mx-auto px-4 md:px-8'
    >
      <motion.div variants={itemVariants} className='text-center mb-12'>
        <h2 className='section-header'>Projects</h2>
        <p className='section-subtitle'>Real full-stack and backend projects with production links.</p>
      </motion.div>

      <div className='grid md:grid-cols-2 gap-6 lg:gap-8'>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;
