import { useAttendances } from '../hooks/useAttendances';
import type { Attendance, AttendanceStatus } from '../types';
import { Card, Button, Badge, CardGridSkeleton } from '@/components/ui';
import { ErrorState, EmptyState } from '@/components/feedback';

const STATUS_CONFIG: Record<AttendanceStatus, { label: string, color: 'success' | 'danger' | 'warning', emoji: string }> = {
  PRESENT: { label: 'PRESENT', color: 'success', emoji: '✅' },
  ABSENT: { label: 'ABSENT', color: 'danger', emoji: '❌' },
  PERMIT: { label: 'PERMIT', color: 'warning', emoji: '✉️' },
};

export default function AttendancePage() {
  const { data: attendances, isLoading, isError } = useAttendances();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="h-16 w-1/3 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />
        <CardGridSkeleton count={3} />
      </div>
    );
  }

  if (isError) return <ErrorState message="The roll book is missing!" />;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-black text-gray-900 dark:text-gray-100 tracking-tight">ATTENDANCE ✅</h2>
          <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">
            {attendances?.length ?? 0} Presence Markers
          </p>
        </div>
        <Button variant="success">
          + CHECK-IN SCHOLARS
        </Button>
      </div>

      <Card noPadding className="bg-transparent border-none shadow-none">
        {(!attendances || attendances.length === 0) ? (
          <EmptyState message="Roll call not started!" emoji="🔔" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attendances.map((a: Attendance) => {
              const config = STATUS_CONFIG[a.status];
              return (
                <div key={a.id} className="p-6 rounded-xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border flex items-center gap-5 group hover:-translate-y-1 transition-all shadow-sm">
                  <div className={`w-16 h-16 bg-${config.color} rounded-xl flex items-center justify-center text-xl text-white shadow-md group-hover:rotate-6 transition-transform`}>
                    {config.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-gray-800 dark:text-gray-100 tracking-tight leading-tight">{a.student?.name.toUpperCase()}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm font-black text-gray-400 tracking-widest leading-none">
                        {new Date(a.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }).toUpperCase()}
                      </span>
                      <Badge variant={config.color}>{config.label}</Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
