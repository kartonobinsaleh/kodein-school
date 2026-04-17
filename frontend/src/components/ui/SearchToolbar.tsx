import { Card, Input } from '@/components/ui';

type ViewMode = 'card' | 'table';

interface SearchToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  placeholder?: string;
  className?: string;
}

export function SearchToolbar({
  search,
  onSearchChange,
  viewMode,
  onViewModeChange,
  placeholder = "Search...",
  className = ""
}: SearchToolbarProps) {
  return (
    <Card className={`!p-1.5 border-none shadow-lg bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-800 rounded-[20px] ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Field */}
        <div className="flex items-center flex-1 pr-4 group">
          <span className="text-xl text-gray-300 mx-4 group-focus-within:text-primary transition-all duration-300">🔍</span>
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={placeholder}
            className="border-none bg-transparent !py-3 !px-4 h-auto focus:ring-0 shadow-none text-base font-bold placeholder:text-gray-300"
          />
        </div>

        {/* View Selection Toggle */}
        <div className="flex bg-gray-50 dark:bg-black/20 p-1 rounded-[16px] border border-gray-100 dark:border-gray-800 shadow-inner mr-1 md:mr-1 mb-1 md:mb-0">
          <button
            onClick={() => onViewModeChange('card')}
            className={`px-6 py-3 rounded-[12px] text-[10px] font-black tracking-widest transition-all duration-300 flex items-center gap-2 uppercase ${viewMode === 'card'
                ? 'bg-white dark:bg-primary/20 dark:border dark:border-primary/30 text-primary shadow-sm'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
          >
            🎴 Card
          </button>
          <button
            onClick={() => onViewModeChange('table')}
            className={`px-6 py-3 rounded-[12px] text-[10px] font-black tracking-widest transition-all duration-300 flex items-center gap-2 uppercase ${viewMode === 'table'
                ? 'bg-white dark:bg-primary/20 dark:border dark:border-primary/30 text-primary shadow-sm'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
          >
            📋 Table
          </button>
        </div>
      </div>
    </Card>
  );
}
