import api from '@/services/api';
import type { ApiListResponse, ApiSingleResponse } from '@/types/api';
import type { Attendance, CreateAttendancePayload, UpdateAttendancePayload } from './types';

export interface AttendanceParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const attendanceApi = {
  getAll: () =>
    api.get<ApiListResponse<Attendance>>('/attendance').then((r) => r.data),
  
  search: (params?: AttendanceParams) =>
    api.get<ApiListResponse<Attendance>>('/attendance/search', { params }).then((r) => r.data),
  
  getById: (id: string) =>
    api.get<ApiSingleResponse<Attendance>>(`/attendance/${id}`).then((r) => r.data.data),
  
  create: (payload: CreateAttendancePayload) =>
    api.post<ApiSingleResponse<Attendance>>('/attendance', payload).then((r) => r.data.data),
  
  update: (id: string, payload: UpdateAttendancePayload) =>
    api.patch<ApiSingleResponse<Attendance>>(`/attendance/${id}`, payload).then((r) => r.data.data),
  
  delete: (id: string) =>
    api.delete(`/attendance/${id}`).then((r) => r.data),
};
