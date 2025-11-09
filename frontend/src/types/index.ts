export type { User, LoginCredentials, AuthResponse, AuthContextType } from './auth.types';
export type { Student, CreateStudentDto, UpdateStudentDto, StudentFilters, StudentStatus } from './student.types';
export type { Class, CreateClassDto, UpdateClassDto, AssignStudentToClassDto } from './class.types';
export type { AssessmentCriteria, ClassAssessment, CreateAssessmentCriteriaDto, UpdateClassAssessmentDto, AssessmentValidation } from './assessment.types';
export type { DashboardStats, UpcomingAssessment } from './dashboard.types';
export * from './class.types'; 
export * from '../services/class.service'; 
export * from '../types/assessment.types';
// Common API types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Common UI types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}
