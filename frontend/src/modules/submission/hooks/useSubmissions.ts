import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { submissionApi } from '../api';
import type { CreateSubmissionPayload, UpdateSubmissionPayload } from '../types';

const KEY = 'submissions';

export function useSubmissions() {
  return useQuery({ queryKey: [KEY], queryFn: submissionApi.getAll });
}

export function useSubmission(id: string) {
  return useQuery({ queryKey: [KEY, id], queryFn: () => submissionApi.getById(id), enabled: !!id });
}

export function useCreateSubmission() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: CreateSubmissionPayload) => submissionApi.create(p),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useUpdateSubmission() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateSubmissionPayload }) =>
      submissionApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useDeleteSubmission() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => submissionApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
