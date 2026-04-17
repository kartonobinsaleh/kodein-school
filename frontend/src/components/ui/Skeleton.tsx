import { HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
}

export function Skeleton({ 
  variant = 'rectangular', 
  className = '', 
  ...props 
}: SkeletonProps) {
  const baseClass = 'animate-pulse bg-gray-200 dark:bg-gray-800';
  
  const variantClasses = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-xl',
  };

  return (
    <div 
      className={`${baseClass} ${variantClasses[variant]} ${className}`} 
      {...props} 
    />
  );
}

export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number, cols?: number }) {
  return (
    <div className="w-full space-y-4">
      <div className="flex gap-4 mb-4">
        {[...Array(cols)].map((_, i) => (
          <Skeleton key={i} variant="rounded" className="h-10 flex-1" />
        ))}
      </div>
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex gap-4">
          {[...Array(cols)].map((_, j) => (
            <Skeleton key={j} variant="text" className="h-8 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-dark-card p-6 rounded-xl space-y-4 border border-gray-100 dark:border-dark-border">
          <Skeleton variant="circular" className="w-12 h-12" />
          <Skeleton variant="text" className="h-6 w-3/4" />
          <Skeleton variant="text" className="h-4 w-1/2" />
          <div className="pt-4 flex justify-between">
            <Skeleton variant="rounded" className="h-8 w-20" />
            <Skeleton variant="circular" className="w-8 h-8" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-10 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton variant="rounded" className="h-8 w-64" />
          <Skeleton variant="rounded" className="h-4 w-40 opacity-50" />
        </div>
        <Skeleton variant="rounded" className="h-12 w-48" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} variant="rounded" className="h-32" />
        ))}
      </div>
      <div className="space-y-6">
        <Skeleton variant="rounded" className="h-64" />
      </div>
    </div>
  );
}
