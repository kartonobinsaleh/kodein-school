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

export function PageHeaderSkeleton() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="space-y-1">
        <Skeleton variant="rounded" className="h-7 w-64" />
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" className="w-2 h-2" />
          <Skeleton variant="rounded" className="h-4 w-40 opacity-50" />
        </div>
      </div>
      <Skeleton variant="rounded" className="h-[54px] w-48 shadow-lg" />
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number, cols?: number }) {
  return (
    <div className="w-full bg-white dark:bg-dark-card rounded-[24px] border border-gray-100 dark:border-dark-border overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-dark-border bg-gray-50/50 dark:bg-gray-800/30">
        <div className="flex gap-4">
          {[...Array(cols)].map((_, i) => (
            <Skeleton key={i} variant="rounded" className="h-6 flex-1 opacity-70" />
          ))}
        </div>
      </div>
      <div className="p-6 space-y-8">
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="flex gap-4 items-center">
            {[...Array(cols)].map((_, j) => (
              <Skeleton key={j} variant="text" className="h-8 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-dark-card p-6 rounded-[24px] space-y-6 border border-gray-100 dark:border-dark-border shadow-sm">
          <Skeleton variant="rounded" className="h-32 w-full" />
          <div className="space-y-3">
            <Skeleton variant="text" className="h-6 w-3/4" />
            <Skeleton variant="text" className="h-4 w-1/2 opacity-50" />
          </div>
          <div className="pt-4 flex justify-between items-center border-t border-gray-50 dark:border-gray-800">
            <Skeleton variant="rounded" className="h-8 w-24" />
            <div className="flex gap-2">
              <Skeleton variant="circular" className="w-8 h-8" />
              <Skeleton variant="circular" className="w-8 h-8" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PageSkeleton({ viewMode = 'card' }: { viewMode?: 'card' | 'table' }) {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <PageHeaderSkeleton />
      
      {/* Search Toolbar Skeleton */}
      <div className="bg-white dark:bg-dark-card p-4 rounded-[20px] border border-gray-100 dark:border-dark-border flex flex-col md:flex-row gap-4">
        <Skeleton variant="rounded" className="h-12 flex-1" />
        <div className="flex gap-2">
          <Skeleton variant="rounded" className="h-12 w-32" />
          <Skeleton variant="rounded" className="h-12 w-32" />
        </div>
      </div>

      {viewMode === 'card' ? (
        <CardGridSkeleton count={8} />
      ) : (
        <TableSkeleton />
      )}
    </div>
  );
}
