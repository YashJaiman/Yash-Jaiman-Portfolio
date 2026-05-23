import project1 from '../assets/images/project1.png';
import project2 from '../assets/images/project3.png';
import project3 from '../assets/images/project2.png';

export const projects = [
  {
    id: 1,
    title: 'Nexus AI',
    description: 'AI-powered productivity and analytics platform with authentication, dashboards, modern UI, and cloud-ready architecture.',
    image: project1,
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini API', 'Docker'],
    live: 'https://nexus-ai-mu-one.vercel.app/',
    backend: 'https://nexus-ai-1-0xy5.onrender.com/',
    github: 'https://github.com/YashJaiman/Nexus-AI',
  },
  {
    id: 2,
    title: 'ExpenseFlow',
    description: 'Backend-driven expense tracking platform with authentication, analytics, transaction management, and Dockerized CI/CD deployment.',
    image: project3,
    technologies: ['Node.js', 'Express', 'MongoDB', 'Docker', 'CI/CD'],
    live: 'https://expense-flow-ecru.vercel.app/',
    backend: 'https://expenseflow-xivq.onrender.com/',
    github: 'https://github.com/YashJaiman/ExpenseFlow',
  },
  {
    id: 3,
    title: 'YJ Watches',
    description: 'Full-stack watch e-commerce platform with responsive UI, authentication, product management, and scalable deployment workflow.',
    image: project2,
    technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MySQL', 'Docker', 'CI/CD'],
    live: 'https://yj-watches.vercel.app/',
    backend: 'https://yj-watches-backend.onrender.com/',
    github: 'https://github.com/YashJaiman/YJ-Watches',
  }
];
