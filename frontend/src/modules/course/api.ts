import api from '@/services/api';
import type { ApiListResponse, ApiSingleResponse } from '@/types/api';
import type { Course, CreateCoursePayload, UpdateCoursePayload } from './types';

export interface CourseParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const courseApi = {
  getAll: () =>
    api.get<ApiListResponse<Course>>('/courses').then((r) => r.data),
  
  search: (params?: CourseParams) =>
    api.get<ApiListResponse<Course>>('/courses/search', { params }).then((r) => r.data),
  
  getById: (id: string) =>
    api.get<ApiSingleResponse<Course>>(`/courses/${id}`).then((r) => r.data.data),
  
  create: (payload: CreateCoursePayload) =>
    api.post<ApiSingleResponse<Course>>('/courses', payload).then((r) => r.data.data),
  
  update: (id: string, payload: UpdateCoursePayload) =>
    api.patch<ApiSingleResponse<Course>>(`/courses/${id}`, payload).then((r) => r.data.data),
  
  delete: (id: string) =>
    api.delete(`/courses/${id}`).then((r) => r.data),
};
