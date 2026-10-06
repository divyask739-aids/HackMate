import React from 'react';
import { Users, Sparkles, CheckCircle2, XCircle, Clock, Trash2, UserPlus, HeartHandshake, Layers, Award, ArrowRight } from 'lucide-react';
import { TeamMember, TeamRequirement, Invitation, Student, CompatibilityBreakdown } from '../types';

interface TeamDashboardProps {
  requirement: TeamRequirement;
  members: TeamMember[];
  invitations: Invitation[];
  students: Student[];
  getCompatibility: (student: Student) => CompatibilityBreakdown;
  onRemoveMember: (memberId: string) => void;
  onAcceptInvite: (inviteId: string) => void;
  onDeclineInvite: (inviteId: string) => void;
  onOpenRequirements: () => void;
  onViewCandidate: (student: Student) => void;
}

export const TeamDashboard: React.FC<TeamDashboardProps> = ({
  requirement,
  members,
  invitations,
  students,
  getCompatibility,
  onRemoveMember,
  onAcceptInvite,
  onDeclineInvite,
  onOpenRequirements,
  onViewCandidate,
}) => {
  // Calculate unique departments represented in team
  const uniqueDepartments = Array.from(new Set(members.map((m) => m.department)));
  const diversityPercent = Math.min(100, Math.round((uniqueDepartments.length / Math.max(1, members.length)) * 100));

  // Role coverage
  const coveredRoles = members.map((m) => m.role);
  const roleCoverage = requirement.requiredRoles.map((role) => {
    const isCovered = coveredRoles.includes(role);
    const assignedMember = members.find((m) => m.role === role);
    return {
      role,
      isCovered,
      assignedMember,
    };
  });

  // Collect team skills
  const teamSkills = Array.from(
    new Set(
      members.flatMap((m) => {
        const student = students.find((s) => s.id === m.studentId);
        return student ? student.skills : [];
      })
    )
  );

  // Recommendations for unfilled roles
  const unfilledRoles = requirement.requiredRoles.filter((r) => !coveredRoles.includes(r));
  const memberStudentIds = members.map((m) => m.studentId);
  const invitedStudentIds = invitations.filter((i) => i.status === 'Pending').map((i) => i.studentId);

  const recommendedCandidates = students
    .filter((s) => !memberStudentIds.includes(s.id) && !invitedStudentIds.includes(s.id))
    .map((s) => ({ student: s, breakdown: getCompatibility(s) }))
    .sort((a, b) => b.breakdown.totalScore - a.breakdown.totalScore)
    .slice(0, 3);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Banner / Team Summary */}
      <div className="bg-gradient-to-r from-indigo-950/70 via-slate-900 to-violet-950/70 border border-indigo-900/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{requirement.hackathonName}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Team {requirement.teamName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1.5 leading-relaxed">
              {requirement.description || 'Smart Hackathon team formation and roster management.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <button
              onClick={onOpenRequirements}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Edit Team Criteria</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
          {/* Member count */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Team Roster
            </span>
            <div className="text-2xl font-bold text-white mt-1 flex items-baseline gap-1.5">
              <span>{members.length}</span>
              <span className="text-xs font-normal text-slate-500">/ {requirement.targetSize} members</span>
            </div>
          </div>

          {/* Role Coverage */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Role Coverage
            </span>
            <div className="text-2xl font-bold text-white mt-1 flex items-baseline gap-1.5">
              <span>{roleCoverage.filter((r) => r.isCovered).length}</span>
              <span className="text-xs font-normal text-slate-500">/ {requirement.requiredRoles.length} filled</span>
            </div>
          </div>

          {/* Team Diversity */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Interdisciplinary Diversity</span>
            </span>
            <div className="text-2xl font-bold text-pink-400 mt-1 flex items-baseline gap-1.5">
              <span>{uniqueDepartments.length}</span>
              <span className="text-xs font-normal text-slate-400">dept{uniqueDepartments.length === 1 ? '' : 's'} ({diversityPercent}%)</span>
            </div>
          </div>

          {/* Pending Invitations */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Active Invites
            </span>
            <div className="text-2xl font-bold text-amber-400 mt-1 flex items-baseline gap-1.5">
              <span>{invitations.filter((i) => i.status === 'Pending').length}</span>
              <span className="text-xs font-normal text-slate-500">pending response</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Roster & Role Coverage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Team Roster */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white text-base">Current Team Members</h3>
              </div>
              <span className="text-xs text-slate-400">
                {requirement.targetSize - members.length} vacant spot{requirement.targetSize - members.length === 1 ? '' : 's'} remaining
              </span>
            </div>

            {/* Members List */}
            <div className="space-y-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500/30"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-sm">{member.name}</h4>
                        {member.isLeader && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Team Lead
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                          {member.role}
                        </span>
                        <span className="text-xs text-slate-400">
                          {member.department}
                        </span>
                      </div>
                    </div>
                  </div>

                  {!member.isLeader && (
                    <button
                      onClick={() => onRemoveMember(member.id)}
                      className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-900 transition-colors"
                      title="Remove member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}

              {members.length === 0 && (
                <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 text-center mb-2">
                  <p className="text-xs text-slate-400">
                    No members in team roster yet. Invite candidates from the directory to assemble your team.
                  </p>
                </div>
              )}

              {/* Vacant slots */}
              {Array.from({ length: Math.max(0, requirement.targetSize - members.length) }).map((_, index) => (
                <div
                  key={`vacant-${index}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-dashed border-slate-800 bg-slate-950/20 text-slate-500"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl border border-dashed border-slate-800 flex items-center justify-center text-slate-600">
                      <UserPlus className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-400">
                        Vacant Slot #{members.length + index + 1}
                      </span>
                      <p className="text-[11px] text-slate-500">
                        {unfilledRoles[index] ? `Seeking ${unfilledRoles[index]}` : 'Ready for recruitment'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Outgoing Invitations Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">Connection & Invitation Tracker</h3>
              </div>
              <span className="text-xs text-slate-400">
                {invitations.length} invite{invitations.length === 1 ? '' : 's'} logged
              </span>
            </div>

            {invitations.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center italic bg-slate-950/40 rounded-xl border border-slate-800">
                No invitations sent yet. Go to Explore Teammates to invite matching students.
              </p>
            ) : (
              <div className="space-y-3">
                {invitations.map((inv) => (
                  <div
                    key={inv.id}
                    className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={inv.studentAvatar}
                        alt={inv.studentName}
                        className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-800 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-xs sm:text-sm">{inv.studentName}</h4>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              inv.status === 'Accepted'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : inv.status === 'Declined'
                                ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            {inv.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Invited for role: <strong className="text-indigo-300">{inv.invitedRole}</strong> • {inv.sentAt}
                        </p>
                        <p className="text-xs text-slate-300 italic mt-1 line-clamp-1 bg-slate-900/60 px-2 py-1 rounded border border-slate-800">
                          "{inv.message}"
                        </p>
                      </div>
                    </div>

                    {/* Actions: Demo accept / decline simulation */}
                    {inv.status === 'Pending' && (
                      <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => onAcceptInvite(inv.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all flex items-center gap-1 shadow-md shadow-emerald-900/30 cursor-pointer"
                          title="Simulate candidate accepting for the demo"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Simulate Accept</span>
                        </button>
                        <button
                          onClick={() => onDeclineInvite(inv.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-red-400 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
                          title="Cancel invitation"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 span): Role Coverage & Diversity Index */}
        <div className="space-y-6">
          {/* Required Roles Coverage Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="font-bold text-white text-base mb-1 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-400" />
              Role Coverage Status
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Verifies if every target position has an assigned specialist
            </p>

            <div className="space-y-2.5">
              {roleCoverage.map((item) => (
                <div
                  key={item.role}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                    item.isCovered
                      ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-300'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {item.isCovered ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-amber-500" />
                    )}
                    <div>
                      <div className="font-semibold text-slate-200">{item.role}</div>
                      {item.assignedMember && (
                        <div className="text-[10px] text-slate-400">
                          Covered by {item.assignedMember.name}
                        </div>
                      )}
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.isCovered
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {item.isCovered ? 'Filled' : 'Unfilled'}
                  </span>
                </div>
              ))}
            </div>

            {/* Team Skills Pool */}
            <div className="mt-4 pt-4 border-t border-slate-800">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Aggregate Team Skills Pool</span>
                <span className="text-indigo-400 font-bold">{teamSkills.length} skills</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {teamSkills.length > 0 ? (
                  teamSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 italic">No skills added yet</span>
                )}
              </div>
            </div>
          </div>

          {/* Interdisciplinary Diversity Breakdown */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="font-bold text-white text-base mb-1 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-pink-400" />
              Department Diversity Index
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Measures cross-department distribution for hackathon scoring
            </p>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 mb-3">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-slate-300 font-semibold">Synergy Index</span>
                <span className="text-pink-400 font-bold">{diversityPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-pink-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${diversityPercent}%` }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Departments Present:
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {uniqueDepartments.map((dept) => (
                  <span
                    key={dept}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-950 text-slate-200 border border-slate-800"
                  >
                    {dept}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Teammates Fast Track */}
          {recommendedCandidates.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="font-bold text-white text-base mb-1 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-400" />
                Recommended Candidates
              </h3>
              <p className="text-xs text-slate-400 mb-3">
                Top matches for remaining team needs
              </p>

              <div className="space-y-2.5">
                {recommendedCandidates.map(({ student, breakdown }) => (
                  <div
                    key={student.id}
                    onClick={() => onViewCandidate(student)}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-indigo-300">
                          {student.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {student.primaryRole}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-400">
                        {breakdown.totalScore}%
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
