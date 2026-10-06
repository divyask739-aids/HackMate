import { TeamMember, TeamRequirement, Student, Invitation } from '../types';

export const INITIAL_TEAM_REQUIREMENT: TeamRequirement = {
  teamName: 'My Hackathon Team',
  hackathonName: 'College Hackathon 2026',
  description: '',
  targetSize: 4,
  requiredRoles: ['Frontend Developer', 'Backend Developer', 'UI/UX Designer'],
  requiredSkills: [],
  preferredDepartments: [],
  minHoursPerWeek: 20,
  workSchedulePreference: 'Flexible (Anytime)',
};

export const INITIAL_CURRENT_MEMBERS: TeamMember[] = [];

export const INITIAL_MY_PROFILE: Student = {
  id: 'student-self',
  name: '',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
  department: 'Computer Science & Engineering',
  year: '1st Year',
  bio: '',
  primaryRole: 'Frontend Developer',
  skills: [],
  availability: 'Actively Looking',
  hoursPerWeek: 20,
  workSchedule: 'Flexible (Anytime)',
  hackathonsAttended: 0,
  hackathonsWon: 0,
};

export const INITIAL_INVITATIONS: Invitation[] = [];
