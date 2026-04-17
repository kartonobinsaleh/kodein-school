import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2 ml-1">{label}</label>}
      <input
        className={`w-full px-5 py-4 rounded-xl border-2 transition-all font-bold text-gray-700 dark:text-gray-200 dark:bg-dark-bg placeholder:text-gray-400 focus:outline-none ${error ? 'border-danger focus:border-danger' : 'border-gray-200 dark:border-dark-border focus:border-primary'
          } ${className}`}
        {...props}
      />
    </div>
  );
}
