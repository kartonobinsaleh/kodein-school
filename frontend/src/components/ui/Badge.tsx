import { HTMLAttributes } from 'react';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'default';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const colorMap = {
  primary: 'bg-primary/10 text-primary dark:text-primary-light border-primary/20',
  success: 'bg-success/10 text-success dark:text-success-light border-success/20',
  warning: 'bg-warning/10 text-warning dark:text-warning-light border-warning/20',
  danger: 'bg-danger/10 text-danger dark:text-danger-light border-danger/20',
  default: 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
};

export function Badge({ variant = 'default', className = '', children, ...props }: BadgeProps) {
  return (
    <span 
      className={`px-3 py-1 rounded-xl text-sm font-bold uppercase tracking-wider border ${colorMap[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
