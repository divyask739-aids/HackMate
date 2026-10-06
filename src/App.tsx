import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { CandidateCard } from './components/CandidateCard';
import { SearchAndFilters } from './components/SearchAndFilters';
import { TeamDashboard } from './components/TeamDashboard';
import { StudentProfileForm } from './components/StudentProfileForm';
import { ScoreBreakdownModal } from './components/ScoreBreakdownModal';
import { CandidateDetailModal } from './components/CandidateDetailModal';
import { TeamRequirementsModal } from './components/TeamRequirementsModal';
import { InviteModal } from './components/InviteModal';
import { ToastContainer, ToastMessage } from './components/Toast';

import { Student, TeamRequirement, TeamMember, Invitation, Department, HackathonRole, AvailabilityStatus } from './types';
import { MOCK_STUDENTS } from './data/mockStudents';
import { INITIAL_TEAM_REQUIREMENT, INITIAL_CURRENT_MEMBERS, INITIAL_MY_PROFILE, INITIAL_INVITATIONS } from './data/initialData';
import { calculateCompatibilityScore } from './utils/compatibility';
import { Users, Sparkles, SlidersHorizontal, RotateCcw, User } from 'lucide-react';

export function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'landing' | 'explore' | 'dashboard' | 'profile'>('landing');

  // Persistence / Local State (Clean start with empty student list)
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('hackmate_students_v3');
    return saved ? JSON.parse(saved) : [];
  });

  const [requirement, setRequirement] = useState<TeamRequirement>(() => {
    const saved = localStorage.getItem('hackmate_requirement_v3');
    return saved ? JSON.parse(saved) : INITIAL_TEAM_REQUIREMENT;
  });

  const [members, setMembers] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('hackmate_members_v3');
    return saved ? JSON.parse(saved) : [];
  });

  const [myProfile, setMyProfile] = useState<Student>(() => {
    const saved = localStorage.getItem('hackmate_myprofile_v3');
    return saved ? JSON.parse(saved) : INITIAL_MY_PROFILE;
  });

  const [invitations, setInvitations] = useState<Invitation[]>(() => {
    const saved = localStorage.getItem('hackmate_invitations_v3');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('hackmate_students_v3', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('hackmate_requirement_v3', JSON.stringify(requirement));
  }, [requirement]);

  useEffect(() => {
    localStorage.setItem('hackmate_members_v3', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('hackmate_myprofile_v3', JSON.stringify(myProfile));
  }, [myProfile]);

  useEffect(() => {
    localStorage.setItem('hackmate_invitations_v3', JSON.stringify(invitations));
  }, [invitations]);

  // Modals state
  const [isRequirementsOpen, setIsRequirementsOpen] = useState(false);
  const [breakdownModalStudent, setBreakdownModalStudent] = useState<Student | null>(null);
  const [detailModalStudent, setDetailModalStudent] = useState<Student | null>(null);
  const [inviteModalStudent, setInviteModalStudent] = useState<Student | null>(null);

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | 'All'>('All');
  const [selectedRole, setSelectedRole] = useState<HackathonRole | 'All'>('All');
  const [selectedAvailability, setSelectedAvailability] = useState<AvailabilityStatus | 'All'>('All');
  const [minScore, setMinScore] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'compatibility' | 'wins' | 'skills' | 'name'>('compatibility');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'warning', title: string, message?: string) => {
    const newToast: ToastMessage = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      title,
      message,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Helper for computing breakdown for any student
  const getCompatibility = (student: Student) => {
    return calculateCompatibilityScore(student, requirement, members);
  };

  // Filtered and Sorted Candidates
  const processedStudents = useMemo(() => {
    return students
      .map((student) => ({
        student,
        breakdown: calculateCompatibilityScore(student, requirement, members),
      }))
      .filter(({ student, breakdown }) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = student.name.toLowerCase().includes(q);
          const matchDept = student.department.toLowerCase().includes(q);
          const matchRole = student.primaryRole.toLowerCase().includes(q) || (student.secondaryRole && student.secondaryRole.toLowerCase().includes(q));
          const matchBio = student.bio.toLowerCase().includes(q);
          const matchSkills = student.skills.some((s) => s.toLowerCase().includes(q));

          if (!matchName && !matchDept && !matchRole && !matchBio && !matchSkills) {
            return false;
          }
        }

        // Department
        if (selectedDepartment !== 'All' && student.department !== selectedDepartment) {
          return false;
        }

        // Role
        if (selectedRole !== 'All') {
          if (student.primaryRole !== selectedRole && student.secondaryRole !== selectedRole) {
            return false;
          }
        }

        // Availability
        if (selectedAvailability !== 'All' && student.availability !== selectedAvailability) {
          return false;
        }

        // Min Score
        if (minScore > 0 && breakdown.totalScore < minScore) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'compatibility') {
          return b.breakdown.totalScore - a.breakdown.totalScore;
        }
        if (sortBy === 'wins') {
          return b.student.hackathonsWon - a.student.hackathonsWon;
        }
        if (sortBy === 'skills') {
          return b.student.skills.length - a.student.skills.length;
        }
        return a.student.name.localeCompare(b.student.name);
      });
  }, [
    students,
    requirement,
    members,
    searchQuery,
    selectedDepartment,
    selectedRole,
    selectedAvailability,
    minScore,
    sortBy,
  ]);

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('All');
    setSelectedRole('All');
    setSelectedAvailability('All');
    setMinScore(0);
    setSortBy('compatibility');
  };

  // Actions
  const handleSendInvite = (student: Student, role: HackathonRole, message: string) => {
    const newInvitation: Invitation = {
      id: `inv-${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      studentAvatar: student.avatar,
      invitedRole: role,
      teamName: requirement.teamName,
      message,
      status: 'Pending',
      sentAt: 'Just now',
    };
    setInvitations((prev) => [newInvitation, ...prev]);
    addToast('success', 'Invitation Sent!', `Invited ${student.name} to join ${requirement.teamName} as ${role}.`);
  };

  // Candidate Accepts Invitation (Simulation for Live Demo)
  const handleAcceptInvite = (inviteId: string) => {
    const invite = invitations.find((i) => i.id === inviteId);
    if (!invite) return;

    const student = students.find((s) => s.id === invite.studentId);
    if (!student) return;

    // Check if team is full
    if (members.length >= requirement.targetSize) {
      addToast('warning', 'Team Full', `Cannot add ${student.name}. Target team size of ${requirement.targetSize} reached.`);
      return;
    }

    // Add to members
    const newMember: TeamMember = {
      id: `mem-${Date.now()}`,
      studentId: student.id,
      name: student.name,
      avatar: student.avatar,
      department: student.department,
      role: invite.invitedRole,
      isLeader: false,
    };

    setMembers((prev) => [...prev, newMember]);
    setInvitations((prev) =>
      prev.map((i) => (i.id === inviteId ? { ...i, status: 'Accepted' } : i))
    );

    addToast('success', 'Candidate Joined Team!', `${student.name} accepted the invite! Roster and diversity updated.`);
  };

  const handleDeclineInvite = (inviteId: string) => {
    setInvitations((prev) =>
      prev.map((i) => (i.id === inviteId ? { ...i, status: 'Declined' } : i))
    );
    addToast('info', 'Invitation Cancelled', 'The invitation was cancelled.');
  };

  const handleRemoveMember = (memberId: string) => {
    const member = members.find((m) => m.id === memberId);
    if (!member) return;
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
    addToast('info', 'Member Removed', `${member.name} was removed from the team.`);
  };

  const handleSaveRequirements = (newReq: TeamRequirement) => {
    setRequirement(newReq);
    addToast('success', 'Team Requirements Updated!', 'Candidate compatibility scores recalculating dynamically.');
  };

  const handleAddNewStudent = (newStudent: Student) => {
    setStudents((prev) => [newStudent, ...prev]);
    addToast('success', 'Candidate Added!', `${newStudent.name} is now listed in the candidate directory.`);
  };

  const handleSaveProfile = (newProfile: Student) => {
    const profileToSave: Student = {
      ...newProfile,
      id: newProfile.id || `student-${Date.now()}`,
    };
    setMyProfile(profileToSave);

    // If profile has a name, add or update in the student directory
    if (profileToSave.name.trim()) {
      setStudents((prev) => {
        const exists = prev.some((s) => s.id === profileToSave.id);
        if (exists) {
          return prev.map((s) => (s.id === profileToSave.id ? profileToSave : s));
        } else {
          return [profileToSave, ...prev];
        }
      });
    }

    addToast('success', 'Profile Created & Saved!', 'Your student profile is now registered.');
  };

  const handleResetDemoData = () => {
    if (window.confirm('Clear all HackMate data and reset to a clean empty state?')) {
      localStorage.clear();
      setRequirement(INITIAL_TEAM_REQUIREMENT);
      setMembers([]);
      setMyProfile(INITIAL_MY_PROFILE);
      setInvitations([]);
      setStudents([]);
      handleResetFilters();
      addToast('info', 'Data Cleared', 'Application has been reset to an empty state.');
    }
  };

  // Helper mappings
  const memberStudentIds = members.map((m) => m.studentId);
  const pendingInviteStudentIds = invitations
    .filter((i) => i.status === 'Pending')
    .map((i) => i.studentId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        candidateCount={students.length}
        pendingInviteCount={pendingInviteStudentIds.length}
        onOpenRequirements={() => setIsRequirementsOpen(true)}
        currentUser={myProfile}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Active Tab: Landing / Overview */}
        {activeTab === 'landing' && (
          <div className="space-y-12">
            <LandingHero
              requirement={requirement}
              onExploreTeammates={() => setActiveTab('explore')}
              onOpenRequirements={() => setIsRequirementsOpen(true)}
              onGoToDashboard={() => setActiveTab('dashboard')}
            />

            {/* Quick Preview of Top Compatible Teammates */}
            <div className="pt-6 border-t border-slate-800/80">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Top Matched Candidates for {requirement.teamName}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Directly calculated using your current criteria ({requirement.requiredRoles.join(', ')})
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('explore')}
                  className="px-4 py-2 rounded-xl bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Users className="w-4 h-4" />
                  <span>View All {students.length} Candidates</span>
                </button>
              </div>

              {students.length === 0 ? (
                <div className="p-8 text-center bg-slate-900/60 border border-slate-800 rounded-3xl space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center mx-auto">
                    <User className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white">No students found. Create your profile to get started.</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Create your student profile with your skills, department, and role to compute real-time compatibility scores.
                  </p>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Create Profile</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {processedStudents.slice(0, 3).map(({ student, breakdown }) => (
                    <CandidateCard
                      key={student.id}
                      student={student}
                      breakdown={breakdown}
                      hasInvited={pendingInviteStudentIds.includes(student.id)}
                      isInTeam={memberStudentIds.includes(student.id)}
                      onInvite={(s) => setInviteModalStudent(s)}
                      onViewBreakdown={(s) => setBreakdownModalStudent(s)}
                      onViewProfile={(s) => setDetailModalStudent(s)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Active Tab: Explore Candidates */}
        {activeTab === 'explore' && (
          <div className="space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
                  <Users className="w-7 h-7 text-indigo-400" />
                  Search & Match Candidates
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Scores live-update based on your team requirements for <strong className="text-slate-200">{requirement.hackathonName}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRequirementsOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 text-slate-200 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Edit Team Requirements</span>
                </button>
              </div>
            </div>

            {/* Search and Filters Controls */}
            <SearchAndFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedDepartment={selectedDepartment}
              onDepartmentChange={setSelectedDepartment}
              selectedRole={selectedRole}
              onRoleChange={setSelectedRole}
              selectedAvailability={selectedAvailability}
              onAvailabilityChange={setSelectedAvailability}
              minScore={minScore}
              onMinScoreChange={setMinScore}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              totalResults={processedStudents.length}
              onResetFilters={handleResetFilters}
            />

            {/* Candidates Grid */}
            {processedStudents.length === 0 ? (
              <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
                  <Users className="w-7 h-7" />
                </div>
                {students.length === 0 ? (
                  <>
                    <h3 className="text-lg font-bold text-white">No students found. Create your profile to get started.</h3>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                      There are currently no student candidates in the database. Set up your student profile or add candidates to start calculating compatibility scores.
                    </p>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer inline-flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      <span>Create Profile</span>
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-bold text-white">No Matching Students Found</h3>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                      Try relaxing your department or role filters, or decrease the minimum compatibility threshold.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {processedStudents.map(({ student, breakdown }) => (
                  <CandidateCard
                    key={student.id}
                    student={student}
                    breakdown={breakdown}
                    hasInvited={pendingInviteStudentIds.includes(student.id)}
                    isInTeam={memberStudentIds.includes(student.id)}
                    onInvite={(s) => setInviteModalStudent(s)}
                    onViewBreakdown={(s) => setBreakdownModalStudent(s)}
                    onViewProfile={(s) => setDetailModalStudent(s)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Active Tab: Team Dashboard */}
        {activeTab === 'dashboard' && (
          <TeamDashboard
            requirement={requirement}
            members={members}
            invitations={invitations}
            students={students}
            getCompatibility={getCompatibility}
            onRemoveMember={handleRemoveMember}
            onAcceptInvite={handleAcceptInvite}
            onDeclineInvite={handleDeclineInvite}
            onOpenRequirements={() => setIsRequirementsOpen(true)}
            onViewCandidate={(s) => setDetailModalStudent(s)}
          />
        )}

        {/* Active Tab: My Profile */}
        {activeTab === 'profile' && (
          <StudentProfileForm
            currentProfile={myProfile}
            onSaveProfile={handleSaveProfile}
            onAddNewStudent={handleAddNewStudent}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-6 px-4 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-400">HackMate MVP</span>
          <span>&bull;</span>
          <span>College Hackathon Teammate Matching Platform</span>
        </div>

        <div className="flex items-center gap-4 mt-3 sm:mt-0">
          <button
            onClick={handleResetDemoData}
            className="text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
            title="Restore original demo data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo State</span>
          </button>
          <span>&bull;</span>
          <span className="text-slate-600">Built with React, TypeScript & Tailwind CSS</span>
        </div>
      </footer>

      {/* Modals */}
      {isRequirementsOpen && (
        <TeamRequirementsModal
          currentRequirement={requirement}
          onSave={handleSaveRequirements}
          onClose={() => setIsRequirementsOpen(false)}
        />
      )}

      {breakdownModalStudent && (
        <ScoreBreakdownModal
          student={breakdownModalStudent}
          breakdown={getCompatibility(breakdownModalStudent)}
          requirement={requirement}
          onClose={() => setBreakdownModalStudent(null)}
        />
      )}

      {detailModalStudent && (
        <CandidateDetailModal
          student={detailModalStudent}
          breakdown={getCompatibility(detailModalStudent)}
          requirement={requirement}
          hasInvited={pendingInviteStudentIds.includes(detailModalStudent.id)}
          isInTeam={memberStudentIds.includes(detailModalStudent.id)}
          onInvite={(s) => setInviteModalStudent(s)}
          onViewBreakdown={(s) => setBreakdownModalStudent(s)}
          onClose={() => setDetailModalStudent(null)}
        />
      )}

      {inviteModalStudent && (
        <InviteModal
          student={inviteModalStudent}
          requirement={requirement}
          onSendInvite={handleSendInvite}
          onClose={() => setInviteModalStudent(null)}
        />
      )}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

export default App;
