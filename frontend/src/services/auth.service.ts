import api from './api';
import type { LoginCredentials, AuthResponse, User } from '@/types';

export const authService = {
  /**
   * Authenticate user with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  /**
   * Verify if token is valid
   */
  async verifyToken(token: string): Promise<boolean> {
    try {
      const response = await api.post<{ valid: boolean }>('/auth/verify', {
        token,
      });
      return response.data.valid;
    } catch {
      return false;
    }
  },

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/refresh');
    return response.data;
  },
};
