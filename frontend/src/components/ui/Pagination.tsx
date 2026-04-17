import { Button } from './Button';

interface PaginationProps {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  showLimit?: boolean;
}

export function Pagination({
  total,
  page,
  limit,
  totalPages,
  onPageChange,
  onLimitChange,
  showLimit = true,
}: PaginationProps) {
  if (total === 0) return null;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-2 w-full">
      {/* Info & Limit */}
      <div className="flex flex-col sm:flex-row items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
        {showLimit && onLimitChange && (
          <div className="flex items-center gap-2">
            <span>Rows:</span>
            <select 
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="bg-gray-100 dark:bg-gray-800 border-none rounded-lg px-2 py-1 text-[10px] font-black text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer outline-none"
            >
              {[10, 25, 50, 100].map(val => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          Showing <span className="text-gray-900 dark:text-white font-mono">{(page - 1) * limit + 1}</span> 
          to <span className="text-gray-900 dark:text-white font-mono">{Math.min(page * limit, total)}</span> 
          of <span className="text-gray-900 dark:text-white font-mono">{total}</span>
        </div>
      </div>
      
      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="!px-3 font-black text-[10px] tracking-widest"
        >
          PREV
        </Button>
        
        <div className="flex items-center gap-1.5">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum = i + 1;
            if (totalPages > 5) {
              if (page > 3) pageNum = page - 2 + i;
              if (page > totalPages - 2) pageNum = totalPages - 4 + i;
            }
            if (pageNum <= 0 || pageNum > totalPages) return null;
            
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-9 h-9 rounded-xl text-[10px] font-black transition-all ${
                  page === pageNum
                    ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110'
                    : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <Button
          variant="secondary"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="!px-3 font-black text-[10px] tracking-widest"
        >
          NEXT
        </Button>
      </div>
    </div>
  );
}
