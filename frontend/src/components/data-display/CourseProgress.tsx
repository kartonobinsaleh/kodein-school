interface CourseProgressProps {
  title: string;
  progress: number;
  color: 'primary' | 'success' | 'warning' | 'danger';
}

export function CourseProgress({ title, progress, color }: CourseProgressProps) {
  const colorMap = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
  };

  return (
    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-transparent hover:border-gray-200 dark:hover:border-dark-border transition-all flex items-center gap-4">
      <div className={`w-12 h-12 ${colorMap[color]} rounded-xl flex items-center justify-center text-white text-xl font-black shadow-md`}>
        {title[0]}
      </div>
      <div className="flex-1">
        <div className="text-sm font-black text-gray-700 dark:text-gray-200 uppercase">{title}</div>
        <div className="flex items-center gap-3 mt-1">
          <div className="h-2 flex-1 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
            <div className={`h-full ${colorMap[color]}`} style={{ width: `${progress}%` }} />
          </div>
          <span className="text-sm font-black text-gray-400">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
