import React from 'react';
import { Search, Filter, X, ArrowUpDown, Sparkles } from 'lucide-react';
import { Department, HackathonRole, AvailabilityStatus } from '../types';
import { DEPARTMENTS, HACKATHON_ROLES } from '../data/constants';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDepartment: Department | 'All';
  onDepartmentChange: (dept: Department | 'All') => void;
  selectedRole: HackathonRole | 'All';
  onRoleChange: (role: HackathonRole | 'All') => void;
  selectedAvailability: AvailabilityStatus | 'All';
  onAvailabilityChange: (status: AvailabilityStatus | 'All') => void;
  minScore: number;
  onMinScoreChange: (score: number) => void;
  sortBy: 'compatibility' | 'wins' | 'skills' | 'name';
  onSortByChange: (sort: 'compatibility' | 'wins' | 'skills' | 'name') => void;
  totalResults: number;
  onResetFilters: () => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  selectedRole,
  onRoleChange,
  selectedAvailability,
  onAvailabilityChange,
  minScore,
  onMinScoreChange,
  sortBy,
  onSortByChange,
  totalResults,
  onResetFilters,
}) => {
  const isFiltered =
    searchQuery.trim() !== '' ||
    selectedDepartment !== 'All' ||
    selectedRole !== 'All' ||
    selectedAvailability !== 'All' ||
    minScore > 0;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur-md space-y-4">
      {/* Top row: Search Bar and Quick Sort */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by student name, skills (e.g. React, PyTorch, Figma), role, or bio..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sort:
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-xs font-medium rounded-xl px-3 py-2.5 focus:border-indigo-500 focus:outline-none"
          >
            <option value="compatibility">Compatibility (Highest First)</option>
            <option value="wins">Most Hackathons Won</option>
            <option value="skills">Most Skills Count</option>
            <option value="name">Student Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Filter Row: Department, Role, Availability, Min Score */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80">
        {/* Department Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
            Department
          </label>
          <select
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:border-indigo-500 focus:outline-none"
          >
            <option value="All">All Departments</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Preferred Role Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
            Preferred Hackathon Role
          </label>
          <select
            value={selectedRole}
            onChange={(e) => onRoleChange(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:border-indigo-500 focus:outline-none"
          >
            <option value="All">All Roles</option>
            {HACKATHON_ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Availability Status */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
            Availability
          </label>
          <select
            value={selectedAvailability}
            onChange={(e) => onAvailabilityChange(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:border-indigo-500 focus:outline-none"
          >
            <option value="All">All Availability</option>
            <option value="Actively Looking">Actively Looking (Ready)</option>
            <option value="Open to Invites">Open to Invites</option>
            <option value="Team Formed">Team Formed</option>
          </select>
        </div>

        {/* Min Compatibility Score */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              Min Compatibility
            </span>
            <span className="text-indigo-400 font-bold">{minScore > 0 ? `${minScore}%+` : 'Any'}</span>
          </label>
          <div className="flex items-center gap-1.5 pt-0.5">
            {[0, 60, 75, 85].map((score) => (
              <button
                key={score}
                type="button"
                onClick={() => onMinScoreChange(score)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  minScore === score
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {score === 0 ? 'All' : `${score}%+`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Stats & Reset */}
      <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-indigo-400" />
          <span>
            Found <strong className="text-white">{totalResults}</strong> candidate{totalResults === 1 ? '' : 's'}
          </span>
        </div>

        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
          >
            <X className="w-3 h-3" />
            Reset all filters
          </button>
        )}
      </div>
    </div>
  );
};
