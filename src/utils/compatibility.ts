import { Student, TeamRequirement, TeamMember, CompatibilityBreakdown } from '../types';

/**
 * Calculates the Team Compatibility Score for a candidate student.
 * 
 * Weights (Strictly adheres to HackMate specification):
 * - Skills match: 40%
 * - Role match: 25%
 * - Department match: 15%
 * - Availability: 10%
 * - Team diversity: 10%
 * Total: 100%
 */
export function calculateCompatibilityScore(
  student: Student,
  requirement: TeamRequirement,
  currentMembers: TeamMember[] = []
): CompatibilityBreakdown {
  // 1. SKILLS MATCH (40%)
  const reqSkills = requirement.requiredSkills.map((s) => s.toLowerCase());
  const candSkills = student.skills.map((s) => s.toLowerCase());

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  reqSkills.forEach((reqSkill) => {
    const isMatched = candSkills.some(
      (cSkill) => cSkill === reqSkill || cSkill.includes(reqSkill) || reqSkill.includes(cSkill)
    );
    // Find original casing
    const originalSkill = requirement.requiredSkills.find((s) => s.toLowerCase() === reqSkill) || reqSkill;
    if (isMatched) {
      matchedSkills.push(originalSkill);
    } else {
      missingSkills.push(originalSkill);
    }
  });

  let skillsScore = 0;
  if (reqSkills.length === 0) {
    skillsScore = 32; // Default baseline if no skills specified yet
  } else {
    const matchRatio = matchedSkills.length / reqSkills.length;
    let baseScore = matchRatio * 40;

    // Small bonus for having additional strong skills beyond the core requirements
    const extraSkills = student.skills.length - matchedSkills.length;
    const bonus = Math.min(3, Math.max(0, extraSkills * 0.5));
    skillsScore = Math.min(40, Math.round(baseScore + bonus));
  }

  // 2. ROLE MATCH (25%)
  let roleScore = 0;
  let roleMatchDetails = '';

  const isOpenRolePrimary = requirement.requiredRoles.includes(student.primaryRole);
  const isOpenRoleSecondary = student.secondaryRole && requirement.requiredRoles.includes(student.secondaryRole);

  if (requirement.requiredRoles.length === 0) {
    roleScore = 20;
    roleMatchDetails = 'Open role profile (Any role welcome)';
  } else if (isOpenRolePrimary) {
    roleScore = 25;
    roleMatchDetails = `Primary role "${student.primaryRole}" exactly matches an open team position (+25 pts)`;
  } else if (isOpenRoleSecondary) {
    roleScore = 18;
    roleMatchDetails = `Secondary role "${student.secondaryRole}" matches an open team position (+18 pts)`;
  } else {
    // Check complementary role mappings
    const isFullStack = student.primaryRole === 'Full Stack Developer';
    const needsFrontendOrBackend = requirement.requiredRoles.some(
      (r) => r === 'Frontend Developer' || r === 'Backend Developer'
    );
    if (isFullStack && needsFrontendOrBackend) {
      roleScore = 17;
      roleMatchDetails = 'Full Stack expertise covers open frontend/backend needs (+17 pts)';
    } else {
      roleScore = 8;
      roleMatchDetails = 'General engineering support role (+8 pts)';
    }
  }

  // 3. DEPARTMENT MATCH (15%)
  let departmentScore = 0;
  let departmentDetails = '';

  const preferredDeps = requirement.preferredDepartments || [];
  if (preferredDeps.length > 0 && preferredDeps.includes(student.department)) {
    departmentScore = 15;
    departmentDetails = `Matches preferred department: ${student.department} (+15 pts)`;
  } else if (preferredDeps.length === 0) {
    // Domain alignment heuristic
    const isTechRole = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'DevOps & Cloud Engineer'].includes(student.primaryRole);
    const isDesignRole = student.primaryRole === 'UI/UX Designer';
    const isAIRole = student.primaryRole === 'AI/ML Engineer';

    if (isDesignRole && student.department === 'Design & Visual Arts') {
      departmentScore = 15;
      departmentDetails = 'Direct alignment between Design discipline and UI/UX role (+15 pts)';
    } else if (isAIRole && (student.department === 'AI & Data Science' || student.department === 'Computer Science & Engineering')) {
      departmentScore = 15;
      departmentDetails = 'Strong curriculum alignment for AI/ML engineering (+15 pts)';
    } else if (isTechRole && ['Computer Science & Engineering', 'Information Technology', 'Electronics & Communication'].includes(student.department)) {
      departmentScore = 14;
      departmentDetails = 'Core engineering background well suited for technical delivery (+14 pts)';
    } else {
      departmentScore = 12;
      departmentDetails = `Relevant interdisciplinary perspective from ${student.department} (+12 pts)`;
    }
  } else {
    departmentScore = 9;
    departmentDetails = `Cross-domain candidate from ${student.department} (+9 pts)`;
  }

  // 4. AVAILABILITY (10%)
  let availabilityScore = 0;
  if (student.availability === 'Actively Looking') {
    availabilityScore += 6;
  } else if (student.availability === 'Open to Invites') {
    availabilityScore += 4;
  } else {
    availabilityScore += 2;
  }

  // Hours commitment check
  if (student.hoursPerWeek >= requirement.minHoursPerWeek) {
    availabilityScore += 2;
  } else {
    availabilityScore += 1;
  }

  // Schedule preference check
  if (
    !requirement.workSchedulePreference ||
    student.workSchedule === requirement.workSchedulePreference ||
    student.workSchedule === 'Flexible (Anytime)'
  ) {
    availabilityScore += 2;
  } else {
    availabilityScore += 1;
  }

  availabilityScore = Math.min(10, availabilityScore);

  // 5. TEAM DIVERSITY (10%)
  let diversityScore = 0;
  let diversityDetails = '';

  const existingDepartments = currentMembers.map((m) => m.department);
  const deptCountInTeam = existingDepartments.filter((d) => d === student.department).length;

  if (currentMembers.length === 0) {
    diversityScore = 9;
    diversityDetails = 'Fresh team foundation (+9 pts)';
  } else if (deptCountInTeam === 0) {
    // New department! Interdisciplinary synergy
    diversityScore = 10;
    diversityDetails = `Brings new discipline (${student.department}) not yet represented in team (+10 pts)`;
  } else if (deptCountInTeam === 1) {
    diversityScore = 6;
    diversityDetails = `Complements 1 existing member from ${student.department} (+6 pts)`;
  } else {
    diversityScore = 3;
    diversityDetails = `High department concentration (${deptCountInTeam} members already from ${student.department}) (+3 pts)`;
  }

  // TOTAL SCORE
  const totalScore = Math.min(
    100,
    Math.max(0, skillsScore + roleScore + departmentScore + availabilityScore + diversityScore)
  );

  return {
    totalScore,
    skillsScore,
    roleScore,
    departmentScore,
    availabilityScore,
    diversityScore,
    matchedSkills,
    missingSkills,
    roleMatchDetails,
    departmentDetails,
    diversityDetails,
  };
}
