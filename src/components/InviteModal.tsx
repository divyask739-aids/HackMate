import React, { useState } from 'react';
import { X, Send, Sparkles, UserCheck } from 'lucide-react';
import { Student, TeamRequirement, HackathonRole } from '../types';

interface InviteModalProps {
  student: Student | null;
  requirement: TeamRequirement;
  onSendInvite: (student: Student, role: HackathonRole, message: string) => void;
  onClose: () => void;
}

export const InviteModal: React.FC<InviteModalProps> = ({
  student,
  requirement,
  onSendInvite,
  onClose,
}) => {
  if (!student) return null;

  // Default to student's primary role if in required roles, or the first open role
  const defaultRole = requirement.requiredRoles.includes(student.primaryRole)
    ? student.primaryRole
    : requirement.requiredRoles[0] || student.primaryRole;

  const [selectedRole, setSelectedRole] = useState<HackathonRole>(defaultRole);
  const [customMessage, setCustomMessage] = useState(
    `Hey ${student.name.split(' ')[0]}! We saw your profile and impressive skills in ${student.skills.slice(0, 3).join(', ')}. We'd love for you to join ${requirement.teamName} for ${requirement.hackathonName} as our ${defaultRole}!`
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendInvite(student, selectedRole, customMessage);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full shadow-2xl relative text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900/95 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-white text-base">Send Team Invitation</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Candidate Summary */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500/30"
            />
            <div>
              <h4 className="font-bold text-white text-sm">{student.name}</h4>
              <p className="text-xs text-slate-400">
                {student.department} • {student.year}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Role to Invite For */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Role to Offer Candidate
            </label>
            <select
              value={selectedRole}
              onChange={(e) => {
                const newRole = e.target.value as HackathonRole;
                setSelectedRole(newRole);
                setCustomMessage(
                  `Hey ${student.name.split(' ')[0]}! We saw your profile and skills in ${student.skills.slice(0, 3).join(', ')}. We'd love for you to join ${requirement.teamName} for ${requirement.hackathonName} as our ${newRole}!`
                );
              }}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:border-indigo-500 focus:outline-none"
            >
              {requirement.requiredRoles.map((role) => (
                <option key={role} value={role}>
                  {role} (Open Position)
                </option>
              ))}
              {!requirement.requiredRoles.includes(student.primaryRole) && (
                <option value={student.primaryRole}>
                  {student.primaryRole} (Candidate Specialization)
                </option>
              )}
            </select>
          </div>

          {/* Invitation Message */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Personal Pitch / Invitation Note</span>
              <span className="text-[10px] text-slate-500">Customizable</span>
            </label>
            <textarea
              rows={4}
              required
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none leading-relaxed"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Connection Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
