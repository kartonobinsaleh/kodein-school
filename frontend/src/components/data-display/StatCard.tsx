interface StatCardProps {
  title: string;
  value: string | number;
  color: 'primary' | 'success' | 'warning' | 'danger';
  icon: string;
  sub: string;
}

import { Card } from '../ui';

export function StatCard({ title, value, color, icon, sub }: StatCardProps) {
  const colorMap = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
  };

  return (
    <Card noPadding className="overflow-hidden h-40">
      <div className={`${colorMap[color]} h-2`} />
      <div className="p-5 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start">
          <span className="text-sm font-black text-gray-400 tracking-widest uppercase">{title}</span>
          <span className="text-xl">{icon}</span>
        </div>
        <div>
          <div className="text-xl font-black text-gray-800 dark:text-gray-100">{value}</div>
          <p className="text-sm font-bold text-gray-400 mt-1">{sub}</p>
        </div>
      </div>
    </Card>
  );
}
