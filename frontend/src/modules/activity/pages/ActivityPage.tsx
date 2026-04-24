import { useState, useMemo } from 'react';
import { useActivitySearch, useDeleteActivity } from '../hooks/useActivities';
import type { Activity, ActivityType } from '../types';
import { Card, Button, Badge, DataTable, Column, SearchToolbar, Pagination, PageSkeleton, CardGridSkeleton, TableSkeleton } from '@/components/ui';
import { ErrorState, EmptyState, ConfirmDialog } from '@/components/feedback';

const TYPE_CONFIG: Record<ActivityType, { color: 'primary' | 'success' | 'warning' | 'danger', icon: string, label: string }> = {
  ASSIGNMENT: { color: 'primary', icon: '📝', label: 'ASSIGNMENT' },
  PROJECT: { color: 'success', icon: '🎨', label: 'PROJECT' },
  QUIZ: { color: 'warning', icon: '⚡', label: 'QUIZ' },
};

export default function ActivityPage() {
  // Filters & Pagination State
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  // Data Fetching
  const { data: response, isLoading, isFetching, isError } = useActivitySearch({ search, page, limit });
  const { mutate: deleteActivity } = useDeleteActivity();
  
  // UI State
  const [viewMode, setViewMode] = useState<'card' | 'table'>('table');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const activities = (response?.data as any as Activity[]) ?? [];
  const meta = response?.meta;

  const columns = useMemo<Column<Activity>[]>(() => [
    {
      header: 'TYPE',
      accessor: (a) => {
        const config = TYPE_CONFIG[a.type];
        return (
          <div className="flex items-center gap-3 py-1">
            <div className={`w-11 h-11 bg-${config.color} text-white rounded-xl shadow-md flex items-center justify-center text-lg`}>
              {config.icon}
            </div>
            <Badge variant={config.color}>{config.label}</Badge>
          </div>
        );
      },
    },
    {
      header: 'TITLE',
      accessor: (a) => (
        <div>
          <p className="font-black text-gray-800 dark:text-gray-100 uppercase tracking-tight">{a.title}</p>
          <p className="text-xs font-bold text-gray-400 line-clamp-1 italic mt-0.5">{a.description || '---'}</p>
        </div>
      ),
    },
    {
      header: 'COURSE',
      accessor: (a) => (
        <Badge variant="default">
          {a.course?.title ?? 'GENERAL'}
        </Badge>
      ),
    },
    {
      header: 'ACTIONS',
      align: 'right',
      accessor: (a) => (
        <div className="flex justify-end gap-2">
          <button className="w-9 h-9 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">✏️</button>
          <button
            onClick={() => setDeleteId(a.id)}
            className="w-9 h-9 bg-danger/10 text-danger rounded-lg flex items-center justify-center hover:bg-danger hover:text-white transition-all active:scale-90 shadow-sm"
          >
            🗑️
          </button>
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
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">QUEST LOG 📋</h2>
          <p className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-[0.2em] flex items-center gap-3">
            <span className="w-2 h-2 bg-warning rounded-full animate-pulse shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
            {meta?.total ?? 0} Ongoing Quests
          </p>
        </div>
        <Button variant="warning" className="h-[54px] !px-8 shadow-lg shadow-warning/20">
          + CREATE NEW QUEST
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
        placeholder="Search activities by title or description..."
      />

      {/* Content Area */}
      {isFetching ? (
        viewMode === 'card' ? <CardGridSkeleton count={limit} /> : <TableSkeleton />
      ) : activities.length === 0 ? (
        <EmptyState message="Quest log is empty!" emoji="🌱" />
      ) : (
        <div className="space-y-10">
          {viewMode === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
              {activities.map((a: Activity) => {
                const config = TYPE_CONFIG[a.type];
                return (
                  <Card key={a.id} className="group hover:shadow-2xl transition-all duration-500 rounded-[20px] border border-gray-100 dark:border-gray-800">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 bg-${config.color} text-white rounded-2xl shadow-xl flex items-center justify-center text-2xl group-hover:rotate-6 transition-transform`}>
                        {config.icon}
                      </div>
                      <Badge variant={config.color}>{config.label}</Badge>
                    </div>
                    
                    <h3 className="text-lg font-black text-gray-800 dark:text-gray-100 tracking-tight uppercase line-clamp-2 min-h-[3.5rem]">{a.title}</h3>
                    <p className="text-sm font-bold text-gray-400 mt-2 line-clamp-2 min-h-[2.5rem] italic">{a.description || 'No description provided'}</p>

                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                       <Badge variant="default">{a.course?.title ?? 'GENERAL'}</Badge>
                       <div className="flex gap-2">
                        <button className="w-9 h-9 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">✏️</button>
                        <button
                          onClick={() => setDeleteId(a.id)}
                          className="w-9 h-9 bg-danger/10 text-danger rounded-lg flex items-center justify-center hover:bg-danger hover:text-white transition-all active:scale-90 shadow-sm"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <DataTable 
              data={activities} 
              columns={columns} 
              emptyMessage="No activities found!"
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

      {/* Confirmation System */}
      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) deleteActivity(deleteId);
          setDeleteId(null);
        }}
        title="END QUEST?"
        description="Are you sure you want to remove this activity? All related submissions will also be affected."
        confirmText="YES, END QUEST"
        variant="danger"
      />
    </div>
  );
}
