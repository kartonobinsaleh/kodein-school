import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { classApi } from '../api';
import type { CreateClassPayload, UpdateClassPayload } from '../types';

const KEY = 'classes';

export function useClasses() {
  return useQuery({ queryKey: [KEY], queryFn: classApi.getAll });
}

export function useCreateClass() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: CreateClassPayload) => classApi.create(p),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useUpdateClass() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateClassPayload }) =>
      classApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useDeleteClass() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => classApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
