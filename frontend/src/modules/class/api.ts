import api from '@/services/api';
import type { ApiListResponse, ApiSingleResponse } from '@/types/api';
import type { Class, CreateClassPayload, UpdateClassPayload } from './types';

export const classApi = {
  getAll: () =>
    api.get<ApiListResponse<Class>>('/classes').then((r) => r.data.data),
  getById: (id: string) =>
    api.get<ApiSingleResponse<Class>>(`/classes/${id}`).then((r) => r.data.data),
  create: (payload: CreateClassPayload) =>
    api.post<ApiSingleResponse<Class>>('/classes', payload).then((r) => r.data.data),
  update: (id: string, payload: UpdateClassPayload) =>
    api.patch<ApiSingleResponse<Class>>(`/classes/${id}`, payload).then((r) => r.data.data),
  delete: (id: string) =>
    api.delete(`/classes/${id}`).then((r) => r.data),
};
