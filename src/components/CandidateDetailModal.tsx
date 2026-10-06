import React from 'react';
import { X, Trophy, ExternalLink, Calendar, Clock, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { Student, CompatibilityBreakdown, TeamRequirement } from '../types';
import { CompatibilityBadge } from './CompatibilityBadge';

interface CandidateDetailModalProps {
  student: Student | null;
  breakdown: CompatibilityBreakdown | null;
  requirement: TeamRequirement;
  hasInvited: boolean;
  isInTeam: boolean;
  onInvite: (student: Student) => void;
  onViewBreakdown: (student: Student) => void;
  onClose: () => void;
}

export const CandidateDetailModal: React.FC<CandidateDetailModalProps> = ({
  student,
  breakdown,
  hasInvited,
  isInTeam,
  onInvite,
  onViewBreakdown,
  onClose,
}) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between z-10">
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
            Student Candidate Profile
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Section */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-18 h-18 rounded-2xl object-cover ring-2 ring-indigo-500/40 shadow-xl"
                />
                <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
                  student.availability === 'Actively Looking' ? 'bg-emerald-400' : 'bg-amber-400'
                }`} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  {student.name}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                    {student.department}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                    {student.year}
                  </span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {student.githubUrl && (
                <a
                  href={student.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {student.linkedinUrl && (
                <a
                  href={student.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 border border-slate-700 transition-colors"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {student.portfolioUrl && (
                <a
                  href={student.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 border border-slate-700 transition-colors"
                  title="Portfolio Website"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Roles */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Primary Role: {student.primaryRole}
            </div>
            {student.secondaryRole && (
              <div className="px-3 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700 text-xs font-medium">
                Secondary Role: {student.secondaryRole}
              </div>
            )}
          </div>
        </div>

        {/* Compatibility highlight */}
        {breakdown && (
          <div className="p-6 border-b border-slate-800 bg-slate-950/40">
            <CompatibilityBadge
              score={breakdown.totalScore}
              size="md"
              showDetailsButton={true}
              onViewBreakdown={() => onViewBreakdown(student)}
            />
          </div>
        )}

        {/* Body content */}
        <div className="p-6 space-y-6">
          {/* Bio */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              About Student
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
              {student.bio}
            </p>
          </div>

          {/* Hackathon Track Record & Availability */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                Hackathon Experience
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Hackathons Attended:</span>
                  <span className="font-bold text-white">{student.hackathonsAttended}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Hackathons Won / Podiums:</span>
                  <span className="font-bold text-amber-400">{student.hackathonsWon} wins</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                Availability & Commitment
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Weekly Commitment:</span>
                  <span className="font-bold text-white">{student.hoursPerWeek} hrs/week</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Work Schedule:</span>
                  <span className="font-bold text-cyan-300">{student.workSchedule}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Breakdown */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Technical & Product Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {student.skills.map((skill) => {
                const isMatched = breakdown?.matchedSkills.includes(skill);
                return (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 ${
                      isMatched
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-950'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {isMatched && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    {skill}
                    {isMatched && <span className="text-[10px] text-emerald-400 font-bold ml-1">(Required)</span>}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Featured Project */}
          {student.featuredProject && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                Featured Hackathon Project
              </h4>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-indigo-900/40 space-y-2">
                <h5 className="font-bold text-sm text-white">{student.featuredProject.title}</h5>
                <p className="text-xs text-slate-300">{student.featuredProject.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {student.featuredProject.techStack.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-[11px]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-6 py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-colors cursor-pointer"
          >
            Close
          </button>

          {isInTeam ? (
            <span className="px-4 py-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 text-sm font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Already in Team
            </span>
          ) : hasInvited ? (
            <span className="px-4 py-2 rounded-xl bg-amber-950 text-amber-300 border border-amber-800 text-sm font-semibold flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> Invitation Pending
            </span>
          ) : (
            <button
              onClick={() => {
                onClose();
                onInvite(student);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" /> Invite to Team
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
