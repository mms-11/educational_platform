import api from './api';
import type {
  Assessment,
  CreateAssessmentDto,
  UpdateAssessmentDto,
  AssessmentFilters,
} from '@/types/assessment.types';

export const assessmentService = {
  async getAll(filters?: AssessmentFilters): Promise<Assessment[]> {
    const params = new URLSearchParams();
    if (filters?.classId) params.append('classId', filters.classId);
    if (filters?.status) params.append('status', filters.status);

    const response = await api.get<Assessment[]>(`/assessments?${params.toString()}`);
    return response.data;
  },

  async getById(id: string): Promise<Assessment> {
    const response = await api.get<Assessment>(`/assessments/${id}`);
    return response.data;
  },

  async create(data: CreateAssessmentDto): Promise<Assessment> {
    const response = await api.post<Assessment>('/assessments', data);
    return response.data;
  },

  async update(id: string, data: UpdateAssessmentDto): Promise<Assessment> {
    const response = await api.put<Assessment>(`/assessments/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/assessments/${id}`);
  },
};
