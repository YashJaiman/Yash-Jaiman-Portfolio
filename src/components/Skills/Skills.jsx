import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { containerVariants, itemVariants } from '../../utils/motion';

const skillsData = [
  { category: 'Frontend', skills: ['HTML', 'CSS', 'JavaScript', 'React.js'], color: 'from-blue-400 to-cyan-300' },
  { category: 'Backend', skills: ['Node.js', 'Express.js', 'REST APIs'], color: 'from-green-400 to-emerald-400' },
  { category: 'Programming', skills: ['Python', 'C', 'C++', 'JavaScript'], color: 'from-yellow-400 to-orange-400' },
  { category: 'DevOps & Cloud', skills: ['Docker', 'Jenkins', 'CI/CD', 'Kubernetes', 'Terraform', 'Helm', 'AWS', 'Google Cloud'], color: 'from-purple-500 to-indigo-500' },
  { category: 'Databases', skills: ['MySQL', 'MongoDB'], color: 'from-pink-500 to-rose-400' },
  { category: 'Systems', skills: ['Linux', 'Networking', 'OOP', 'DSA'], color: 'from-gray-300 to-white' }
];

const Skills = () => {
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
        <h2 className='section-header'>Tech <span className='text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple'>Arsenal</span></h2>
        <p className='section-subtitle'>My core technologies, tools, and platforms.</p>
      </motion.div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {skillsData.map((group, groupIndex) => (
          <motion.div key={group.category} variants={itemVariants}>
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable glareMaxOpacity={0.2} glarePosition="all" scale={1.03} transitionSpeed={1000} className='h-full'>
              <div className='glass-premium rounded-3xl p-8 border border-white/10 h-full relative group overflow-hidden shadow-2xl'>
                <div className={`absolute inset-0 bg-gradient-to-br ${group.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700`} />
                <div className={`absolute -inset-1 bg-gradient-to-r ${group.color} rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-700 -z-10`} />
                
                <h3 className='text-2xl font-black text-white mb-8 pb-4 border-b border-white/10 relative group-hover:tracking-wide transition-all duration-300'>
                  {group.category}
                  <div className={`absolute bottom-0 left-0 h-[2px] w-12 bg-gradient-to-r ${group.color} transition-all duration-500 group-hover:w-full`} />
                </h3>
                
                <div className='flex flex-wrap gap-3 relative z-10'>
                  {group.skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      whileHover={{ y: -5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`px-4 py-2 rounded-xl bg-[#030014]/50 border border-white/10 text-sm font-bold text-gray-300 transition-all duration-300 
                      hover:bg-white/10 hover:border-white/30 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-default`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Skills;
