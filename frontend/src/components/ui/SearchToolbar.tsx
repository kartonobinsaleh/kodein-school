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
    <Card className={`!p-2 border-none shadow-lg bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-800 rounded-[22px] ${className}`}>
      <div className="flex flex-col md:flex-row md:items-stretch justify-between gap-3">
        {/* Search Field Area - Spacing Improved */}
        <div className="flex items-center flex-1 group bg-gray-50/30 dark:bg-black/10 rounded-[16px] border border-transparent focus-within:border-primary/20 transition-all duration-300">
          <span className="text-xl text-gray-300 ml-6 mr-4 group-focus-within:text-primary transition-all duration-300">🔍</span>
          <Input 
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={placeholder}
            className="border-none bg-transparent !py-3.5 !px-3 h-auto focus:ring-0 shadow-none text-base font-bold placeholder:text-gray-300"
          />
        </div>
        
        {/* View Selection Toggle Area */}
        <div className="flex bg-gray-100/50 dark:bg-black/30 p-1.5 rounded-[18px] border border-gray-100/50 dark:border-gray-800/50 shadow-inner min-w-[260px]">
          <button
            onClick={() => onViewModeChange('card')}
            className={`flex-1 rounded-[14px] text-[10px] font-black tracking-widest transition-all duration-200 flex items-center justify-center gap-2.5 uppercase border-2 ${
              viewMode === 'card' 
                ? 'bg-white dark:bg-primary/20 border-white dark:border-primary/40 text-primary shadow-md shadow-gray-200/50 dark:shadow-none' 
                : 'bg-transparent border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
             🎴 Card
          </button>
          <button
            onClick={() => onViewModeChange('table')}
            className={`flex-1 rounded-[14px] text-[10px] font-black tracking-widest transition-all duration-200 flex items-center justify-center gap-2.5 uppercase border-2 ${
              viewMode === 'table' 
                ? 'bg-white dark:bg-primary/20 border-white dark:border-primary/40 text-primary shadow-md shadow-gray-200/50 dark:shadow-none' 
                : 'bg-transparent border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
             📋 Table
          </button>
        </div>
      </div>
    </Card>
  );
}
