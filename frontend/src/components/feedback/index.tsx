import { HTMLAttributes } from 'react';

export * from './TopBarProgress';
export * from './ConfirmDialog';

export function LoadingState({ message = 'MIXING THE COLORS...' }: { message?: string }) {
  return (
    <div className="py-20 text-center animate-fade-in-up">
      <div className="text-6xl animate-bounce mb-6">🎨</div>
      <p className="font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{message}</p>
    </div>
  );
}

export function ErrorState({ message = 'THE STADIUM IS OFFLINE!' }: { message?: string }) {
  return (
    <div className="py-20 text-center animate-fade-in-up">
      <div className="text-6xl mb-6">😵</div>
      <p className="font-black text-red-500 uppercase tracking-widest">{message}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-6 text-primary font-black hover:underline uppercase text-sm"
      >
        Try Again?
      </button>
    </div>
  );
}

interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
  emoji?: string;
}

export function EmptyState({ message = 'INBOX IS CLEAR!', emoji = '🏜️', className = '' }: EmptyStateProps) {
  return (
    <div className={`py-20 text-center animate-fade-in-up ${className}`}>
      <div className="text-6xl mb-6">{emoji}</div>
      <p className="font-black text-gray-300 dark:text-gray-600 uppercase tracking-widest text-lg">{message}</p>
    </div>
  );
}
