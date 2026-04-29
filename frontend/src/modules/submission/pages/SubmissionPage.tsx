import { useState, useMemo } from 'react';
import { useSubmissionSearch } from '../hooks/useSubmissions';
import type { Submission } from '../types';
import { Card, Button, Badge, PageSkeleton, CardGridSkeleton, TableSkeleton, DataTable, Column, SearchToolbar, Pagination } from '@/components/ui';
import { ErrorState, EmptyState } from '@/components/feedback';

export default function SubmissionPage() {
  // Filters & Pagination State
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  // Data Fetching
  const { data: response, isLoading, isFetching, isError } = useSubmissionSearch({ search, page, limit });
  
  // UI State
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');

  const submissions = (response?.data as any as Submission[]) ?? [];
  const meta = response?.meta;

  const columns = useMemo<Column<Submission>[]>(() => [
    {
      header: 'SCHOLAR',
      accessor: (s) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 text-primary border border-primary/20 rounded-lg flex items-center justify-center text-lg font-black">
             {s.student?.name?.charAt(0) ?? 'S'}
          </div>
          <span className="font-black text-gray-800 dark:text-gray-100 uppercase tracking-tight">{s.student?.name}</span>
        </div>
      ),
    },
    {
      header: 'ACTIVITY',
      accessor: (s) => (
        <Badge variant="primary">
          {s.activity?.title ?? 'QUEST'}
        </Badge>
      ),
    },
    {
      header: 'SCORE',
      accessor: (s) => (
        s.score != null ? (
          <span className={`font-black ${s.score >= 70 ? 'text-success' : 'text-danger'}`}>{s.score} PTS</span>
        ) : (
          <span className="text-xs font-black text-gray-300 uppercase italic">PENDING</span>
        )
      ),
    },
    {
      header: 'ACTIONS',
      align: 'right',
      accessor: (s) => (
        <div className="flex justify-end gap-2">
           <Button variant="secondary" size="sm">VIEW</Button>
           {s.score == null && <Button variant="primary" size="sm">GRADE</Button>}
        </div>
      ),
    },
  ], []);

  if (isLoading && !response) {
    return <PageSkeleton viewMode={viewMode} />;
  }

  if (isError) return <ErrorState />;

  return (
    <div className="space-y-10 animate-fade-in-up">
      {/* Header Section with Animated Dot */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">SUBMISSIONS 📤</h2>
          <p className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-[0.2em] flex items-center gap-3">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
            {meta?.total ?? 0} Collected Artifacts
          </p>
        </div>
      </div>

      {/* Unified Search Toolbar */}
      <SearchToolbar 
        search={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        placeholder="Search submissions by status or content..."
      />

      {/* Main Content Area */}
      {isFetching ? (
        viewMode === 'card' ? <CardGridSkeleton count={limit} /> : <TableSkeleton />
      ) : submissions.length === 0 ? (
        <EmptyState message="Inbox is clear! No submissions found." emoji="📬" />
      ) : (
        <div className="space-y-10">
          {viewMode === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
              {submissions.map((s: Submission) => (
                <Card key={s.id} noPadding className="group overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-500 rounded-[20px] bg-white dark:bg-dark-card">
                  <div className={`h-24 bg-gray-50 dark:bg-dark-bg/50 flex items-center px-8 gap-4 border-b border-gray-100 dark:border-gray-800`}>
                    <div className="w-12 h-12 bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-center text-xl group-hover:-translate-y-1 transition-transform">
                      {s.url ? '🔗' : '📄'}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h3 className="text-lg font-black text-gray-800 dark:text-gray-100 tracking-tight truncate uppercase leading-none">{s.activity?.title ?? 'QUEST'}</h3>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Activity</p>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 bg-warning text-white rounded-xl shadow-md flex items-center justify-center text-xl font-black">
                        {s.student?.name?.charAt(0) ?? 'S'}
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-800 dark:text-gray-100 uppercase leading-none">{s.student?.name ?? 'Anonymous'}</p>
                        <p className="text-[10px] font-black text-gray-400 mt-1 uppercase italic tracking-widest leading-none">Scholar</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-5 bg-gray-50 dark:bg-dark-bg/20 rounded-xl border border-gray-100 dark:border-gray-800 group-hover:border-primary/20 transition-colors">
                        {s.url ? (
                          <a href={s.url} target="_blank" rel="noreferrer" className="text-primary font-black text-xs uppercase italic flex items-center gap-2 hover:underline">
                            View File ↗️
                          </a>
                        ) : (
                          <p className="text-gray-600 dark:text-gray-300 text-sm font-bold line-clamp-3 leading-relaxed">{s.content ?? 'No content provided.'}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Score Awarded</p>
                          {s.score != null ? (
                            <span className={`text-xl font-black ${s.score >= 70 ? 'text-success' : 'text-danger'} leading-none`}>{s.score} PTS</span>
                          ) : (
                            <span className="text-sm font-black text-gray-300 uppercase italic leading-none">Pending...</span>
                          )}
                        </div>
                        {s.score == null && (
                          <Button variant="primary" size="sm">
                            GRADE
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <DataTable 
              data={submissions} 
              columns={columns} 
              emptyMessage="No submissions found!"
            />
          )}

          {/* Unified Pagination bottom */}
          {meta && (
            <div className="py-8 border-t border-gray-100 dark:border-gray-800">
               <Pagination 
                total={meta.total}
                page={meta.page}
                limit={meta.limit}
                totalPages={meta.totalPages}
                onPageChange={(p) => setPage(p)}
                onLimitChange={(l) => {
                  setLimit(l);
                  setPage(1);
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
