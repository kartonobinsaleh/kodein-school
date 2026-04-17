import api from '@/services/api';
import type { ApiListResponse, ApiSingleResponse } from '@/types/api';
import type { Grade, CreateGradePayload, UpdateGradePayload } from './types';

export const gradeApi = {
  getAll: () =>
    api.get<ApiListResponse<Grade>>('/grades').then((r) => r.data.data),
  getById: (id: string) =>
    api.get<ApiSingleResponse<Grade>>(`/grades/${id}`).then((r) => r.data.data),
  // finalScore — NOT score
  create: (payload: CreateGradePayload) =>
    api.post<ApiSingleResponse<Grade>>('/grades', payload).then((r) => r.data.data),
  update: (id: string, payload: UpdateGradePayload) =>
    api.patch<ApiSingleResponse<Grade>>(`/grades/${id}`, payload).then((r) => r.data.data),
  delete: (id: string) =>
    api.delete(`/grades/${id}`).then((r) => r.data),
};
