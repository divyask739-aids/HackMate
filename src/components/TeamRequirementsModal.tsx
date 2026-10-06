import React, { useState } from 'react';
import { X, Sparkles, Plus, Check, SlidersHorizontal, BookOpen } from 'lucide-react';
import { TeamRequirement, HackathonRole, Department, WorkSchedule } from '../types';
import { HACKATHON_ROLES, DEPARTMENTS, SKILL_CATEGORIES, WORK_SCHEDULES, DEMO_PRESETS } from '../data/constants';

interface TeamRequirementsModalProps {
  currentRequirement: TeamRequirement;
  onSave: (req: TeamRequirement) => void;
  onClose: () => void;
}

export const TeamRequirementsModal: React.FC<TeamRequirementsModalProps> = ({
  currentRequirement,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<TeamRequirement>({ ...currentRequirement });
  const [customSkillInput, setCustomSkillInput] = useState('');

  const toggleRole = (role: HackathonRole) => {
    setFormData((prev) => {
      const exists = prev.requiredRoles.includes(role);
      const updated = exists
        ? prev.requiredRoles.filter((r) => r !== role)
        : [...prev.requiredRoles, role];
      return { ...prev, requiredRoles: updated };
    });
  };

  const toggleSkill = (skill: string) => {
    setFormData((prev) => {
      const exists = prev.requiredSkills.includes(skill);
      const updated = exists
        ? prev.requiredSkills.filter((s) => s !== skill)
        : [...prev.requiredSkills, skill];
      return { ...prev, requiredSkills: updated };
    });
  };

  const addCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customSkillInput.trim();
    if (trimmed && !formData.requiredSkills.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, trimmed],
      }));
      setCustomSkillInput('');
    }
  };

  const toggleDepartment = (dept: Department) => {
    setFormData((prev) => {
      const list = prev.preferredDepartments || [];
      const exists = list.includes(dept);
      const updated = exists ? list.filter((d) => d !== dept) : [...list, dept];
      return { ...prev, preferredDepartments: updated };
    });
  };

  const applyPreset = (preset: typeof DEMO_PRESETS[0]) => {
    setFormData({
      teamName: preset.teamName,
      hackathonName: preset.hackathonName,
      description: preset.description,
      targetSize: preset.targetSize,
      requiredRoles: [...preset.requiredRoles],
      requiredSkills: [...preset.requiredSkills],
      preferredDepartments: [...preset.preferredDepartments],
      minHoursPerWeek: preset.minHoursPerWeek,
      workSchedulePreference: preset.workSchedulePreference,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <SlidersHorizontal className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Hackathon Team Requirements</h2>
              <p className="text-xs text-slate-400">
                Update open roles & skill criteria to re-score candidate compatibility in real-time
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

        {/* Demo Presentation Presets Bar */}
        <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-indigo-950/40">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Quick Presentation Presets (Click to switch team context)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {DEMO_PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => applyPreset(preset)}
                className="text-left p-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 transition-all text-xs cursor-pointer group"
              >
                <div className="font-semibold text-slate-200 group-hover:text-indigo-300 truncate">
                  {preset.name}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                  {preset.hackathonName}
                </div>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6">
          {/* Basic Details: Hackathon & Team Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Hackathon Name
              </label>
              <input
                type="text"
                required
                value={formData.hackathonName}
                onChange={(e) => setFormData({ ...formData, hackathonName: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-sm text-white focus:outline-none"
                placeholder="e.g. Smart India Hackathon 2026"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Team Name
              </label>
              <input
                type="text"
                required
                value={formData.teamName}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-sm text-white focus:outline-none"
                placeholder="e.g. CodeCatalysts"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Project Description / Problem Statement
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none"
              placeholder="Briefly describe what your team is building for the hackathon..."
            />
          </div>

          {/* Open Roles Needed (Multi-select) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">
                Open Roles Needed <span className="text-indigo-400 font-normal">(Affects 25% Role Match)</span>
              </label>
              <span className="text-[11px] text-slate-400">
                {formData.requiredRoles.length} selected
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {HACKATHON_ROLES.map((role) => {
                const isSelected = formData.requiredRoles.includes(role);
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => toggleRole(role)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/25'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    {role}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Required Skills Selection (Affects 40% Skills Match) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">
                Required Technical & Design Skills <span className="text-indigo-400 font-normal">(Affects 40% Skills Match)</span>
              </label>
              <span className="text-[11px] text-slate-400">
                {formData.requiredSkills.length} required
              </span>
            </div>

            {/* Currently Selected Skills chips */}
            {formData.requiredSkills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-slate-950 border border-indigo-950/60 mb-3">
                {formData.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-medium inline-flex items-center gap-1.5"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Custom Skill Input */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                placeholder="Add custom skill (e.g. OpenCV, Solidity, Three.js)..."
                className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={addCustomSkill}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>

            {/* Skill categories pills */}
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.category} className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    {cat.category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => {
                      const isSelected = formData.requiredSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`px-2 py-0.5 rounded-md text-[11px] font-medium border transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-500'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {isSelected && '✓ '}
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preferred Departments (Affects 15% Dept Match) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">
                Target / Preferred Departments <span className="text-indigo-400 font-normal">(Affects 15% Dept Match)</span>
              </label>
              <span className="text-[11px] text-slate-400">
                {(formData.preferredDepartments || []).length === 0 ? 'Open to Any' : `${formData.preferredDepartments?.length} selected`}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {DEPARTMENTS.map((dept) => {
                const isSelected = (formData.preferredDepartments || []).includes(dept);
                return (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => toggleDepartment(dept)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-teal-600 text-white border-teal-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {isSelected && '✓ '}
                    {dept}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Availability & Commitment preferences */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Minimum Hours Commitment ({formData.minHoursPerWeek} hrs/week)
              </label>
              <input
                type="range"
                min={10}
                max={40}
                step={5}
                value={formData.minHoursPerWeek}
                onChange={(e) => setFormData({ ...formData, minHoursPerWeek: Number(e.target.value) })}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>10 hrs (Part-time)</span>
                <span>25 hrs (Typical)</span>
                <span>40 hrs (All-nighter)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Preferred Work Schedule
              </label>
              <select
                value={formData.workSchedulePreference || 'Night Owl (All-Nighter)'}
                onChange={(e) => setFormData({ ...formData, workSchedulePreference: e.target.value as WorkSchedule })}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:border-indigo-500 focus:outline-none"
              >
                {WORK_SCHEDULES.map((schedule) => (
                  <option key={schedule} value={schedule}>
                    {schedule}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-md pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              Save & Recalculate Compatibility
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
