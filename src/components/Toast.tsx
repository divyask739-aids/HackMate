import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message?: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-400 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-500/40 bg-slate-900/95 text-slate-100',
    info: 'border-indigo-500/40 bg-slate-900/95 text-slate-100',
    warning: 'border-amber-500/40 bg-slate-900/95 text-slate-100',
  };

  return (
    <div
      className={`pointer-events-auto flex items-start justify-between gap-3 p-4 rounded-2xl border shadow-2xl backdrop-blur-md animate-slide-up ${borders[toast.type]}`}
    >
      <div className="flex items-start gap-3">
        {icons[toast.type]}
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-white">{toast.title}</h4>
          {toast.message && <p className="text-xs text-slate-400 mt-0.5">{toast.message}</p>}
        </div>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-slate-500 hover:text-slate-300 p-1"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
