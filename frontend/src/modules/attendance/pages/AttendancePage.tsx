import { useState, useMemo } from 'react';
import { useAttendanceSearch } from '../hooks/useAttendances';
import type { Attendance, AttendanceStatus } from '../types';
import { Card, Button, Badge, CardGridSkeleton, DataTable, Column, SearchToolbar, Pagination } from '@/components/ui';
import { ErrorState, EmptyState } from '@/components/feedback';

const STATUS_CONFIG: Record<AttendanceStatus, { label: string, color: 'success' | 'danger' | 'warning', emoji: string }> = {
  PRESENT: { label: 'PRESENT', color: 'success', emoji: '✅' },
  ABSENT: { label: 'ABSENT', color: 'danger', emoji: '❌' },
  PERMIT: { label: 'PERMIT', color: 'warning', emoji: '✉️' },
};

export default function AttendancePage() {
  // Filters & Pagination State
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  // Data Fetching
  const { data: response, isLoading, isError } = useAttendanceSearch({ search, page, limit });
  
  // UI State
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');

  const attendances = (response?.data as any as Attendance[]) ?? [];
  const meta = response?.meta;

  const columns = useMemo<Column<Attendance>[]>(() => [
    {
      header: 'STUDENT',
      accessor: (a) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-lg">🎓</div>
          <span className="font-black text-gray-800 dark:text-gray-100 uppercase tracking-tight">{a.student?.name}</span>
        </div>
      ),
    },
    {
      header: 'DATE',
      accessor: (a) => <span className="font-bold text-gray-400 font-mono tracking-widest leading-none">{new Date(a.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }).toUpperCase()}</span>,
    },
    {
      header: 'STATUS',
      accessor: (a) => {
        const config = STATUS_CONFIG[a.status];
        return <Badge variant={config.color}>{config.label}</Badge>;
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

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="h-12 w-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />
          <div className="h-12 w-32 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />
        </div>
        <CardGridSkeleton count={6} />
      </div>
    );
  }

  if (isError) return <ErrorState message="The roll book is missing!" />;

  return (
    <div className="space-y-10">
      {/* Header Section with Animated Dot */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">ATTENDANCE LOG ✅</h2>
          <p className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-[0.2em] flex items-center gap-3">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            {meta?.total ?? 0} Presence Markers Observed
          </p>
        </div>
        <Button variant="success" className="h-[54px] !px-8 shadow-lg shadow-success/20">
          + CHECK-IN SCHOLARS
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
        placeholder="Search attendance by status or notes..."
      />

      {/* Content Area */}
      {attendances.length === 0 ? (
        <EmptyState message="Roll call has not started yet!" emoji="🔔" />
      ) : (
        <div className="space-y-10">
          {viewMode === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
              {attendances.map((a: Attendance) => {
                const config = STATUS_CONFIG[a.status];
                return (
                  <Card key={a.id} className="group hover:-translate-y-2 transition-all duration-500 rounded-[20px] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl bg-white dark:bg-dark-card p-6">
                    <div className="flex items-center gap-5">
                      <div className={`w-16 h-16 bg-${config.color} text-white rounded-2xl shadow-lg flex items-center justify-center text-2xl group-hover:rotate-6 transition-transform`}>
                        {config.emoji}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-black text-gray-800 dark:text-gray-100 tracking-tight leading-tight uppercase">{a.student?.name}</h3>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs font-black text-gray-400 tracking-widest uppercase italic">
                            {new Date(a.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }).toUpperCase()}
                          </span>
                          <Badge variant={config.color}>{config.label}</Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <DataTable 
              data={attendances} 
              columns={columns} 
              emptyMessage="No attendance records found!"
              meta={meta}
              onPageChange={(p) => setPage(p)}
              onLimitChange={(l) => {
                setLimit(l);
                setPage(1);
              }}
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
