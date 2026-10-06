import React from 'react';
import { X, CheckCircle2, AlertCircle, Sparkles, Award, Users, BookOpen, Clock, HeartHandshake } from 'lucide-react';
import { Student, CompatibilityBreakdown, TeamRequirement } from '../types';

interface ScoreBreakdownModalProps {
  student: Student | null;
  breakdown: CompatibilityBreakdown | null;
  requirement: TeamRequirement;
  onClose: () => void;
}

export const ScoreBreakdownModal: React.FC<ScoreBreakdownModalProps> = ({
  student,
  breakdown,
  requirement,
  onClose,
}) => {
  if (!student || !breakdown) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Compatibility Breakdown
              </h2>
              <p className="text-xs text-slate-400">
                Evaluating <span className="text-indigo-400 font-semibold">{student.name}</span> for <span className="text-slate-200 font-medium">{requirement.teamName}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Total Score Summary Box */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-b from-indigo-950/30 to-transparent">
          <div className="flex items-center justify-between bg-slate-950/60 p-4 rounded-xl border border-indigo-900/40">
            <div>
              <span className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">
                Overall Compatibility
              </span>
              <div className="text-3xl font-extrabold text-white mt-0.5 flex items-baseline gap-2">
                <span>{breakdown.totalScore}%</span>
                <span className="text-xs font-normal text-slate-400">
                  (Sum of 5 weighted factors)
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {breakdown.totalScore >= 85 ? 'Top Recommendation' : breakdown.totalScore >= 70 ? 'Strong Candidate' : 'Viable Teammate'}
              </span>
            </div>
          </div>
        </div>

        {/* 5 Weighted Factor Sections */}
        <div className="p-6 space-y-5">
          {/* 1. SKILLS MATCH (40%) */}
          <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">1. Skills Match (40% Weight)</h4>
                  <span className="text-xs text-slate-400">Matches candidate skills against team requirements</span>
                </div>
              </div>
              <span className="text-base font-bold text-blue-400 font-mono">
                {breakdown.skillsScore} / 40 pts
              </span>
            </div>

            {/* Matched & Missing Chips */}
            <div className="mt-3 space-y-2 text-xs">
              <div>
                <span className="text-slate-400 font-medium mr-2">Matched Skills:</span>
                {breakdown.matchedSkills.length > 0 ? (
                  <div className="inline-flex flex-wrap gap-1.5 mt-1">
                    {breakdown.matchedSkills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {s}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-slate-500 italic">None directly matched</span>
                )}
              </div>

              {breakdown.missingSkills.length > 0 && (
                <div>
                  <span className="text-slate-400 font-medium mr-2">Unmatched Needs:</span>
                  <div className="inline-flex flex-wrap gap-1.5 mt-1">
                    {breakdown.missingSkills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2. ROLE MATCH (25%) */}
          <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">2. Role Match (25% Weight)</h4>
                  <span className="text-xs text-slate-400">Preferred role vs open team positions</span>
                </div>
              </div>
              <span className="text-base font-bold text-purple-400 font-mono">
                {breakdown.roleScore} / 25 pts
              </span>
            </div>
            <div className="mt-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-slate-200">{breakdown.roleMatchDetails}</p>
                <p className="text-slate-400 mt-0.5">
                  Primary: <span className="text-purple-300 font-semibold">{student.primaryRole}</span>
                  {student.secondaryRole && ` • Secondary: ${student.secondaryRole}`}
                </p>
              </div>
            </div>
          </div>

          {/* 3. DEPARTMENT MATCH (15%) */}
          <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">3. Department Match (15% Weight)</h4>
                  <span className="text-xs text-slate-400">Academic domain alignment with project theme</span>
                </div>
              </div>
              <span className="text-base font-bold text-teal-400 font-mono">
                {breakdown.departmentScore} / 15 pts
              </span>
            </div>
            <div className="mt-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-200">{breakdown.departmentDetails}</p>
              </div>
            </div>
          </div>

          {/* 4. AVAILABILITY (10%) */}
          <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">4. Availability & Commitment (10% Weight)</h4>
                  <span className="text-xs text-slate-400">Hours commitment and schedule synchronization</span>
                </div>
              </div>
              <span className="text-base font-bold text-amber-400 font-mono">
                {breakdown.availabilityScore} / 10 pts
              </span>
            </div>
            <div className="mt-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 grid grid-cols-2 gap-2">
              <div>
                <span className="text-slate-400">Status:</span>{' '}
                <span className="font-semibold text-emerald-400">{student.availability}</span>
              </div>
              <div>
                <span className="text-slate-400">Hours:</span>{' '}
                <span className="font-semibold text-white">{student.hoursPerWeek} hrs/week</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400">Schedule:</span>{' '}
                <span className="font-semibold text-amber-300">{student.workSchedule}</span>
              </div>
            </div>
          </div>

          {/* 5. TEAM DIVERSITY (10%) */}
          <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">5. Team Diversity (10% Weight)</h4>
                  <span className="text-xs text-slate-400">Encourages cross-department synergy</span>
                </div>
              </div>
              <span className="text-base font-bold text-pink-400 font-mono">
                {breakdown.diversityScore} / 10 pts
              </span>
            </div>
            <div className="mt-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-200">{breakdown.diversityDetails}</p>
                <p className="text-slate-400 mt-0.5">
                  Interdisciplinary teams historically win 40% more hackathon awards due to balanced business, design, and tech skills.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm transition-colors cursor-pointer"
          >
            Close Breakdown
          </button>
        </div>
      </div>
    </div>
  );
};
