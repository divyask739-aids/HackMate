import React from 'react';
import { Sparkles, Users, LayoutDashboard, SlidersHorizontal, User, Zap } from 'lucide-react';
import { Student } from '../types';

interface NavbarProps {
  activeTab: 'landing' | 'explore' | 'dashboard' | 'profile';
  onTabChange: (tab: 'landing' | 'explore' | 'dashboard' | 'profile') => void;
  candidateCount: number;
  pendingInviteCount: number;
  onOpenRequirements: () => void;
  currentUser: Student;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  candidateCount,
  pendingInviteCount,
  onOpenRequirements,
  currentUser,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div 
          onClick={() => onTabChange('landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                Hack<span className="text-indigo-400">Mate</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                Hackathon MVP
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              AI-Powered College Teammate Matchmaker
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onTabChange('landing')}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'landing'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => onTabChange('explore')}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'explore'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Explore</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              activeTab === 'explore' ? 'bg-indigo-900/60 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              {candidateCount}
            </span>
          </button>

          <button
            onClick={() => onTabChange('dashboard')}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer relative ${
              activeTab === 'dashboard'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">Team</span> Dashboard
            {pendingInviteCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse absolute top-1.5 right-1.5" />
            )}
          </button>

          <button
            onClick={() => onTabChange('profile')}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="hidden md:inline">My Profile</span>
          </button>
        </nav>

        {/* Right Action: Team Needs Button & Profile Pill */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenRequirements}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
            title="Configure required roles and skills"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
            <span>Team Needs</span>
          </button>

          <div
            onClick={() => onTabChange('profile')}
            className="flex items-center gap-2 p-1 pl-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-full cursor-pointer transition-colors"
            title="View or edit profile"
          >
            <span className="text-xs font-medium text-slate-300 hidden xl:inline pr-1">
              {currentUser.name.trim() ? currentUser.name : 'Create Profile'}
            </span>
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-indigo-500/50"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
