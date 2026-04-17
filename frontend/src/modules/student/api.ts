import api from '@/services/api';
import type { ApiListResponse, ApiSingleResponse } from '@/types/api';
import type { Student, CreateStudentPayload, UpdateStudentPayload } from './types';

export interface StudentParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const studentApi = {
  getAll: () =>
    api.get<ApiListResponse<Student>>('/students').then((r) => r.data),
  
  search: (params?: StudentParams) =>
    api.get<ApiListResponse<Student>>('/students/search', { params }).then((r) => r.data),
  
  getById: (id: string) =>
    api.get<ApiSingleResponse<Student>>(`/students/${id}`).then((r) => r.data.data),
  
  create: (payload: CreateStudentPayload) =>
    api.post<ApiSingleResponse<Student>>('/students', payload).then((r) => r.data.data),
  
  update: (id: string, payload: UpdateStudentPayload) =>
    api.patch<ApiSingleResponse<Student>>(`/students/${id}`, payload).then((r) => r.data.data),
  
  delete: (id: string) =>
    api.delete(`/students/${id}`).then((r) => r.data),
};
