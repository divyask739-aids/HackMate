import React from 'react';
import { Sparkles, Trophy, Clock, Send, CheckCircle2, ChevronRight, UserCheck } from 'lucide-react';
import { Student, CompatibilityBreakdown } from '../types';
import { CompatibilityBadge } from './CompatibilityBadge';

interface CandidateCardProps {
  student: Student;
  breakdown: CompatibilityBreakdown;
  hasInvited: boolean;
  isInTeam: boolean;
  onInvite: (student: Student) => void;
  onViewBreakdown: (student: Student) => void;
  onViewProfile: (student: Student) => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  student,
  breakdown,
  hasInvited,
  isInTeam,
  onInvite,
  onViewBreakdown,
  onViewProfile,
}) => {
  return (
    <div className="group relative bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col justify-between">
      {/* Top Bar: Profile photo, status, and name */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative cursor-pointer" onClick={() => onViewProfile(student)}>
              <img
                src={student.avatar}
                alt={student.name}
                className="w-13 h-13 rounded-2xl object-cover ring-2 ring-slate-800 group-hover:ring-indigo-500/50 transition-all"
              />
              <span
                className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${
                  student.availability === 'Actively Looking'
                    ? 'bg-emerald-400 animate-pulse'
                    : 'bg-amber-400'
                }`}
                title={student.availability}
              />
            </div>
            <div>
              <h3 
                onClick={() => onViewProfile(student)}
                className="font-bold text-base text-white hover:text-indigo-300 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                {student.name}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-1">
                {student.department} • <span className="text-indigo-400">{student.year}</span>
              </p>
            </div>
          </div>

          {/* Hackathon podium badge */}
          {student.hackathonsWon > 0 && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px] font-semibold shrink-0">
              <Trophy className="w-3 h-3" />
              <span>{student.hackathonsWon} {student.hackathonsWon === 1 ? 'Win' : 'Wins'}</span>
            </div>
          )}
        </div>

        {/* Roles */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            {student.primaryRole}
          </span>
          {student.secondaryRole && (
            <span className="px-2 py-1 rounded-lg text-[11px] font-medium bg-slate-800/80 text-slate-400 border border-slate-700/60">
              + {student.secondaryRole}
            </span>
          )}
        </div>

        {/* COMPATIBILITY SCORE BADGE */}
        <div className="mb-4">
          <CompatibilityBadge
            score={breakdown.totalScore}
            size="md"
            showDetailsButton={true}
            onViewBreakdown={() => onViewBreakdown(student)}
          />
        </div>

        {/* Student Bio */}
        <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
          {student.bio}
        </p>

        {/* Skills Preview */}
        <div className="mb-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
            <span>Skills</span>
            <span className="text-slate-500 text-[10px]">
              {breakdown.matchedSkills.length} matches team need
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {student.skills.slice(0, 5).map((skill) => {
              const isMatch = breakdown.matchedSkills.includes(skill);
              return (
                <span
                  key={skill}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-medium border transition-colors ${
                    isMatch
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40 font-semibold'
                      : 'bg-slate-800/70 text-slate-400 border-slate-700/60'
                  }`}
                >
                  {isMatch && '✓ '}
                  {skill}
                </span>
              );
            })}
            {student.skills.length > 5 && (
              <span className="px-1.5 py-0.5 rounded-md text-[10px] text-slate-400 bg-slate-800/40">
                +{student.skills.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Commitment & Work Style */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 py-2 border-t border-slate-800/60 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{student.hoursPerWeek} hrs/wk</span>
          </div>
          <span className="text-slate-400 truncate max-w-[150px]">
            {student.workSchedule}
          </span>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
        <button
          onClick={() => onViewProfile(student)}
          className="flex-1 py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <span>Profile</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {isInTeam ? (
          <div className="py-2 px-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs font-semibold flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5" />
            <span>In Team</span>
          </div>
        ) : hasInvited ? (
          <div className="py-2 px-3 rounded-xl bg-amber-950/60 border border-amber-800 text-amber-300 text-xs font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Invited</span>
          </div>
        ) : (
          <button
            onClick={() => onInvite(student)}
            className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Invite</span>
          </button>
        )}
      </div>
    </div>
  );
};
