import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { gradeApi } from '../api';
import type { CreateGradePayload, UpdateGradePayload } from '../types';

const KEY = 'grades';

export function useGrades() {
  return useQuery({ queryKey: [KEY], queryFn: gradeApi.getAll });
}

export function useGrade(id: string) {
  return useQuery({ queryKey: [KEY, id], queryFn: () => gradeApi.getById(id), enabled: !!id });
}

export function useCreateGrade() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: CreateGradePayload) => gradeApi.create(p),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useUpdateGrade() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateGradePayload }) =>
      gradeApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useDeleteGrade() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => gradeApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
