import { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'success' | 'warning' | 'danger' | 'secondary';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const colorMap = {
  primary: 'bg-primary hover:bg-primary-light dark:shadow-primary/20 text-white',
  success: 'bg-success hover:bg-success-light dark:shadow-success/20 text-white',
  warning: 'bg-warning hover:bg-warning-light dark:shadow-warning/20 text-white',
  danger: 'bg-danger hover:bg-danger-light dark:shadow-danger/20 text-white',
  secondary: 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100',
};

const sizeMap = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-2xl',
};

export function Button({ 
  variant = 'primary', 
  size = 'md',
  fullWidth, 
  className = '', 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyle = 'relative font-bold transition-all active:top-[2px] active:shadow-none shadow-sm flex items-center justify-center gap-2 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:active:top-0';
  const widthStyle = fullWidth ? 'w-full' : '';
  
  return (
    <button 
      className={`${baseStyle} ${colorMap[variant]} ${sizeMap[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
