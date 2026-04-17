import api from '@/services/api';
import type { ApiListResponse, ApiSingleResponse } from '@/types/api';
import type { Submission, CreateSubmissionPayload, UpdateSubmissionPayload } from './types';

export const submissionApi = {
  getAll: () =>
    api.get<ApiListResponse<Submission>>('/submissions').then((r) => r.data.data),
  getById: (id: string) =>
    api.get<ApiSingleResponse<Submission>>(`/submissions/${id}`).then((r) => r.data.data),
  create: (payload: CreateSubmissionPayload) =>
    api.post<ApiSingleResponse<Submission>>('/submissions', payload).then((r) => r.data.data),
  // PATCH — mentor uses this to input score + feedback
  update: (id: string, payload: UpdateSubmissionPayload) =>
    api.patch<ApiSingleResponse<Submission>>(`/submissions/${id}`, payload).then((r) => r.data.data),
  delete: (id: string) =>
    api.delete(`/submissions/${id}`).then((r) => r.data),
};
