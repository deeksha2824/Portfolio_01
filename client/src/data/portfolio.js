import {
  FaBrain,
  FaCode,
  FaDatabase,
  FaFigma,
  FaGithub,
  FaJava,
  FaLinkedinIn,
  FaNodeJs,
  FaReact,
  FaShieldAlt
} from 'react-icons/fa';
import { SiCanva, SiExpress, SiJavascript, SiMysql, SiVite } from 'react-icons/si';

export const profile = {
  name: 'Deeksha L J',
  resumeName: 'Deeksha L J',
  headline: 'Computer Science Engineering Student',
  location: 'Bangalore, Karnataka, India',
  phone: '+91 9481110508',
  email: 'deekshagowda366@example.com',
  linkedin: 'https://www.linkedin.com/in/deeksha-gowda-1632b5262/',
  github: 'https://github.com/',
  resumeUrl: '/Deeksha_Gowda_Resume.pdf',
  roles: ['React Developer', 'AI Enthusiast', 'Cybersecurity Learner', 'Full-Stack Builder'],
  summary:
    'Final-year Computer Science Engineering student with strong fundamentals in programming, web development, cybersecurity, and AI. Hands-on experience through internships and real-world projects, with a practical focus on building reliable software systems.',
  strengths: ['Detail-oriented execution', 'Fast learner', 'Problem-solving mindset', 'Creative visual thinking']
};

export const stats = [
  { label: 'CGPA', value: '8.2' },
  { label: 'Internships', value: '3' },
  { label: 'Projects', value: '3+' },
  { label: 'Certifications', value: '4' }
];

export const education = [
  {
    title: 'B.E. in Computer Science and Engineering',
    place: 'Mangalore Institute of Technology and Engineering',
    period: '2022 - Present',
    meta: 'CGPA: 8.2'
  },
  {
    title: 'Senior Secondary, DPUE',
    place: 'Department of Pre-University Education',
    period: '2022',
    meta: 'Score: 89.5%'
  }
];

export const skills = [
  {
    category: 'Frontend',
    icon: FaReact,
    items: ['React.js', 'HTML', 'CSS', 'Responsive UI', 'Glassmorphism UI']
  },
  {
    category: 'Backend',
    icon: FaNodeJs,
    items: ['Node.js', 'Express.js', 'REST APIs', 'Flask fundamentals']
  },
  {
    category: 'Database',
    icon: FaDatabase,
    items: ['MySQL', 'Pinecone', 'Semantic search data flow']
  },
  {
    category: 'Programming Languages',
    icon: FaCode,
    items: ['C', 'C++','Python','Java', 'JavaScript']
  },
  {
    category: 'Tools & Platforms',
    icon: FaFigma,
    items: ['GitHub', 'Visual Studio Code', 'Figma', 'Canva', 'Vite']
  },
  {
    category: 'HR & Recruitment Skills',
    icon: FaBrain,
    items: ['Resume screening awareness', 'Interview readiness', 'Communication', 'Candidate empathy']
  }
];

export const technologyIcons = {
  React: FaReact,
  JavaScript: SiJavascript,
  Node: FaNodeJs,
  Express: SiExpress,
  MySQL: SiMysql,
  C: FaCode,
  Flask: FaCode,
  Pinecone: FaDatabase,
  GitHub: FaGithub,
  Figma: FaFigma,
  Canva: SiCanva,
  Vite: SiVite,
  Java: FaJava
};

export const experience = [
  {
    role: 'AI Intern',
    company: 'Infosys Springboard',
    location: 'Virtual',
    period: 'Sep 2025 - Nov 2025',
    points: ['Applied AI and machine-learning fundamentals through guided exercises.', 'Built mini project workflows focused on practical AI concepts.'],
    icon: FaBrain
  },
  {
    role: 'Cybersecurity Intern',
    company: 'IBM SkillsBuild',
    location: 'Virtual',
    period: 'Jun 2025 - Sep 2025',
    points: ['Implemented image steganography in C.', 'Analyzed basic security threats, vulnerabilities, and secure-data concepts.'],
    icon: FaShieldAlt
  },
  {
    role: 'Blockchain Intern',
    company: 'Vodafone Idea Foundation',
    location: 'Virtual',
    period: 'Jan 2025 - Feb 2025',
    points: ['Explored blockchain fundamentals and decentralized application patterns.', 'Studied case-based use of distributed ledger technology.'],
    icon: FaDatabase
  }
];

export const projects = [
  {
    title: 'Legal Case Retrieval and Chatbot System',
    description: 'AI-based legal Q&A platform that uses semantic search to improve legal information retrieval beyond keyword matching.',
    technologies: ['Flask', 'Pinecone', 'JavaScript'],
    features: ['Semantic case retrieval', 'Conversational Q&A', 'Accuracy-focused search flow'],
    github: profile.github,
    demo: '#contact',
    gradient: 'from-teal-400 via-cyan-500 to-blue-600'
  },
  {
    title: 'DCT-Based Image Steganography',
    description: 'Secure data-hiding project for grayscale images using Discrete Cosine Transform and C programming.',
    technologies: ['C'],
    features: ['Image-domain data hiding', 'Security-focused encoding', 'Cybersecurity fundamentals'],
    github: profile.github,
    demo: '#contact',
    gradient: 'from-orange-400 via-rose-500 to-fuchsia-600'
  },
  {
    title: 'Seating Arrangement Automation System',
    description: 'Exam seating automation system built to reduce manual effort, eliminate allocation errors, and speed up planning.',
    technologies: ['React', 'Node', 'Express', 'MySQL'],
    features: ['Automated seat allocation', 'Admin-friendly interface', 'Reduced manual errors'],
    github: profile.github,
    demo: '#contact',
    gradient: 'from-blue-500 via-indigo-500 to-teal-500'
  }
];

export const certifications = [
  'NPTEL - Cryptography and Network Security',
  'Ethical Hacking - Simplilearn',
  'Cyber Security - Great Learning',
  'Infosys Springboard - Defining Cryptography'
];

export const achievements = [
  'Maintained an 8.2 CGPA while completing practical internships and project work.',
  'Built an AI-powered legal retrieval concept using semantic search.',
  'Applied cybersecurity concepts by implementing image steganography in C.',
  'Scored 89.5% in Senior Secondary under DPUE.'
];

export const testimonials = [
  {
    name: 'Project Mentor',
    role: 'Academic Guidance',
    quote: 'She brings a careful problem-solving mindset and translates technical concepts into working project flows.'
  },
  {
    name: 'Peer Collaborator',
    role: 'Team Project Work',
    quote: 'Her strongest quality is consistency. She keeps the user experience simple while staying attentive to implementation details.'
  },
  {
    name: 'Recruiter Perspective',
    role: 'Portfolio Review',
    quote: 'The blend of React, AI, cybersecurity, and backend fundamentals makes her profile easy to understand and easy to remember.'
  }
];

export const githubActivity = [
  { label: 'Portfolio UI system', type: 'React', detail: 'Built reusable animated sections and glassmorphism components.' },
  { label: 'Legal chatbot concept', type: 'AI', detail: 'Designed semantic retrieval flow with Flask and Pinecone.' },
  { label: 'Exam seating automation', type: 'Full stack', detail: 'Implemented allocation workflows with React, Node, Express, and MySQL.' },
  { label: 'Image steganography', type: 'Security', detail: 'Applied DCT concepts for secure grayscale image data hiding.' }
];

export const socials = [
  { label: 'LinkedIn', href: profile.linkedin, icon: FaLinkedinIn },
  { label: 'GitHub', href: profile.github, icon: FaGithub }
];
