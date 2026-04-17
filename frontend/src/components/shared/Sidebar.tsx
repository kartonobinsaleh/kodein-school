import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { ConfirmDialog } from '@/components/feedback';

const navItems = [
  { to: '/dashboard',   label: 'Dashboard',   icon: '🏠', roles: ['ADMIN', 'MENTOR', 'STUDENT'] },
  { to: '/users',        label: 'Users',       icon: '🔑', roles: ['ADMIN'] },
  { to: '/students',    label: 'Students',    icon: '👤', roles: ['ADMIN', 'MENTOR'] },
  { to: '/courses',     label: 'Courses',     icon: '📚', roles: ['ADMIN', 'MENTOR', 'STUDENT'] },
  { to: '/activities',  label: 'Activities',  icon: '📋', roles: ['ADMIN', 'MENTOR'] },
  { to: '/submissions', label: 'Submissions', icon: '📤', roles: ['ADMIN', 'MENTOR', 'STUDENT'] },
  { to: '/grades',      label: 'Grades',      icon: '🎯', roles: ['ADMIN', 'MENTOR', 'STUDENT'] },
  { to: '/attendance',  label: 'Attendance',  icon: '✅', roles: ['ADMIN', 'MENTOR', 'STUDENT'] },
];

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-white dark:bg-dark-card flex flex-col h-screen sticky top-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20 border-r border-gray-100 dark:border-dark-border transition-colors duration-300">
      {/* Refined Header */}
      <div className="h-20 flex items-center px-6 mb-4">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center mr-3 shadow-md shadow-primary/20 rotate-3">
          <span className="text-white text-lg font-black">K</span>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-black text-gray-900 dark:text-gray-100 tracking-tight leading-none uppercase">Kodein</span>
          <span className="text-sm font-black text-warning uppercase tracking-widest mt-1">School</span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-4 custom-scrollbar">
        <ul className="space-y-1">
          {navItems
            .filter(item => item.roles.includes(user?.role || ''))
            .map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all relative overflow-hidden group ${
                    isActive
                      ? 'bg-primary/10 text-primary active'
                      : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-200'
                  }`
                }
              >
                <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary rounded-full scale-y-0 group-[.active]:scale-y-100 transition-transform origin-center" />
                <span className="text-lg leading-none">{icon}</span>
                <span className="uppercase tracking-wide text-sm">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Refined User Footer */}
      <div className="p-4 mt-auto border-t border-gray-50 dark:border-dark-border/50">
        <div className="bg-gray-50 dark:bg-dark-bg/50 rounded-xl p-4 border border-gray-100 dark:border-dark-border">
          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-between w-full p-2 mb-4 rounded-xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-sm hover:scale-[1.02] transition-all"
          >
            <span className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">{isDarkMode ? 'Dark' : 'Light'}</span>
            <span className="text-lg mr-1">{isDarkMode ? '🌙' : '☀️'}</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-danger rounded-xl flex items-center justify-center shadow-lg shadow-danger/20 rotate-[-2deg]">
                <span className="text-white text-lg font-black uppercase">
                  {user?.email?.charAt(0) ?? 'U'}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-white dark:border-dark-card rounded-full" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-gray-900 dark:text-gray-100 truncate uppercase tracking-tight">{user?.email.split('@')[0]}</p>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{user?.role}</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full mt-4 py-2 rounded-xl text-sm font-black tracking-widest transition-all bg-white dark:bg-dark-card text-danger border border-danger/20 shadow-sm hover:bg-danger hover:text-white hover:border-danger active:scale-95 uppercase"
          >
            Logout
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="EXIT ARENA?"
        description="Are you sure you want to end your current learning session?"
        confirmText="YES, LOGOUT"
        cancelText="STAY HERE"
        variant="danger"
      />
    </aside>
  );
}
