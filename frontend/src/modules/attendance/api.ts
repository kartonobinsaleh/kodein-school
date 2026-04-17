import api from '@/services/api';
import type { ApiListResponse, ApiSingleResponse } from '@/types/api';
import type { Attendance, CreateAttendancePayload, UpdateAttendancePayload } from './types';

export const attendanceApi = {
  getAll: () =>
    api.get<ApiListResponse<Attendance>>('/attendance').then((r) => r.data.data),
  getById: (id: string) =>
    api.get<ApiSingleResponse<Attendance>>(`/attendance/${id}`).then((r) => r.data.data),
  // No courseId — does not exist in Prisma Attendance model
  create: (payload: CreateAttendancePayload) =>
    api.post<ApiSingleResponse<Attendance>>('/attendance', payload).then((r) => r.data.data),
  update: (id: string, payload: UpdateAttendancePayload) =>
    api.patch<ApiSingleResponse<Attendance>>(`/attendance/${id}`, payload).then((r) => r.data.data),
  delete: (id: string) =>
    api.delete(`/attendance/${id}`).then((r) => r.data),
};
