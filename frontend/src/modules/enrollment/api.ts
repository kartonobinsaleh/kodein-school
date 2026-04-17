import api from '@/services/api';
import type { ApiListResponse, ApiSingleResponse } from '@/types/api';
import type { Enrollment, CreateEnrollmentPayload } from './types';

export const enrollmentApi = {
  getAll: () =>
    api.get<ApiListResponse<Enrollment>>('/enrollments').then((r) => r.data.data),
  getById: (id: string) =>
    api.get<ApiSingleResponse<Enrollment>>(`/enrollments/${id}`).then((r) => r.data.data),
  create: (payload: CreateEnrollmentPayload) =>
    api.post<ApiSingleResponse<Enrollment>>('/enrollments', payload).then((r) => r.data.data),
  // No update — enrollment is immutable
  delete: (id: string) =>
    api.delete(`/enrollments/${id}`).then((r) => r.data),
};
