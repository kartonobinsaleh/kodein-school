import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

export function Card({ className = '', children, noPadding, ...props }: CardProps) {
  const paddingClass = noPadding ? 'p-0' : 'p-6';
  return (
    <div 
      className={`bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-100 dark:border-dark-border transition-all hover:-translate-y-1 hover:shadow-md ${paddingClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
