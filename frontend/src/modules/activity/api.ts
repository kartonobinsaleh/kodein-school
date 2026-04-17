import api from '@/services/api';
import type { ApiListResponse, ApiSingleResponse } from '@/types/api';
import type { Activity, CreateActivityPayload, UpdateActivityPayload } from './types';

export interface ActivityParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const activityApi = {
  getAll: () =>
    api.get<ApiListResponse<Activity>>('/activities').then((r) => r.data),
  
  search: (params?: ActivityParams) =>
    api.get<ApiListResponse<Activity>>('/activities/search', { params }).then((r) => r.data),
  
  getById: (id: string) =>
    api.get<ApiSingleResponse<Activity>>(`/activities/${id}`).then((r) => r.data.data),
  
  create: (payload: CreateActivityPayload) =>
    api.post<ApiSingleResponse<Activity>>('/activities', payload).then((r) => r.data.data),
  
  update: (id: string, payload: UpdateActivityPayload) =>
    api.patch<ApiSingleResponse<Activity>>(`/activities/${id}`, payload).then((r) => r.data.data),
  
  delete: (id: string) =>
    api.delete(`/activities/${id}`).then((r) => r.data),
};
