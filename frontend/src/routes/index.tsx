import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '@/layouts/DashboardLayout';
import LoginPage from '@/modules/auth/pages/LoginPage';
import { TopBarProgress } from '@/components/feedback/TopBarProgress';

const DashboardPage  = lazy(() => import('@/modules/auth/pages/DashboardPage'));
const StudentPage    = lazy(() => import('@/modules/student/pages/StudentPage'));
const CoursePage     = lazy(() => import('@/modules/course/pages/CoursePage'));
const ActivityPage   = lazy(() => import('@/modules/activity/pages/ActivityPage'));
const SubmissionPage = lazy(() => import('@/modules/submission/pages/SubmissionPage'));
const GradePage      = lazy(() => import('@/modules/grade/pages/GradePage'));
const AttendancePage = lazy(() => import('@/modules/attendance/pages/AttendancePage'));
const UserPage       = lazy(() => import('@/modules/user/pages/UserPage'));

const Fallback = () => <TopBarProgress />;

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard"    element={<Suspense fallback={<Fallback />}><DashboardPage /></Suspense>} />
            
            {/* Admin only */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route path="/users"       element={<Suspense fallback={<Fallback />}><UserPage /></Suspense>} />
            </Route>

            {/* Admin & Mentor only */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'MENTOR']} />}>
              <Route path="/students"     element={<Suspense fallback={<Fallback />}><StudentPage /></Suspense>} />
              <Route path="/activities"   element={<Suspense fallback={<Fallback />}><ActivityPage /></Suspense>} />
            </Route>

            {/* Shared routes (with internal filtering or global access) */}
            <Route path="/courses"      element={<Suspense fallback={<Fallback />}><CoursePage /></Suspense>} />
            <Route path="/submissions"  element={<Suspense fallback={<Fallback />}><SubmissionPage /></Suspense>} />
            <Route path="/grades"       element={<Suspense fallback={<Fallback />}><GradePage /></Suspense>} />
            <Route path="/attendance"   element={<Suspense fallback={<Fallback />}><AttendancePage /></Suspense>} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
