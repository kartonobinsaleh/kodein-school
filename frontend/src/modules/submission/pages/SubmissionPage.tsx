import { useSubmissions } from '../hooks/useSubmissions';
import type { Submission } from '../types';
import { Card, Button, Badge, CardGridSkeleton } from '@/components/ui';
import { ErrorState, EmptyState } from '@/components/feedback';

export default function SubmissionPage() {
  const { data: submissions, isLoading, isError } = useSubmissions();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="h-16 w-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />
        <CardGridSkeleton count={6} />
      </div>
    );
  }

  if (isError) return <ErrorState />;

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-xl font-black text-gray-900 dark:text-gray-100 tracking-tight">SUBMISSIONS 📤</h2>
        <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">
          {submissions?.length ?? 0} Collected Artifacts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(!submissions || submissions.length === 0) ? (
          <EmptyState className="col-span-full" message="Inbox is clear!" emoji="📬" />
        ) : (
          submissions.map((s: Submission) => (
            <Card key={s.id} noPadding className="overflow-hidden group">
              <div className={`h-24 bg-gray-50 dark:bg-dark-bg/50 flex items-center px-8 gap-4 border-b border-gray-100 dark:border-dark-border`}>
                <div className="w-12 h-12 bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-100 dark:border-dark-border flex items-center justify-center text-xl group-hover:-translate-y-1 transition-transform">
                  {s.url ? '🔗' : '📄'}
                </div>
                <div className="flex-1 overflow-hidden">
                  <h3 className="text-lg font-black text-gray-800 dark:text-gray-100 tracking-tight truncate uppercase leading-none">{s.activity?.title ?? 'QUEST'}</h3>
                  <p className="text-sm font-black text-gray-400 uppercase tracking-widest mt-1">Activity</p>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-warning text-white rounded-xl shadow-md flex items-center justify-center text-xl font-black">
                    {s.student?.name?.charAt(0) ?? 'S'}
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-800 dark:text-gray-100 uppercase leading-none">{s.student?.name ?? 'Anonymous'}</p>
                    <p className="text-sm font-bold text-gray-400 mt-1 uppercase italic tracking-widest">Scholar</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-5 bg-gray-50 dark:bg-dark-bg/50 rounded-xl border border-gray-100 dark:border-dark-border group-hover:border-primary/20 dark:group-hover:border-primary/20 transition-colors">
                    {s.url ? (
                      <a href={s.url} target="_blank" rel="noreferrer" className="text-primary font-black text-sm uppercase flex items-center gap-2 hover:underline">
                        View File ↗️
                      </a>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300 text-sm font-bold line-clamp-3 leading-relaxed">{s.content ?? 'No content provided.'}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Score Awarded</p>
                      {s.score != null ? (
                        <span className={`text-xl font-black ${s.score >= 70 ? 'text-success' : 'text-danger'} mt-1`}>{s.score} PTS</span>
                      ) : (
                        <span className="text-md font-black text-gray-300 uppercase italic leading-none mt-1">Pending...</span>
                      )}
                    </div>
                    {s.score == null && (
                      <Button variant="primary">
                        GRADE
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
