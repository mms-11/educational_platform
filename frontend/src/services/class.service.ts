import api from './api';
import type { Class, CreateClassDto, UpdateClassDto, ClassFilters } from '@/types/class.types';

export const classService = {
  /**
   * Get all classes with optional filters
   */
  async getAll(filters?: ClassFilters): Promise<Class[]> {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.status) params.append('status', filters.status);

    const response = await api.get<Class[]>(`/classes?${params.toString()}`);
    return response.data;
  },

  /**
   * Get class by ID
   */
  async getById(id: string): Promise<Class> {
    const response = await api.get<Class>(`/classes/${id}`);
    return response.data;
  },

  /**
   * Create new class
   */
  async create(data: CreateClassDto): Promise<Class> {
    const response = await api.post<Class>('/classes', data);
    return response.data;
  },

  /**
   * Update existing class
   */
  async update(id: string, data: UpdateClassDto): Promise<Class> {
    const response = await api.put<Class>(`/classes/${id}`, data);
    return response.data;
  },

  /**
   * Delete class
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/classes/${id}`);
  },
};
