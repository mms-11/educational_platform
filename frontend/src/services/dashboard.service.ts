import api from './api';
import type {
  DashboardStats,
  UpcomingAssessment,
  RecentActivity,
  ClassPerformance,
} from '@/types/dashboard.types';

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const response = await api.get<DashboardStats>('/dashboard/stats');
    return response.data;
  },

  async getUpcomingAssessments(): Promise<UpcomingAssessment[]> {
    const response = await api.get<UpcomingAssessment[]>('/dashboard/upcoming-assessments');
    return response.data;
  },

  async getRecentActivities(): Promise<RecentActivity[]> {
    const response = await api.get<RecentActivity[]>('/dashboard/recent-activities');
    return response.data;
  },

  async getPerformance(): Promise<ClassPerformance[]> {
    const response = await api.get<ClassPerformance[]>('/dashboard/performance');
    return response.data;
  },
};
