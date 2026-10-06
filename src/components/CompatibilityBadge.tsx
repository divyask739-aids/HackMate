import React from 'react';
import { Sparkles, Info } from 'lucide-react';

interface CompatibilityBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showDetailsButton?: boolean;
  onViewBreakdown?: () => void;
}

export const CompatibilityBadge: React.FC<CompatibilityBadgeProps> = ({
  score,
  size = 'md',
  showDetailsButton = true,
  onViewBreakdown,
}) => {
  // Color tiers
  let colorClass = 'from-emerald-500 to-teal-400 text-emerald-400 border-emerald-500/30 bg-emerald-950/40';
  let badgeLabel = 'Exceptional Match';
  let textColor = 'text-emerald-400';

  if (score < 50) {
    colorClass = 'from-slate-500 to-gray-400 text-slate-400 border-slate-700 bg-slate-900/60';
    badgeLabel = 'Basic Fit';
    textColor = 'text-slate-400';
  } else if (score < 70) {
    colorClass = 'from-amber-500 to-orange-400 text-amber-400 border-amber-500/30 bg-amber-950/40';
    badgeLabel = 'Moderate Fit';
    textColor = 'text-amber-400';
  } else if (score < 85) {
    colorClass = 'from-cyan-500 to-blue-400 text-cyan-400 border-cyan-500/30 bg-cyan-950/40';
    badgeLabel = 'Strong Match';
    textColor = 'text-cyan-400';
  }

  if (size === 'sm') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${colorClass}`}>
        <Sparkles className="w-3 h-3" />
        <span>{score}% Match</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-between p-3 rounded-xl border backdrop-blur-md transition-all ${colorClass}`}>
      <div className="flex items-center gap-3">
        {/* Circular Progress Gauge */}
        <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-800"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={textColor}
              strokeDasharray={`${score}, 100`}
              strokeLinecap="round"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="absolute text-xs font-bold text-white tracking-tight">
            {score}%
          </span>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-slate-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Compatibility Score
          </div>
          <div className="text-sm font-bold text-white mt-0.5">
            {badgeLabel}
          </div>
        </div>
      </div>

      {showDetailsButton && onViewBreakdown && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onViewBreakdown();
          }}
          className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
          title="Inspect calculation formula breakdown"
        >
          <Info className="w-3.5 h-3.5 text-indigo-400" />
          <span>Formula</span>
        </button>
      )}
    </div>
  );
};
