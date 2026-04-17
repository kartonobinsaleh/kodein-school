import { useGrades } from '../hooks/useGrades';
import type { Grade } from '../types';
import { Card, Button, Badge, CardGridSkeleton } from '@/components/ui';
import { ErrorState, EmptyState } from '@/components/feedback';

function getPredicate(score: number): { label: string; css: 'success' | 'primary' | 'warning' | 'danger'; emoji: string } {
  if (score >= 90) return { label: 'RANK A', css: 'success', emoji: '🏆' };
  if (score >= 80) return { label: 'RANK B', css: 'primary', emoji: '🌟' };
  if (score >= 70) return { label: 'RANK C', css: 'warning', emoji: '🔥' };
  return { label: 'RANK D', css: 'danger', emoji: '💪' };
}

export default function GradePage() {
  const { data: grades, isLoading, isError } = useGrades();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="h-16 w-1/3 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />
        <CardGridSkeleton count={3} />
      </div>
    );
  }

  if (isError) return <ErrorState message="The scoreboard is offline!" />;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-black text-gray-900 dark:text-gray-100 tracking-tight">HALL OF FAME 🎯</h2>
          <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">
            {grades?.length ?? 0} Mastered Records
          </p>
        </div>
        <Button variant="danger">
          + INPUT NEW RECORDS
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {(!grades || grades.length === 0) ? (
          <EmptyState className="col-span-full" message="Stadium is empty!" emoji="🏟️" />
        ) : (
          grades.map((g: Grade) => {
            const pred = getPredicate(g.finalScore);
            return (
              <Card key={g.id} className="flex flex-col items-center text-center">
                <div className={`w-24 h-24 bg-${pred.css} rounded-xl flex items-center justify-center text-xl text-white shadow-xl mb-6 hover:-translate-y-2 transition-transform`}>
                  {pred.emoji}
                </div>
                
                <div className="mb-4">
                  <Badge variant={pred.css}>
                    {pred.label}
                  </Badge>
                </div>

                <h3 className="text-xl font-black text-gray-800 dark:text-gray-100 tracking-tight line-clamp-1">{g.student?.name.toUpperCase()}</h3>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1 italic">{g.subject?.name ?? 'Course'}</p>

                <div className="mt-8 flex items-baseline gap-1">
                  <span className="text-xl font-black text-gray-900 dark:text-gray-100">{g.finalScore}</span>
                  <span className="text-md font-black text-gray-400">/ 100</span>
                </div>

                <div className="mt-8 w-full h-3 bg-gray-100 dark:bg-dark-bg rounded-md overflow-hidden">
                  <div className={`h-full bg-${pred.css} shadow-inner animate-width`} style={{ width: `${g.finalScore}%` }} />
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
