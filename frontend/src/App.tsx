import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './features/auth/pages/LoginPage';
import DashboardPage from './features/dashboard/pages/DashboardPage';
import StudentsPage from './features/students/pages/StudentsPage';
import ClassesPage from './features/classes/pages/ClassesPage';
import AssessmentsPage from './features/assessments/pages/AssessmentsPage';
import PrivateRoute from './components/common/ProtectedRoute';
import { MainLayout as Layout } from './components/layout/MainLayout';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/assessments" element={<AssessmentsPage />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
