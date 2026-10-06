import React, { useState } from 'react';
import { User, Plus, X, Check, Save, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { Student, Department, HackathonRole, AvailabilityStatus, WorkSchedule } from '../types';
import { DEPARTMENTS, HACKATHON_ROLES, SKILL_CATEGORIES, WORK_SCHEDULES } from '../data/constants';

interface StudentProfileFormProps {
  currentProfile: Student;
  onSaveProfile: (profile: Student) => void;
  onAddNewStudent?: (student: Student) => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
];

export const StudentProfileForm: React.FC<StudentProfileFormProps> = ({
  currentProfile,
  onSaveProfile,
  onAddNewStudent,
}) => {
  const [profile, setProfile] = useState<Student>({ ...currentProfile });
  const [customSkill, setCustomSkill] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  React.useEffect(() => {
    setProfile({ ...currentProfile });
  }, [currentProfile]);

  const toggleSkill = (skill: string) => {
    setProfile((prev) => {
      const exists = prev.skills.includes(skill);
      const updated = exists ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill];
      return { ...prev, skills: updated };
    });
  };

  const addCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customSkill.trim();
    if (trimmed && !profile.skills.includes(trimmed)) {
      setProfile((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
      setCustomSkill('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddAsNew = () => {
    if (!profile.name.trim()) {
      alert('Please enter a full name for the candidate.');
      return;
    }
    const newStudent: Student = {
      ...profile,
      id: `stud-${Date.now()}`,
    };
    if (onAddNewStudent) {
      onAddNewStudent(newStudent);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
      // Reset form for next candidate
      setProfile({
        id: `stud-${Date.now() + 1}`,
        name: '',
        avatar: PRESET_AVATARS[Math.floor(Math.random() * PRESET_AVATARS.length)],
        department: 'Computer Science & Engineering',
        year: '1st Year',
        bio: '',
        primaryRole: 'Frontend Developer',
        skills: [],
        availability: 'Actively Looking',
        hoursPerWeek: 20,
        workSchedule: 'Flexible (Anytime)',
        hackathonsAttended: 0,
        hackathonsWon: 0,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-400" />
              Student Hackathon Profile
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Keep your skills, role preference, and availability up to date for teams recruiting you
            </p>
          </div>

          {savedSuccess && (
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 animate-bounce">
              <Check className="w-4 h-4" /> Profile Updated & Saved!
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 pt-6">
          {/* Avatar and Basic Information */}
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="flex flex-col items-center gap-2">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-24 h-24 rounded-2xl object-cover ring-2 ring-indigo-500/50 shadow-lg"
              />
              <span className="text-[10px] text-slate-500 font-medium">Quick Avatar Pick:</span>
              <div className="flex gap-1.5">
                {PRESET_AVATARS.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setProfile({ ...profile, avatar: url })}
                    className={`w-5 h-5 rounded-full overflow-hidden border transition-all ${
                      profile.avatar === url ? 'border-indigo-400 scale-110 ring-1 ring-indigo-400' : 'border-slate-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={url} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-sm text-white focus:outline-none"
                  placeholder="Enter student full name..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Department
                </label>
                <select
                  value={profile.department}
                  onChange={(e) => setProfile({ ...profile, department: e.target.value as Department })}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:border-indigo-500 focus:outline-none"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Year of Study
                </label>
                <select
                  value={profile.year}
                  onChange={(e) => setProfile({ ...profile, year: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Postgrad">Postgraduate / Masters</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Hackathons Won / Podiums
                </label>
                <input
                  type="number"
                  min={0}
                  value={profile.hackathonsWon}
                  onChange={(e) => setProfile({ ...profile, hackathonsWon: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-sm text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Short Bio / Hackathon Pitch
            </label>
            <textarea
              rows={3}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none"
              placeholder="What are your core engineering strengths, past hackathon projects, and what kind of team are you looking for?"
            />
          </div>

          {/* Roles Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Primary Hackathon Role
              </label>
              <select
                value={profile.primaryRole}
                onChange={(e) => setProfile({ ...profile, primaryRole: e.target.value as HackathonRole })}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:border-indigo-500 focus:outline-none"
              >
                {HACKATHON_ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Secondary / Complementary Role (Optional)
              </label>
              <select
                value={profile.secondaryRole || ''}
                onChange={(e) => setProfile({ ...profile, secondaryRole: e.target.value as HackathonRole || undefined })}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:border-indigo-500 focus:outline-none"
              >
                <option value="">None (Single Role Focus)</option>
                {HACKATHON_ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Skills Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">
                Skills & Technologies ({profile.skills.length} selected)
              </label>
            </div>

            {/* Selected Skills Chips */}
            <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-slate-950 border border-indigo-950/60 mb-3">
              {profile.skills.map((skill) => (
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

            {/* Custom Skill Input */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                placeholder="Add custom skill..."
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

            {/* Category Browser */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.category} className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    {cat.category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => {
                      const isSelected = profile.skills.includes(skill);
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

          {/* Availability Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Availability Status
              </label>
              <select
                value={profile.availability}
                onChange={(e) => setProfile({ ...profile, availability: e.target.value as AvailabilityStatus })}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:border-indigo-500 focus:outline-none"
              >
                <option value="Actively Looking">Actively Looking (Available)</option>
                <option value="Open to Invites">Open to Invites</option>
                <option value="Team Formed">Team Formed (Not looking)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Hours Commitment ({profile.hoursPerWeek} hrs/week)
              </label>
              <input
                type="range"
                min={10}
                max={40}
                step={5}
                value={profile.hoursPerWeek}
                onChange={(e) => setProfile({ ...profile, hoursPerWeek: Number(e.target.value) })}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>10 hrs</span>
                <span>25 hrs</span>
                <span>40 hrs (All-nighter)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Work Schedule
              </label>
              <select
                value={profile.workSchedule}
                onChange={(e) => setProfile({ ...profile, workSchedule: e.target.value as WorkSchedule })}
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

          {/* Links & Portfolio */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <GithubIcon className="w-3.5 h-3.5" /> GitHub Profile URL
              </label>
              <input
                type="text"
                value={profile.githubUrl || ''}
                onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none"
                placeholder="https://github.com/..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" /> LinkedIn URL
              </label>
              <input
                type="text"
                value={profile.linkedinUrl || ''}
                onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none"
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" /> Portfolio URL
              </label>
              <input
                type="text"
                value={profile.portfolioUrl || ''}
                onChange={(e) => setProfile({ ...profile, portfolioUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
            <p className="text-[11px] text-slate-500">
              * Fill details and click save to register your student profile in the matching system.
            </p>
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              {onAddNewStudent && (
                <button
                  type="button"
                  onClick={handleAddAsNew}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Add another candidate to the database"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add as Candidate Profile</span>
                </button>
              )}
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
