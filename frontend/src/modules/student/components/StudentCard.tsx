import { Student } from '../types';
import { Card, Badge } from '@/components/ui';

interface StudentCardProps {
  student: Student;
  onEdit?: (student: Student) => void;
  onDelete?: (id: string) => void;
}

export function StudentCard({ student, onEdit, onDelete }: StudentCardProps) {
  return (
    <Card className="group hover:-translate-y-1 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="w-16 h-16 bg-danger/10 text-danger rounded-xl flex items-center justify-center text-xl shadow-inner border-2 border-danger/10 group-hover:rotate-3 transition-transform">
          🎓
        </div>
        <Badge variant="warning">
          {student.class?.level ?? 'N/A'} LEVEL
        </Badge>
      </div>
      
      <h3 className="text-lg font-black text-gray-800 dark:text-gray-100 line-clamp-1">{student.name.toUpperCase()}</h3>
      <p className="text-sm font-bold text-gray-400 mt-1 tracking-widest uppercase">NIS: {student.nis ?? '---'}</p>
      
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl flex items-center gap-3">
        <span className="text-xl">🏢</span>
        <span className="text-sm font-black text-gray-600 dark:text-gray-400 uppercase leading-none truncate">
          {student.class?.name ?? 'NOT ASSIGNED'}
        </span>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-dark-border flex items-center justify-between">
        <button 
          onClick={() => onEdit?.(student)}
          className="text-primary font-black text-sm hover:underline uppercase tracking-widest"
        >
          EDIT PROFILE
        </button>
        <button
          onClick={() => onDelete?.(student.id)}
          className="w-10 h-10 bg-danger/10 rounded-xl flex items-center justify-center text-danger hover:bg-danger hover:text-white transition-all shadow-sm active:translate-y-1"
        >
          🗑️
        </button>
      </div>
    </Card>
  );
}
