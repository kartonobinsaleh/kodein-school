import { useState, useMemo } from 'react';
import { useGradeSearch } from '../hooks/useGrades';
import type { Grade } from '../types';
import { Card, Button, Badge, PageSkeleton, CardGridSkeleton, TableSkeleton, DataTable, Column, SearchToolbar, Pagination } from '@/components/ui';
import { ErrorState, EmptyState } from '@/components/feedback';

function getPredicate(score: number): { label: string; css: 'success' | 'primary' | 'warning' | 'danger'; emoji: string } {
  if (score >= 90) return { label: 'RANK A', css: 'success', emoji: '🏆' };
  if (score >= 80) return { label: 'RANK B', css: 'primary', emoji: '🌟' };
  if (score >= 70) return { label: 'RANK C', css: 'warning', emoji: '🔥' };
  return { label: 'RANK D', css: 'danger', emoji: '💪' };
}

export default function GradePage() {
  // Filters & Pagination State
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  // Data Fetching
  const { data: response, isLoading, isFetching, isError } = useGradeSearch({ search, page, limit });
  
  // UI State
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');

  const grades = (response?.data as any as Grade[]) ?? [];
  const meta = response?.meta;

  const columns = useMemo<Column<Grade>[]>(() => [
    {
      header: 'STUDENT',
      accessor: (g) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-lg">👨‍🎓</div>
          <span className="font-black text-gray-800 dark:text-gray-100 uppercase tracking-tight">{g.student?.name}</span>
        </div>
      ),
    },
    {
      header: 'SUBJECT',
      accessor: (g) => <Badge variant="default">{g.subject?.name ?? 'Course'}</Badge>,
    },
    {
      header: 'SCORE',
      accessor: (g) => {
        const pred = getPredicate(g.finalScore);
        return (
          <div className="flex items-center gap-2">
            <span className={`font-black text-lg ${pred.css === 'success' ? 'text-success' : pred.css === 'danger' ? 'text-danger' : 'text-gray-900 dark:text-gray-100'}`}>
              {g.finalScore}
            </span>
            <Badge variant={pred.css}>{pred.label}</Badge>
          </div>
        );
      },
    },
    {
      header: 'ACTIONS',
      align: 'right',
      accessor: () => (
        <div className="flex justify-end gap-2">
          <button className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">✏️</button>
        </div>
      ),
    },
  ], []);

  if (isLoading && !response) {
    return <PageSkeleton viewMode={viewMode} />;
  }

  if (isError) return <ErrorState message="The scoreboard is offline!" />;

  return (
    <div className="space-y-10 animate-fade-in-up">
      {/* Header Section with Animated Dot */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">HALL OF FAME 🎯</h2>
          <p className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-[0.2em] flex items-center gap-3">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            {meta?.total ?? 0} Mastered Records Logged
          </p>
        </div>
        <Button variant="danger" className="h-[54px] !px-8 shadow-lg shadow-danger/20">
          + INPUT NEW RECORDS
        </Button>
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
        placeholder="Search grades by comment or student..."
      />

      {/* Main Content Area */}
      {isFetching ? (
        viewMode === 'card' ? <CardGridSkeleton count={limit} /> : <TableSkeleton />
      ) : grades.length === 0 ? (
        <EmptyState message="Stadium is empty! No grades found." emoji="🏟️" />
      ) : (
        <div className="space-y-10">
          {viewMode === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
              {grades.map((g: Grade) => {
                const pred = getPredicate(g.finalScore);
                return (
                  <Card key={g.id} className="flex flex-col items-center text-center p-8 group hover:-translate-y-2 transition-all duration-500 rounded-[24px] border border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-card shadow-sm hover:shadow-2xl">
                    <div className={`w-24 h-24 bg-${pred.css} rounded-2xl flex items-center justify-center text-4xl text-white shadow-xl mb-6 group-hover:rotate-6 transition-transform duration-500`}>
                      {pred.emoji}
                    </div>
                    
                    <div className="mb-4">
                      <Badge variant={pred.css}>
                        {pred.label}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-black text-gray-800 dark:text-gray-100 tracking-tight line-clamp-1 uppercase leading-none">{g.student?.name}</h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2 italic leading-none">{g.subject?.name ?? 'Course'}</p>

                    <div className="mt-8 flex items-baseline gap-1">
                      <span className="text-2xl font-black text-gray-900 dark:text-gray-100 leading-none">{g.finalScore}</span>
                      <span className="text-sm font-black text-gray-400 leading-none">/ 100</span>
                    </div>

                    <div className="mt-8 w-full h-2.5 bg-gray-100 dark:bg-dark-bg/50 rounded-full overflow-hidden">
                      <div className={`h-full bg-${pred.css} shadow-inner transition-all duration-1000`} style={{ width: `${g.finalScore}%` }} />
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <DataTable 
              data={grades} 
              columns={columns} 
              emptyMessage="No grades found!"
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
