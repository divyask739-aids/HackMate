import React from 'react';
import { Sparkles, Users, Award, ShieldCheck, ArrowRight, Zap, Target, BookOpen, Clock, HeartHandshake } from 'lucide-react';
import { TeamRequirement } from '../types';

interface LandingHeroProps {
  requirement: TeamRequirement;
  onExploreTeammates: () => void;
  onOpenRequirements: () => void;
  onGoToDashboard: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  requirement,
  onExploreTeammates,
  onOpenRequirements,
  onGoToDashboard,
}) => {
  return (
    <div className="space-y-12 pb-8">
      {/* Hero Showcase Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-indigo-950/30 to-slate-950 border border-slate-800 p-8 sm:p-12 lg:p-16 text-center">
        {/* Glow ambient background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Live Hackathon Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6 shadow-sm">
          <Zap className="w-3.5 h-3.5 text-indigo-400" />
          <span>Smart Hackathon Teammate Matchmaker</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight">
          Form Winning Hackathon Teams with{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-pink-400 bg-clip-text text-transparent">
            Mathematical Compatibility
          </span>
        </h1>

        {/* Subtitle / Problem Statement */}
        <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          No more chaotic WhatsApp groups or mismatched teams. Match students by <strong>Skills (40%)</strong>, <strong>Role (25%)</strong>, <strong>Department (15%)</strong>, <strong>Availability (10%)</strong>, and <strong>Diversity (10%)</strong>.
        </p>

        {/* Live Example Badge Showcase */}
        <div className="mt-8 max-w-xl mx-auto bg-slate-950/80 border border-indigo-500/30 rounded-2xl p-4 shadow-xl text-left flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Algorithm Compatibility Model
              </div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                Frontend + AI + UI/UX Match &bull; Target Skills &rarr;{' '}
                <span className="text-emerald-400 font-extrabold">92% Compatibility</span>
              </div>
            </div>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold shrink-0">
            Optimal Match
          </div>
        </div>

        {/* Primary CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={onExploreTeammates}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Users className="w-4 h-4" />
            <span>Search & Match Candidates</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenRequirements}
            className="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Target className="w-4 h-4 text-indigo-400" />
            <span>Customize Team Requirements</span>
          </button>

          <button
            onClick={onGoToDashboard}
            className="px-5 py-3.5 rounded-2xl bg-slate-900/50 hover:bg-slate-800/80 text-slate-300 text-sm font-semibold border border-slate-800 transition-all cursor-pointer"
          >
            <span>Team Dashboard</span>
          </button>
        </div>
      </div>

      {/* 5-Factor Novel Compatibility Breakdown Architecture */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            The 5-Factor Compatibility Algorithm
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Engineered specifically to solve college hackathon team failures and build high-scoring rosters.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Factor 1: Skills (40%) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-blue-500/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-blue-400 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                40% Weight
              </span>
            </div>
            <h3 className="font-bold text-white text-sm">Skills Match</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Jaccard-based intersection of required tech stack (React, PyTorch, Figma) vs candidate repository.
            </p>
          </div>

          {/* Factor 2: Role (25%) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-purple-500/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-purple-400 px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                25% Weight
              </span>
            </div>
            <h3 className="font-bold text-white text-sm">Role Alignment</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Evaluates primary and secondary roles against vacant team positions to prevent role duplication.
            </p>
          </div>

          {/* Factor 3: Department (15%) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-teal-500/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-teal-400 px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20">
                15% Weight
              </span>
            </div>
            <h3 className="font-bold text-white text-sm">Department Fit</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Domain synergy between academic department curriculum (CSE, AI, Design, Biotech) and project scope.
            </p>
          </div>

          {/* Factor 4: Availability (10%) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                10% Weight
              </span>
            </div>
            <h3 className="font-bold text-white text-sm">Availability</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Synchronizes commitment hours (25-40 hrs) and work styles (Night Owl all-nighter vs Early Bird).
            </p>
          </div>

          {/* Factor 5: Diversity (10%) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-pink-500/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-pink-400 px-2 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/20">
                10% Weight
              </span>
            </div>
            <h3 className="font-bold text-white text-sm">Team Diversity</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Rewards multidisciplinary teams combining engineering, design, and business perspectives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
