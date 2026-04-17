import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/shared/Sidebar';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-bg overflow-hidden font-sans transition-colors duration-300">
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
