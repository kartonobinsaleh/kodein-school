import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { submissionApi, type SubmissionParams } from '../api';
import type { CreateSubmissionPayload, UpdateSubmissionPayload } from '../types';

const KEY = 'submissions';
const SEARCH_KEY = 'submissions-search';

export function useSubmissions() {
  return useQuery({ queryKey: [KEY], queryFn: submissionApi.getAll });
}

export function useSubmissionSearch(params?: SubmissionParams) {
  return useQuery({ 
    queryKey: [SEARCH_KEY, params], 
    queryFn: () => submissionApi.search(params) 
  });
}

export function useSubmission(id: string) {
  return useQuery({ queryKey: [KEY, id], queryFn: () => submissionApi.getById(id), enabled: !!id });
}

export function useCreateSubmission() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: CreateSubmissionPayload) => submissionApi.create(p),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
      qc.invalidateQueries({ queryKey: [SEARCH_KEY] });
    },
  });
}

export function useUpdateSubmission() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateSubmissionPayload }) =>
      submissionApi.update(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
      qc.invalidateQueries({ queryKey: [SEARCH_KEY] });
    },
  });
}

export function useDeleteSubmission() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => submissionApi.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
      qc.invalidateQueries({ queryKey: [SEARCH_KEY] });
    },
  });
}
