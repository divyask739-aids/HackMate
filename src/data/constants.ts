import { Department, HackathonRole, WorkSchedule } from '../types';

export const DEPARTMENTS: Department[] = [
  'Computer Science & Engineering',
  'Information Technology',
  'AI & Data Science',
  'Electronics & Communication',
  'Electrical & Electronics',
  'Mechanical Engineering',
  'Design & Visual Arts',
  'Business & Management',
  'Biotechnology',
];

export const HACKATHON_ROLES: HackathonRole[] = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'AI/ML Engineer',
  'UI/UX Designer',
  'Mobile App Developer',
  'DevOps & Cloud Engineer',
  'Product Pitcher & Strategist',
  'Blockchain / Web3 Dev',
];

export const WORK_SCHEDULES: WorkSchedule[] = [
  'Night Owl (All-Nighter)',
  'Flexible (Anytime)',
  'Day Hacker (Early Bird)',
];

export const SKILL_CATEGORIES: { category: string; skills: string[] }[] = [
  {
    category: 'Frontend & UI',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js', 'HTML/CSS', 'Three.js', 'Redux'],
  },
  {
    category: 'Backend & APIs',
    skills: ['Node.js', 'Express', 'Python', 'FastAPI', 'Django', 'Go', 'Java', 'PostgreSQL', 'MongoDB', 'GraphQL'],
  },
  {
    category: 'AI & Data Science',
    skills: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'OpenAI API', 'LangChain', 'Computer Vision', 'NLP', 'RAG', 'Hugging Face'],
  },
  {
    category: 'Design & Product',
    skills: ['Figma', 'UI/UX Design', 'Wireframing', 'Design Systems', 'User Research', 'Pitching', 'Slide Deck Design'],
  },
  {
    category: 'Mobile & Systems',
    skills: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Android SDK', 'iOS Development'],
  },
  {
    category: 'Cloud, DevOps & Web3',
    skills: ['Docker', 'AWS', 'Google Cloud', 'Kubernetes', 'Firebase', 'Supabase', 'Solidity', 'Smart Contracts', 'Git/GitHub'],
  },
];

export const ALL_SKILLS = Array.from(new Set(SKILL_CATEGORIES.flatMap((c) => c.skills)));

export const DEMO_PRESETS = [
  {
    name: 'Smart Campus AI Assistant (AI + Frontend + UI/UX)',
    hackathonName: 'Smart India Hackathon 2026',
    teamName: 'NeuralCoders',
    description: 'Building an intelligent multimodal campus navigation and grievance portal with fine-tuned LLMs.',
    targetSize: 4,
    requiredRoles: ['AI/ML Engineer', 'UI/UX Designer', 'Frontend Developer'] as HackathonRole[],
    requiredSkills: ['Python', 'PyTorch', 'React', 'Figma', 'LangChain', 'Tailwind CSS'],
    preferredDepartments: ['AI & Data Science', 'Design & Visual Arts', 'Computer Science & Engineering'] as Department[],
    minHoursPerWeek: 25,
    workSchedulePreference: 'Night Owl (All-Nighter)' as WorkSchedule,
  },
  {
    name: 'HealthTech Remote Vitals (Mobile + IoT + Backend)',
    hackathonName: 'InnoHealth Hackfest 2026',
    teamName: 'PulseSync',
    description: 'Developing a real-time patient telemetry app with BLE sensor communication and cloud anomaly detection.',
    targetSize: 4,
    requiredRoles: ['Mobile App Developer', 'Backend Developer', 'Product Pitcher & Strategist'] as HackathonRole[],
    requiredSkills: ['Flutter', 'FastAPI', 'PostgreSQL', 'Docker', 'Pitching', 'Firebase'],
    preferredDepartments: ['Electronics & Communication', 'Biotechnology', 'Information Technology'] as Department[],
    minHoursPerWeek: 20,
    workSchedulePreference: 'Flexible (Anytime)' as WorkSchedule,
  },
  {
    name: 'FinTech Decentralized Campus Grants (Web3 + Full Stack)',
    hackathonName: 'ETH Campus Hack 2026',
    teamName: 'ChainPioneers',
    description: 'Decentralized micro-grant allocation protocol for student research projects and club initiatives.',
    targetSize: 4,
    requiredRoles: ['Blockchain / Web3 Dev', 'Full Stack Developer', 'UI/UX Designer'] as HackathonRole[],
    requiredSkills: ['Solidity', 'Smart Contracts', 'React', 'TypeScript', 'Node.js', 'Figma'],
    preferredDepartments: ['Computer Science & Engineering', 'Business & Management'] as Department[],
    minHoursPerWeek: 30,
    workSchedulePreference: 'Night Owl (All-Nighter)' as WorkSchedule,
  },
];
