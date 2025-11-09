import api from './api';
import type { Student, CreateStudentDto, UpdateStudentDto, StudentFilters } from '@/types';

export const studentService = {
  /**
   * Get all students with optional filters
   */
  async getAll(filters?: StudentFilters): Promise<Student[]> {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.classId) params.append('classId', filters.classId);
    if (filters?.status) params.append('status', filters.status);

    const response = await api.get<Student[]>(`/students?${params.toString()}`);
    return response.data;
  },

  /**
   * Get student by ID
   */
  async getById(id: string): Promise<Student> {
    const response = await api.get<Student>(`/students/${id}`);
    return response.data;
  },

  /**
   * Create new student
   */
  async create(data: CreateStudentDto): Promise<Student> {
    const response = await api.post<Student>('/students', data);
    return response.data;
  },

  /**
   * Update existing student
   */
  async update(id: string, data: UpdateStudentDto): Promise<Student> {
    const response = await api.put<Student>(`/students/${id}`, data);
    return response.data;
  },

  /**
   * Delete student
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/students/${id}`);
  },

  /**
   * Get students by class ID
   */
  async getByClassId(classId: string): Promise<Student[]> {
    const response = await api.get<Student[]>(`/students/class/${classId}`);
    return response.data;
  },
};
