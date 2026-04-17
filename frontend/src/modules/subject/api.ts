import api from '@/services/api';
import type { ApiListResponse, ApiSingleResponse } from '@/types/api';
import type { Subject, CreateSubjectPayload, UpdateSubjectPayload } from './types';

export const subjectApi = {
  getAll: () =>
    api.get<ApiListResponse<Subject>>('/subjects').then((r) => r.data.data),
  getById: (id: string) =>
    api.get<ApiSingleResponse<Subject>>(`/subjects/${id}`).then((r) => r.data.data),
  create: (payload: CreateSubjectPayload) =>
    api.post<ApiSingleResponse<Subject>>('/subjects', payload).then((r) => r.data.data),
  update: (id: string, payload: UpdateSubjectPayload) =>
    api.patch<ApiSingleResponse<Subject>>(`/subjects/${id}`, payload).then((r) => r.data.data),
  delete: (id: string) =>
    api.delete(`/subjects/${id}`).then((r) => r.data),
};
