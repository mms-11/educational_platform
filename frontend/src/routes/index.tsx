import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import { PublicRoute } from '@/components/common/PublicRoute';
import { MainLayout } from '@/components/layout/MainLayout';

// Pages - will be created
import LoginPage from '@/features/auth/pages/LoginPage';
import DashboardPage from '@/features/dashboard/pages/DashboardPage';
import StudentsPage from '@/features/students/pages/StudentsPage';
import ClassesPage from '@/features/classes/pages/ClassesPage';
import AssessmentsPage from '@/features/assessments/pages/AssessmentsPage';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/alunos" element={<StudentsPage />} />
            <Route path="/turmas" element={<ClassesPage />} />
            <Route path="/avaliacoes" element={<AssessmentsPage />} />
          </Route>
        </Route>

        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 404 - Not Found */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
