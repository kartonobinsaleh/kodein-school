import { useState, useMemo } from 'react';
import { useStudentSearch, useDeleteStudent } from '../hooks/useStudents';
import type { Student } from '../types';
import { Button, CardGridSkeleton, DataTable, Column, Badge, Pagination, SearchToolbar } from '@/components/ui';
import { ErrorState, EmptyState, ConfirmDialog } from '@/components/feedback';
import { StudentCard } from '../components';

type ViewMode = 'card' | 'table';

export default function StudentPage() {
  // Filters & Pagination State
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  // Dedicated Search Hook for Table/Grid
  const { data: response, isLoading, isError } = useStudentSearch({ search, page, limit });
  const { mutate: deleteStudent } = useDeleteStudent();
  
  // UI State
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const students = response?.data ?? [];
  const meta = response?.meta;

  const columns = useMemo<Column<Student>[]>(() => [
    {
      header: 'SCHOLAR',
      accessor: (s) => (
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-xl shadow-sm border border-gray-200 dark:border-gray-700">🎓</div>
          <span className="font-black text-gray-800 dark:text-gray-100 uppercase tracking-tight">{s.name}</span>
        </div>
      ),
    },
    {
      header: 'NIS',
      accessor: (s) => <span className="font-bold text-gray-400 font-mono tracking-widest">{s.nis ?? '---'}</span>,
    },
    {
      header: 'CLASS / LEVEL',
      accessor: (s) => (
        <div className="flex items-center gap-2">
          <Badge variant="default">{s.class?.name ?? 'UNASSIGNED'}</Badge>
          <Badge variant="warning">{s.class?.level ?? 'N/A'}</Badge>
        </div>
      ),
    },
    {
      header: 'ACTIONS',
      align: 'right',
      accessor: (s) => (
        <div className="flex justify-end gap-2">
          <button className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">✏️</button>
          <button
            onClick={() => setDeleteId(s.id)}
            className="w-9 h-9 bg-danger/10 text-danger rounded-lg flex items-center justify-center hover:bg-danger hover:text-white transition-all active:scale-90 shadow-sm"
          >
            🗑️
          </button>
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

  if (isError) return <ErrorState />;

  return (
    <div className="space-y-8">
      {/* Header Profile Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">SCHOLAR DIRECTORY 👤</h2>
          <p className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-[0.2em] flex items-center gap-3">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            {meta?.total ?? 0} Scholars Authorized
          </p>
        </div>
        <Button variant="primary" className="!px-8 h-[54px] shadow-lg shadow-primary/20">
          + ENROLL NEW SCHOLAR
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
        placeholder="Search scholars by name or NIS..."
      />

      {/* Main Content Display */}
      {students.length === 0 ? (
        <EmptyState message="No scholars found!" emoji="🏜️" />
      ) : (
        <div className="space-y-10">
          {viewMode === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
              {students.map((s) => (
                <StudentCard 
                  key={s.id} 
                  student={s} 
                  onDelete={(id) => setDeleteId(id)}
                />
              ))}
            </div>
          ) : (
            <DataTable 
              data={students} 
              columns={columns} 
              emptyMessage="No scholars found!"
              meta={meta}
              onPageChange={(p) => setPage(p)}
              onLimitChange={(l) => {
                setLimit(l);
                setPage(1);
              }}
            />
          )}

          {/* Consistent Pagination Footer using search metadata */}
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
          if (deleteId) deleteStudent(deleteId);
          setDeleteId(null);
        }}
        title="DE-ENROLL SCHOLAR?"
        description="This action will permanently remove the student from the system. This cannot be undone."
        confirmText="YES, DELETE"
        variant="danger"
      />
    </div>
  );
}
