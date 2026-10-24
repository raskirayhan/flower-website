import React from 'react';
import { cn } from '../../lib/utils.js';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'neutral' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'primary',
  children,
  ...props
}) => {
  const variants = {
    primary: 'bg-orange-100 text-[#E95A08] dark:bg-orange-950/40 dark:text-orange-400',
    success: 'bg-emerald-100 text-[#2D6A4F] dark:bg-emerald-950/40 dark:text-emerald-400',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400',
    neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    outline: 'border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
