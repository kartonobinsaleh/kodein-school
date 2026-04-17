import api from '@/services/api';
import type { ApiListResponse, ApiSingleResponse } from '@/types/api';
import type { Submission, CreateSubmissionPayload, UpdateSubmissionPayload } from './types';

export interface SubmissionParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const submissionApi = {
  getAll: () =>
    api.get<ApiListResponse<Submission>>('/submissions').then((r) => r.data),
  
  search: (params?: SubmissionParams) =>
    api.get<ApiListResponse<Submission>>('/submissions/search', { params }).then((r) => r.data),
  
  getById: (id: string) =>
    api.get<ApiSingleResponse<Submission>>(`/submissions/${id}`).then((r) => r.data.data),
  
  create: (payload: CreateSubmissionPayload) =>
    api.post<ApiSingleResponse<Submission>>('/submissions', payload).then((r) => r.data.data),
  
  update: (id: string, payload: UpdateSubmissionPayload) =>
    api.patch<ApiSingleResponse<Submission>>(`/submissions/${id}`, payload).then((r) => r.data.data),
  
  delete: (id: string) =>
    api.delete(`/submissions/${id}`).then((r) => r.data),
};
