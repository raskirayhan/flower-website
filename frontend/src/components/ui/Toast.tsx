import React from 'react';
import { cn } from '../../lib/utils.js';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  isVisible,
  onClose,
}) => {
  if (!isVisible) return null;

  const bgStyles = {
    success: 'bg-[#2D6A4F] text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div
        className={cn(
          'flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium',
          bgStyles[type]
        )}
      >
        <span>{message}</span>
        <button onClick={onClose} className="opacity-75 hover:opacity-100">
          ✕
        </button>
      </div>
    </div>
  );
};
