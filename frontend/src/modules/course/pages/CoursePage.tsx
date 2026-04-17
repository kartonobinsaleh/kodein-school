import { useState, useMemo } from 'react';
import { useCourseSearch, useDeleteCourse } from '../hooks/useCourses';
import type { Course } from '../types';
import { Card, Button, Badge, CardGridSkeleton, DataTable, SearchToolbar, Pagination, Column } from '@/components/ui';
import { ErrorState, EmptyState, ConfirmDialog } from '@/components/feedback';

type ViewMode = 'card' | 'table';

export default function CoursePage() {
  // Filters & Pagination State
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  // Data Fetching
  const { data: response, isLoading, isError } = useCourseSearch({ search, page, limit });
  const { mutate: deleteCourse } = useDeleteCourse();
  
  // UI State
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const courses = response?.data ?? [];
  const meta = response?.meta;

  const columns = useMemo<Column<Course>[]>(() => [
    {
      header: 'COURSE TITLE',
      accessor: (c) => (
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-xl shadow-sm border border-primary/20">📖</div>
          <span className="font-black text-gray-800 dark:text-gray-100 uppercase tracking-tight">{c.title}</span>
        </div>
      ),
    },
    {
      header: 'SUBJECT',
      accessor: (c) => <Badge variant="primary">{c.subject?.name ?? 'General'}</Badge>,
    },
    {
      header: 'MENTOR',
      accessor: (c) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-xs">👨‍🏫</div>
          <span className="font-bold text-gray-600 dark:text-gray-400">{c.mentor?.email.split('@')[0] ?? 'Staff'}</span>
        </div>
      ),
    },
    {
      header: 'ACTIONS',
      align: 'right',
      accessor: (c) => (
        <div className="flex justify-end gap-2">
          <button className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">✏️</button>
          <button
            onClick={() => setDeleteId(c.id)}
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
    <div className="space-y-10">
      {/* Header Profile Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">COURSE LIBRARY 📚</h2>
          <p className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-[0.2em] flex items-center gap-3">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
            {meta?.total ?? 0} Adventure Pathways
          </p>
        </div>
        <Button variant="primary" className="!px-8 h-[54px] shadow-lg shadow-primary/20">
          + CREATE NEW COURSE
        </Button>
      </div>

      {/* Unified Search Toolbar (Reusable) */}
      <SearchToolbar 
        search={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        placeholder="Search courses by title..."
      />

      {/* Main Content Display */}
      {courses.length === 0 ? (
        <EmptyState message="Library is empty!" emoji="📚" />
      ) : (
        <div className="space-y-10">
          {viewMode === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
              {courses.map((c: Course) => (
                <Card key={c.id} noPadding className="group overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-500 rounded-[20px]">
                  {/* Colorful Banner */}
                  <div className={`h-32 bg-primary/20 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-700`}>
                    📖
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="primary">
                        {c.subject?.name ?? 'General'}
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-black text-gray-800 dark:text-gray-100 tracking-tight leading-tight uppercase line-clamp-2 min-h-[3.5rem]">{c.title}</h3>
                    
                    <div className="mt-8 flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl flex items-center justify-center text-xl">👨‍🏫</div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Mentor</p>
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{c.mentor?.email.split('@')[0] ?? 'Staff'}</p>
                      </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                      <button className="text-primary font-black text-xs uppercase tracking-widest hover:underline transition-all active:scale-95">View Syllabus</button>
                      <div className="flex gap-2">
                        <button className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">✏️</button>
                        <button
                          onClick={() => setDeleteId(c.id)}
                          className="w-10 h-10 bg-danger/10 rounded-xl flex items-center justify-center text-danger hover:bg-danger hover:text-white transition-all shadow-sm active:translate-y-1"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <DataTable 
              data={courses} 
              columns={columns} 
              emptyMessage="No courses found!"
              meta={meta}
              onPageChange={(p) => setPage(p)}
              onLimitChange={(l) => {
                setLimit(l);
                setPage(1);
              }}
            />
          )}

          {/* Consistent Pagination Footer */}
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
          if (deleteId) deleteCourse(deleteId);
          setDeleteId(null);
        }}
        title="REMOVE COURSE?"
        description="Are you sure you want to remove this course? This action is permanent."
        confirmText="YES, DELETE"
        variant="danger"
      />
    </div>
  );
}
