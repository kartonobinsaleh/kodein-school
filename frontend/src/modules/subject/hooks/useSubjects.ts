import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subjectApi } from '../api';
import type { CreateSubjectPayload, UpdateSubjectPayload } from '../types';

const KEY = 'subjects';

export function useSubjects() {
  return useQuery({ queryKey: [KEY], queryFn: subjectApi.getAll });
}

export function useCreateSubject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: CreateSubjectPayload) => subjectApi.create(p),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useUpdateSubject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateSubjectPayload }) =>
      subjectApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useDeleteSubject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => subjectApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
