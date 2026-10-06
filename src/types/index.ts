export type Department = 
  | 'Computer Science & Engineering'
  | 'Information Technology'
  | 'AI & Data Science'
  | 'Electronics & Communication'
  | 'Electrical & Electronics'
  | 'Mechanical Engineering'
  | 'Design & Visual Arts'
  | 'Business & Management'
  | 'Biotechnology';

export type HackathonRole = 
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'Full Stack Developer'
  | 'AI/ML Engineer'
  | 'UI/UX Designer'
  | 'Mobile App Developer'
  | 'DevOps & Cloud Engineer'
  | 'Product Pitcher & Strategist'
  | 'Blockchain / Web3 Dev';

export type AvailabilityStatus = 'Actively Looking' | 'Open to Invites' | 'Team Formed';

export type WorkSchedule = 'Night Owl (All-Nighter)' | 'Flexible (Anytime)' | 'Day Hacker (Early Bird)';

export interface Student {
  id: string;
  name: string;
  avatar: string;
  department: Department;
  year: '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | 'Postgrad';
  bio: string;
  primaryRole: HackathonRole;
  secondaryRole?: HackathonRole;
  skills: string[];
  availability: AvailabilityStatus;
  hoursPerWeek: number;
  workSchedule: WorkSchedule;
  hackathonsAttended: number;
  hackathonsWon: number;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  featuredProject?: {
    title: string;
    description: string;
    techStack: string[];
  };
}

export interface TeamMember {
  id: string;
  studentId: string;
  name: string;
  avatar: string;
  department: Department;
  role: HackathonRole;
  isLeader: boolean;
}

export interface TeamRequirement {
  teamName: string;
  hackathonName: string;
  description: string;
  targetSize: number;
  requiredRoles: HackathonRole[];
  requiredSkills: string[];
  preferredDepartments?: Department[];
  minHoursPerWeek: number;
  workSchedulePreference?: WorkSchedule;
}

export interface CompatibilityBreakdown {
  totalScore: number; // 0 - 100
  skillsScore: number; // 0 - 40
  roleScore: number; // 0 - 25
  departmentScore: number; // 0 - 15
  availabilityScore: number; // 0 - 10
  diversityScore: number; // 0 - 10
  matchedSkills: string[];
  missingSkills: string[];
  roleMatchDetails: string;
  departmentDetails: string;
  diversityDetails: string;
}

export interface Invitation {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  invitedRole: HackathonRole;
  teamName: string;
  message: string;
  status: 'Pending' | 'Accepted' | 'Declined';
  sentAt: string;
}
